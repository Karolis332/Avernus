async (page) => {
  const firstId = () => page.evaluate(() => { const a = document.querySelector('a[href*="/jobs/"]'); return a ? a.getAttribute('href').split('/jobs/')[1].split('?')[0] : null; });
  const before = await firstId();
  await page.locator('#desktop_input_bar').fill("Flash overheating, the lava cracks between his scales blazing white-hot, steam and smoke pouring off him, glowing like a forge, in pain and fury. Flash, a huge red dragon in his prime: long angular snout, heavy fanged jaw, narrow burning arrogant eyes, long swept-back horns, spined frill, glossy bright scarlet scales with glowing lava cracks, not a single scar. Setting: a cracked volcanic ridge in Avernus. Dungeons & Dragons monster illustration, painterly WOTC sourcebook style, dynamic action scene, realistic, muted desaturated palette, dramatic low-key lighting, no text --ar 3:2 --raw --v 7 --profile srutin4 --sref https://cdn.midjourney.com/91b57529-5938-432e-9c39-0ee4e65c005c/0_1.png --sw 50 --no people, rider, watermark, letters, cute, baby, chibi, cartoon, round cheeks");
  await page.locator('#desktop_input_bar').press('Enter');
  let id = before, t = 0;
  for (; t < 30 && id === before; t++) { await page.waitForTimeout(3000); id = await firstId(); }
  await page.waitForTimeout(40000);
  return JSON.stringify({ job: "B19 flash-overheat", id, waited: t * 3 + 40 });
}