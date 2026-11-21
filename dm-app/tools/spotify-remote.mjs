// The DM app's quiet music: a click on a place starts its playlist in the Spotify app through the Web API, so the
// Spotify window never pops up. Run before the session:  node dm-app/tools/spotify-remote.mjs
// First run on a machine: open http://127.0.0.1:8888/login once and press Agree (needs Spotify Premium).
// Reads only the app's Client ID from ~/.spotify-dm/credentials.json ({"clientId": "..."}); the login is PKCE, so no
// secret is needed. The login token stays in ~/.spotify-dm/remote-token.json, never in the repo.
// ponytail: anything on this machine can ask it to change the music (no key); it only ever plays a checked Spotify URI.
import { createServer } from "node:http";
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

// ---- the server ----
function clientId() {
  try {
    const id = String(JSON.parse(readFileSync(join(DIR, "credentials.json"), "utf8")).clientId || "").trim();
    if (/^[0-9a-f]{32}$/i.test(id)) return id;
  } catch (e) { /* reported below */ }
  throw new Error(`put the Spotify app's Client ID in ${join(DIR, "credentials.json")} as {"clientId": "..."}`);
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
async function play(target) {
  const device = pickDevice((await api("GET", "/me/player/devices")).devices);
  if (!device) throw new Error("no Spotify app found: open Spotify on this computer and play anything once");
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

  createServer(async (req, res) => {
    const url = new URL(req.url, `http://127.0.0.1:${PORT}`);
    try {
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
        return reply(res, 200, { ok: true, connected: !!(t && t.refresh), login: `http://127.0.0.1:${PORT}/login` });
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
    console.log(`DM music helper on http://127.0.0.1:${PORT}. ` + (t && t.refresh ? "Logged in. Leave this window open." : `First time: open http://127.0.0.1:${PORT}/login and press Agree.`));
  });
}

if (import.meta.url === pathToFileURL(process.argv[1] || "").href) {
  try { clientId(); } catch (e) { console.error("spotify-remote: " + e.message); process.exit(1); }
  serve();
}
