const { Client } = require("@zikeji/hypixel");
const client = new Client("ff0c035d-6c62-410d-978e-e1c24a599b2b");
(async () => {
    const profiles = await client.skyblock.profile("842874a2-939d-4195-bcd8-b3de8fa9df95");
    const gameCounts = await client.gameCounts();
    console.log(gameCounts.playerCount);
    // console.log(profiles.members.f4b1a2073523421fbc5fac6f93d50229.collection);
})();
