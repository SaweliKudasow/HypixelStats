const axios = require("axios");
const token = require("./token.json");

(async () => {
    const response = await axios.get('https://api.hypixel.net/v2/counts', {
        headers: { 'API-Key': token.token }
    });
    console.log('Player Count:', response.data.playerCount);
})();
