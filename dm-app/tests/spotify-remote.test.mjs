// node dm-app/tests/spotify-remote.test.mjs: the music helper's pure parts.
import assert from "node:assert";
import { checkUri, challenge, authorizeUrl, pickDevice, playBody } from "../tools/spotify-remote.mjs";

// only real Spotify URIs are ever played
assert.deepStrictEqual(checkUri("spotify:playlist:3gAHnpENZmGqWkAMGGNOpV"), { kind: "playlist", uri: "spotify:playlist:3gAHnpENZmGqWkAMGGNOpV" });
assert.strictEqual(checkUri("spotify:track:short"), null);
assert.strictEqual(checkUri("spotify:artist:3gAHnpENZmGqWkAMGGNOpV"), null, "an artist cannot be started as a context here");
assert.strictEqual(checkUri("https://evil.example/x"), null);
assert.strictEqual(checkUri(null), null);

// PKCE S256, the example from RFC 7636 appendix B
assert.strictEqual(challenge("dBjftJeZ4CVP-mB92K27uhbUJU1p1r_wW1gFWFOEjXk"), "E9Melhoa2OwvFrEMTJguCHaoeK1t8URWbuGJSstw-cM");
const u = new URL(authorizeUrl("0123456789abcdef0123456789abcdef", "v", "s"));
assert.strictEqual(u.searchParams.get("redirect_uri"), "http://127.0.0.1:8888/callback");
assert.strictEqual(u.searchParams.get("code_challenge_method"), "S256");
assert.ok(!u.search.includes("secret"), "no secret in the login");

// the device: the one playing, else the computer, never a restricted one
const pc = { id: "a", type: "Computer", is_active: false, is_restricted: false };
const phone = { id: "b", type: "Smartphone", is_active: true, is_restricted: false };
assert.strictEqual(pickDevice([pc, phone]), phone);
assert.strictEqual(pickDevice([pc, { ...phone, is_active: false }]), pc);
assert.strictEqual(pickDevice([{ ...pc, is_restricted: true }]), null);
assert.strictEqual(pickDevice([]), null);

// a playlist starts at a random one of its first seven tracks; a track plays alone
assert.deepStrictEqual(playBody({ kind: "playlist", uri: "p" }, () => 0.99), { context_uri: "p", offset: { position: 6 } });
assert.deepStrictEqual(playBody({ kind: "album", uri: "a" }), { context_uri: "a" });
assert.deepStrictEqual(playBody({ kind: "track", uri: "t" }), { uris: ["t"] });

console.log("spotify-remote: all tests passed");
