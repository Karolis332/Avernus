// The DM app's quiet music: a click on a place starts its playlist in the Spotify app through the Web API, so the
// Spotify window never pops up. Started by dm-app/start-emporium.cmd (or: node dm-app/tools/spotify-remote.mjs).
// First run on a machine: open http://127.0.0.1:8888/ : it asks for the Spotify app's Client ID once (saved in
// ~/.spotify-dm/credentials.json as {"clientId": "..."}), then Connect Spotify, Agree (needs Spotify Premium).
// The login is PKCE, so no client secret is needed. The token stays in ~/.spotify-dm/remote-token.json, never in the repo.
// ponytail: anything on this machine can ask it to change the music (no key); it only ever plays a checked Spotify URI.
import { createServer } from "node:http";
import { spawn } from "node:child_process";
import { createHash, randomBytes } from "node:crypto";
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";
import { pathToFileURL } from "node:url";

export const PORT = 8888; // its callback is the redirect URI already set in the DM's Spotify app
const REDIRECT = `http://127.0.0.1:${PORT}/callback`;
const SCOPES = "user-modify-playback-state user-read-playback-state";
const DIR = join(homedir(), ".spotify-dm");
const TOKEN_FILE = join(DIR, "remote-token.json");
const MIN_TRACKS = 7; // every Emporium playlist has at least this many: a random start among them

// ---- pure parts (tests/spotify-remote.test.mjs) ----
export function checkUri(uri) {
  const m = /^spotify:(playlist|album|track):([A-Za-z0-9]{22})$/.exec(String(uri || ""));
  return m ? { kind: m[1], uri: m[0] } : null;
}
export function challenge(verifier) { return createHash("sha256").update(verifier).digest("base64url"); }
export function authorizeUrl(clientId, verifier, state) {
  const q = new URLSearchParams({ client_id: clientId, response_type: "code", redirect_uri: REDIRECT, scope: SCOPES,
    code_challenge_method: "S256", code_challenge: challenge(verifier), state });
  return "https://accounts.spotify.com/authorize?" + q;
}
// The device to play on: the one already playing, else the computer's Spotify app, else any that takes commands.
export function pickDevice(devices) {
  const ok = (devices || []).filter((d) => !d.is_restricted && d.id);
  return ok.find((d) => d.is_active) || ok.find((d) => d.type === "Computer") || ok[0] || null;
}
export function playBody(target, random = Math.random) {
  if (target.kind === "track") return { uris: [target.uri] };
  const body = { context_uri: target.uri };
  if (target.kind === "playlist") body.offset = { position: Math.floor(random() * MIN_TRACKS) };
  return body;
}
export function validClientId(id) { return /^[0-9a-f]{32}$/i.test(String(id || "").trim()); }
// The credentials file with the Client ID set; anything else in it (the Spotify MCP's own keys) is kept.
export function withClientId(text, id) {
  let old = {};
  try { old = JSON.parse(text) || {}; } catch (e) { /* no file yet, or not JSON: start clean */ }
  return JSON.stringify(Object.assign({}, old, { clientId: String(id).trim() }), null, 2);
}

// ---- the server ----
const CREDENTIALS = join(DIR, "credentials.json");
function readCredentials() { try { return readFileSync(CREDENTIALS, "utf8"); } catch (e) { return ""; } }
function hasClientId() { try { return validClientId(JSON.parse(readCredentials()).clientId); } catch (e) { return false; } }
function clientId() {
  if (hasClientId()) return JSON.parse(readCredentials()).clientId.trim();
  throw new Error(`no Spotify Client ID on this computer yet: open http://127.0.0.1:${PORT}/ and paste it`);
}
function loadToken() { try { return JSON.parse(readFileSync(TOKEN_FILE, "utf8")); } catch (e) { return null; } }
function saveToken(t, old) {
  const next = { access: t.access_token, refresh: t.refresh_token || (old && old.refresh), until: Date.now() + (t.expires_in - 60) * 1000 };
  mkdirSync(DIR, { recursive: true });
  writeFileSync(TOKEN_FILE, JSON.stringify(next), { mode: 0o600 });
  return next;
}
async function tokenCall(params) {
  const r = await fetch("https://accounts.spotify.com/api/token", { method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" }, body: new URLSearchParams(params) });
  const t = await r.json();
  if (!r.ok) throw new Error("Spotify login: " + (t.error_description || t.error || r.status));
  return t;
}
async function accessToken() {
  const t = loadToken();
  if (!t || !t.refresh) throw new Error(`not logged in: open http://127.0.0.1:${PORT}/login once`);
  if (t.access && Date.now() < t.until) return t.access;
  return saveToken(await tokenCall({ grant_type: "refresh_token", refresh_token: t.refresh, client_id: clientId() }), t).access;
}
async function api(method, path, body) {
  const r = await fetch("https://api.spotify.com/v1" + path, { method,
    headers: { Authorization: "Bearer " + await accessToken(), "Content-Type": "application/json" },
    body: body ? JSON.stringify(body) : undefined });
  const text = await r.text();
  if (!r.ok) {
    let why = text;
    try { why = JSON.parse(text).error.message; } catch (e) { /* plain text */ }
    throw new Error(`Spotify ${r.status}: ${why}`.slice(0, 200));
  }
  return text ? JSON.parse(text) : null;
}
// Spotify closed: start it (its window comes up this once) and wait up to ten seconds for it to log in.
function openSpotify() {
  const [cmd, args] = process.platform === "win32" ? ["cmd.exe", ["/c", "start", "", "spotify:"]]
    : process.platform === "darwin" ? ["open", ["-a", "Spotify"]] : ["spotify", []];
  spawn(cmd, args, { detached: true, stdio: "ignore", windowsHide: true }).on("error", () => {}).unref();
}
async function findDevice() {
  const look = async () => pickDevice((await api("GET", "/me/player/devices")).devices);
  let device = await look();
  if (device) return device;
  openSpotify();
  for (let i = 0; i < 10 && !device; i++) {
    await new Promise((r) => setTimeout(r, 1000));
    device = await look();
  }
  return device;
}
async function play(target) {
  const device = await findDevice();
  if (!device) throw new Error("Spotify did not answer: open it, play anything once, then click the place again");
  const q = "?device_id=" + encodeURIComponent(device.id);
  await api("PUT", "/me/player/play" + q, playBody(target));
  if (target.kind !== "track") await api("PUT", "/me/player/shuffle" + q + "&state=true");
}

function serve() {
  let pending = null; // { verifier, state } of the login in progress
  const reply = (res, code, body, type = "application/json") => {
    res.writeHead(code, { "Content-Type": type + "; charset=utf-8", "Access-Control-Allow-Origin": "*", "Cache-Control": "no-store" });
    res.end(type === "application/json" ? JSON.stringify(body) : body);
  };
  const page = (text) => `<!doctype html><meta charset="utf-8"><title>DM music</title><body style="font:18px sans-serif;padding:3em;background:#1b1512;color:#eadfc8">${text}</body>`;

  const home = () => {
    const t = loadToken();
    if (!hasClientId()) return page(`<h2>DM music: first time on this computer</h2>
<p>Paste the Client ID of the DM's Spotify app (developer.spotify.com, Dashboard, the app, Settings). It stays on this computer.</p>
<form method="post" action="/setup"><input name="clientId" size="36" autofocus style="font:inherit;padding:.3em">
<button style="font:inherit;padding:.3em 1em">Save</button></form>`);
    if (!(t && t.refresh)) return page(`<h2>DM music: one step left</h2><p><a style="color:#f0b45a" href="/login">Connect Spotify</a>, then press Agree.</p>`);
    return page(`<h2>DM music is ready</h2><p>Leave the helper's window open. A click on a place in the Emporium starts its playlist in Spotify.</p>`);
  };
  const readBody = (req) => new Promise((ok, fail) => {
    let body = "";
    req.on("data", (c) => { body += c; if (body.length > 2000) { fail(new Error("too long")); req.destroy(); } });
    req.on("end", () => ok(body));
  });

  createServer(async (req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    try {
      if (url.pathname === "/") return reply(res, 200, home(), "text/html");
      if (url.pathname === "/setup" && req.method === "POST") {
        // first run only: a page elsewhere must not swap the ID of a machine that is set up
        if (hasClientId()) return reply(res, 409, page("This computer already has a Client ID. <a href='/'>Back</a>"), "text/html");
        const id = new URLSearchParams(await readBody(req)).get("clientId");
        if (!validClientId(id)) return reply(res, 400, page("That is not a Client ID: 32 letters and digits. <a href='/'>Try again</a>"), "text/html");
        mkdirSync(DIR, { recursive: true });
        writeFileSync(CREDENTIALS, withClientId(readCredentials(), id), { mode: 0o600 });
        res.writeHead(302, { Location: "/login" });
        return res.end();
      }
      if (url.pathname === "/login" && !hasClientId()) {
        res.writeHead(302, { Location: "/" });
        return res.end();
      }
      if (url.pathname === "/login") {
        pending = { verifier: randomBytes(48).toString("base64url"), state: randomBytes(16).toString("hex") };
        res.writeHead(302, { Location: authorizeUrl(clientId(), pending.verifier, pending.state) });
        return res.end();
      }
      if (url.pathname === "/callback") {
        if (!pending || url.searchParams.get("state") !== pending.state) return reply(res, 400, page("This login is out of date: open /login again."), "text/html");
        if (url.searchParams.get("error")) return reply(res, 400, page("Spotify said: " + url.searchParams.get("error")), "text/html");
        saveToken(await tokenCall({ grant_type: "authorization_code", code: url.searchParams.get("code"), redirect_uri: REDIRECT,
          client_id: clientId(), code_verifier: pending.verifier }));
        pending = null;
        return reply(res, 200, page("Spotify is connected. Close this tab: the DM app's places now change the music quietly."), "text/html");
      }
      if (url.pathname === "/status") {
        const t = loadToken();
        return reply(res, 200, { ok: true, setup: hasClientId(), connected: !!(t && t.refresh), login: `http://127.0.0.1:${PORT}/` });
      }
      if (url.pathname === "/play") {
        const target = checkUri(url.searchParams.get("uri"));
        if (!target) return reply(res, 400, { ok: false, error: "not a Spotify playlist, album or track" });
        await play(target);
        return reply(res, 200, { ok: true });
      }
      reply(res, 404, { ok: false, error: "unknown" });
    } catch (e) {
      process.stderr.write("spotify-remote: " + e.message + "\n");
      reply(res, 200, { ok: false, error: e.message });
    }
  }).on("error", (e) => {
    process.stderr.write(e.code === "EADDRINUSE" ? `spotify-remote: port ${PORT} is taken (already running?)\n` : e.message + "\n");
    process.exit(1);
  }).listen(PORT, "127.0.0.1", () => {
    const t = loadToken();
    console.log(`DM music helper on http://127.0.0.1:${PORT}. ` + (hasClientId() && t && t.refresh
      ? "Logged in. Leave this window open." : `First time on this computer: open http://127.0.0.1:${PORT}/`));
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) serve();
