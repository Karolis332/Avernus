#!/usr/bin/env node
// Stop hook: push this session's chat (DM prompts + Claude replies, no tool output, no thinking)
// to .claude/logs/<date>-<session>.md on origin/main, so every device pulls the same context.
// Commits with git plumbing on a temp index: never touches the working tree, index or local branch.
// Usage: hook (JSON on stdin) | --dry-run <transcript.jsonl> | --test
import { spawn, execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const SELF = fileURLToPath(import.meta.url);
const REPO = path.resolve(path.dirname(SELF), '..', '..');
const BRANCH = 'main'; // ponytail: hardcoded default branch; read origin/HEAD if it ever changes

const REDACT = [
  [/-----BEGIN [A-Z ]*PRIVATE KEY-----[\s\S]*?-----END [A-Z ]*PRIVATE KEY-----/g, '[private key]'],
  [/\b(sk|rk|pk)-[A-Za-z0-9_-]{20,}/g, '[secret]'],
  [/\bgh[pousr]_[A-Za-z0-9]{20,}/g, '[secret]'],
  [/\bAKIA[0-9A-Z]{16}\b/g, '[secret]'],
  [/\bxox[abprs]-[A-Za-z0-9-]{10,}/g, '[secret]'],
  [/\beyJ[\w-]{10,}\.[\w-]{10,}\.[\w-]{10,}/g, '[secret]'],
  // value must hold a digit, so prose like "The secret: Zariel..." survives
  [/\b(password|passwd|pwd|token|secret|api[_-]?key)(\s*[=:]\s*)["']?(?=[^\s"'`]*\d)[^\s"'`]{6,}/gi, '$1$2[secret]'],
  [/[\w.+-]+@[\w-]+(\.[\w-]+)+/g, '[email]'],
  [/\b(?!127\.0\.0\.1\b)(\d{1,3}\.){3}\d{1,3}\b/g, '[ip]'],
];
const redact = (s) => REDACT.reduce((acc, [re, to]) => acc.replace(re, to), s);
const stripReminders = (s) => s.replace(/<system-reminder>[\s\S]*?<\/system-reminder>/g, '').trim();
const stamp = (ts) => new Date(ts).toLocaleString('sv-SE').slice(0, 16);

function isHumanPrompt(text) {
  return text && !text.startsWith('<') && !text.startsWith('Another Claude session') && !text.startsWith('[Request interrupted');
}

function render(transcriptPath) {
  const out = [];
  for (const line of fs.readFileSync(transcriptPath, 'utf8').split('\n')) {
    let o;
    try { o = JSON.parse(line); } catch { continue; }
    if (o.isSidechain || o.isMeta || o.isCompactSummary) continue;
    const c = o.message && o.message.content;
    if (o.type === 'user' && typeof c === 'string') {
      const t = stripReminders(c);
      if (isHumanPrompt(t)) out.push(`### ${stamp(o.timestamp)} · DM\n\n${t}`);
    } else if (o.type === 'attachment' && o.attachment?.type === 'queued_command' && o.attachment.origin?.kind === 'human') {
      const p = o.attachment.prompt;
      const t = (Array.isArray(p) ? p.filter((b) => b.type === 'text').map((b) => b.text).join('\n') : String(p || '')).trim();
      if (isHumanPrompt(t)) out.push(`### ${stamp(o.timestamp)} · DM (mid-turn)\n\n${t}`);
    } else if (o.type === 'assistant' && Array.isArray(c)) {
      const t = c.filter((b) => b.type === 'text').map((b) => b.text).join('\n\n').trim();
      if (t) out.push(`### ${stamp(o.timestamp)} · Claude\n\n${t}`);
    }
  }
  return out;
}

const git = (args, opts = {}) => execFileSync('git', args, { cwd: REPO, encoding: 'utf8', stdio: ['pipe', 'pipe', 'pipe'], ...opts }).trim();

function pushLog(rel, body) {
  const tmpIndex = path.join(os.tmpdir(), `chat-log-index-${process.pid}`);
  const env = { ...process.env, GIT_INDEX_FILE: tmpIndex };
  try {
    for (let attempt = 1; attempt <= 3; attempt++) {
      git(['fetch', '-q', 'origin', BRANCH]);
      const base = git(['rev-parse', `origin/${BRANCH}`]);
      const blob = git(['hash-object', '-w', '--stdin'], { input: body });
      let current = '';
      try { current = git(['rev-parse', `${base}:${rel}`]); } catch { /* new file */ }
      if (current === blob) return 'unchanged';
      git(['read-tree', base], { env });
      git(['update-index', '--add', '--cacheinfo', `100644,${blob},${rel}`], { env });
      const tree = git(['write-tree'], { env });
      const msg = `chore(log): chat log ${path.basename(rel)}\n\nCo-Authored-By: claude-flow <ruv@ruv.net>`;
      const commit = git(['commit-tree', tree, '-p', base, '-m', msg]);
      try { git(['push', '-q', 'origin', `${commit}:refs/heads/${BRANCH}`]); return `pushed ${commit.slice(0, 7)}`; }
      catch (e) { if (attempt === 3) throw e; } // another device pushed first: refetch and retry
    }
  } finally {
    fs.rmSync(tmpIndex, { force: true });
  }
}

function run(transcriptPath, sessionId, dryRun) {
  const entries = render(transcriptPath);
  if (!entries.length) return 'empty';
  const first = fs.readFileSync(transcriptPath, 'utf8').match(/"timestamp":"([^"]+)"/);
  const day = first ? new Date(first[1]).toLocaleString('sv-SE').slice(0, 10) : 'undated';
  const rel = `.claude/logs/${day}-${sessionId.slice(0, 8)}.md`;
  const body = redact(`# Chat log ${day} · session ${sessionId.slice(0, 8)} · ${os.hostname()}\n\n` +
    'DM prompts and Claude replies only (no tool output). Written by `.claude/hooks/chat-log.mjs`.\n\n' +
    entries.join('\n\n---\n\n') + '\n');
  if (dryRun) { process.stdout.write(body); return `dry-run ${rel}`; }
  return `${rel}: ${pushLog(rel, body)}`;
}

function selfTest() {
  const assert = (cond, msg) => { if (!cond) { console.error('FAIL', msg); process.exit(1); } };
  assert(redact('key sk-abcdefghijklmnopqrstuv1234') === 'key [secret]', 'sk key');
  assert(redact('ssh root@203.0.113.7') === 'ssh [email]', 'user@ip');
  assert(redact('host 203.0.113.7 up') === 'host [ip] up', 'ip');
  assert(redact('serve 127.0.0.1:8765') === 'serve 127.0.0.1:8765', 'localhost kept');
  assert(redact('password: hunter2') === 'password: [secret]', 'password');
  assert(redact('mail me@x.com') === 'mail [email]', 'email');
  assert(stripReminders('a<system-reminder>x</system-reminder>') === 'a', 'reminder strip');
  assert(!isHumanPrompt('<task-notification>') && isHumanPrompt('hi'), 'prompt filter');
  console.log('chat-log self-test: ok');
}

const [mode, arg] = process.argv.slice(2);
if (mode === '--test') selfTest();
else if (mode === '--dry-run') console.error(run(arg, 'dryrun00', true));
else if (mode === '--child') {
  // ponytail: fixed 3 s wait so the transcript has the final reply flushed; Stop hooks fire right at turn end
  setTimeout(() => {
    try { run(arg, process.argv[4], false); }
    catch (e) { fs.appendFileSync(path.join(os.tmpdir(), 'chat-log-errors.txt'), `${new Date().toISOString()} ${e.message}\n`); }
  }, 3000);
} else {
  let input = '';
  process.stdin.on('data', (d) => { input += d; });
  process.stdin.on('end', () => {
    let hook = {};
    try { hook = JSON.parse(input || '{}'); } catch { /* not hook JSON */ }
    if (!hook.transcript_path || !hook.session_id) return;
    // Detach so the fetch + push never delays the next prompt.
    spawn(process.execPath, [SELF, '--child', hook.transcript_path, hook.session_id], { detached: true, stdio: 'ignore', windowsHide: true }).unref();
  });
}
