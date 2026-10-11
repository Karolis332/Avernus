// Monster sounds + fan videos, shared by all sessions. Keyed by creature `kind`.
// Sound files live in media/sfx/ (gitignored); credits and licenses are kept here.
(function () {
  "use strict";
  function s(kind, name, label, credit, license) {
    return { label: label, src: "media/sfx/" + kind + "-" + name + ".mp3", credit: credit, license: license };
  }
  var MIXKIT = "Mixkit Free License";

  window.MEDIA = {
    "arkhan-the-cruel": {
      sounds: [
        s("arkhan-the-cruel", "sword-strikes-armor", "Sword Strikes Armor", "Mixkit — Sword strikes armor", MIXKIT),
        s("arkhan-the-cruel", "heavy-sword-smash", "Heavy Sword Smash", "Mixkit — Heavy sword smashes metal", MIXKIT)
      ],
      videos: []
    },
    "torogar-steelfist": {
      sounds: [
        s("torogar-steelfist", "bellow", "Bellow", "Mixkit — Big monster roar", MIXKIT),
        s("torogar-steelfist", "heavy-footsteps", "Heavy Footsteps", "Mixkit — Giant monster footstep", MIXKIT)
      ],
      videos: [
        { label: "Playing a minotaur: character art", url: "https://www.youtube.com/watch?v=4YXn83jK098", credit: "Rookzer0" },
        { label: "Minotaur buffs up (test animation)", url: "https://www.youtube.com/watch?v=KUcE0wd8eW4", credit: "George Ice" }
      ]
    },
    "krull": {
      sounds: [s("krull", "chant", "Chant", "Freesound — mycompasstv", "CC0")],
      videos: []
    },
    "feonor": {
      sounds: [
        s("feonor", "horror-ambience", "Horror Ambience", "Mixkit — Horror ambience", MIXKIT),
        s("feonor", "dark-spellcast", "Dark Spellcast", "Mixkit — Cinematic whoosh magic gust", MIXKIT)
      ],
      videos: []
    },
    "young-black-dragon": {
      sounds: [
        s("young-black-dragon", "roar", "Roar", "Mixkit — Big monster roar", MIXKIT),
        s("young-black-dragon", "acid-hiss", "Acid Hiss", "Freesound — iainmccurdy", "CC0"),
        s("young-black-dragon", "wing-beats", "Wing Beats", "Mixkit — Flying fast swoosh", MIXKIT)
      ],
      videos: [{ label: "Black dragon speed painting", url: "https://www.youtube.com/watch?v=MKRg1ekBILI", credit: "Caroline Pichette" }]
    },
    "young-blue-dragon": {
      sounds: [
        s("young-blue-dragon", "roar", "Roar", "Mixkit — Angry beast roar", MIXKIT),
        s("young-blue-dragon", "lightning-blast", "Lightning Blast", "Mixkit — Electricity lightning blast", MIXKIT),
        s("young-blue-dragon", "wing-beats", "Wing Beats", "Mixkit — Cinematic wind swoosh", MIXKIT)
      ],
      videos: [{ label: "Blue dragon (Skie) speedpaint", url: "https://www.youtube.com/watch?v=M4nq4hZa8DA", credit: "Captain Bi-rownlee" }]
    },
    "young-green-dragon": {
      sounds: [
        s("young-green-dragon", "roar", "Roar", "Mixkit — Angry dragon roar echo", MIXKIT),
        s("young-green-dragon", "poison-hiss", "Poison Hiss", "Freesound — Taberius", "CC0"),
        s("young-green-dragon", "wing-beats", "Wing Beats", "Mixkit — Flying fast swoosh", MIXKIT)
      ],
      videos: []
    },
    "young-red-dragon": {
      sounds: [
        s("young-red-dragon", "roar", "Roar", "Mixkit — Big dragon in the wild roar", MIXKIT),
        s("young-red-dragon", "fire-burst", "Fire Burst", "Mixkit — Fireball spell", MIXKIT),
        s("young-red-dragon", "wing-beats", "Wing Beats", "Mixkit — Swoosh wind passing", MIXKIT)
      ],
      videos: [
        { label: "Red dragon walking and breathing fire (3D)", url: "https://www.youtube.com/watch?v=5AXmSkqpuRs", credit: "skatersollie" },
        { label: "FantasyCon dragon animation", url: "https://www.youtube.com/watch?v=YIHiTUYFAPc", credit: "Squishy Animation" }
      ]
    },
    "adult-white-dragon": {
      sounds: [
        s("adult-white-dragon", "roar", "Roar", "Mixkit — Angry dragon roar echo", MIXKIT),
        s("adult-white-dragon", "icy-breath", "Icy Breath", "Freesound — NoahBangs", "CC BY 4.0"),
        s("adult-white-dragon", "wing-beats", "Wing Beats", "Mixkit — Swirling whoosh", MIXKIT)
      ],
      videos: []
    },
    "manticore": {
      sounds: [
        s("manticore", "roar", "Roar", "Mixkit — Wild lion animal roar", MIXKIT),
        s("manticore", "tail-spike-volley", "Tail Spike Volley", "Mixkit — Arrow whoosh", MIXKIT)
      ],
      videos: []
    },
    "white-abishai": {
      sounds: [
        s("white-abishai", "growl", "Growl", "Mixkit — Monster growl", MIXKIT),
        s("white-abishai", "hiss", "Heavy Breathing", "Mixkit — Creepy demon heavy breathing", MIXKIT)
      ],
      videos: []
    },
    "lulu": {
      sounds: [
        s("lulu", "chime", "Fairy Bell", "Mixkit — Fairy bell bless", MIXKIT),
        s("lulu", "trumpet", "Trumpet", "Freesound — craigsmith", "CC0")
      ],
      videos: []
    },
    "tiamat": {
      sounds: [
        s("tiamat", "roar", "Five-Headed Roar", "Mixkit — Angry dragon roar echo", MIXKIT),
        s("tiamat", "thunder", "Thunder", "Mixkit — Big thunder rumble", MIXKIT)
      ],
      videos: [{ label: "Tiamat glow-up (animation evolution)", url: "https://www.youtube.com/shorts/LynezOipQQs", credit: "MellowBun8" }]
    },
    "avernus": {
      sounds: [
        s("avernus", "wind-loop", "Storm Wind", "Mixkit — Dark storm wind", MIXKIT),
        s("avernus", "battle-ambience", "War Horns", "Mixkit — War horn ambience", MIXKIT),
        s("avernus", "war-machine", "War Machine", "Mixkit — Very old war tank", MIXKIT)
      ],
      videos: [
        { label: "Descent into Avernus animated trailer", url: "https://www.youtube.com/watch?v=aXFYLHxf0oc", credit: "SFMJames" },
        { label: "Animated battle map: Avernus", url: "https://www.youtube.com/watch?v=65jJgjokgyg", credit: "Forgotten Realms Radio" },
        { label: "Hellscape animated battle map", url: "https://www.youtube.com/watch?v=2fwvZ0SDVLw", credit: "Angela Maps (SA Games)" }
      ]
    }
  };
})();
