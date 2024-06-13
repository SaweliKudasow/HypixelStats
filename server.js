const express = require('express');
const { Client, getPlayerRank, getNetworkLevel } = require('@zikeji/hypixel');
const axios = require('axios');
const token = require('./token.json');

const app = express();
const port = 3000;
const client = new Client(token.token);

app.use(express.static('public'));
app.use(express.json());

app.post('/getPlayerInfo', async (req, res) => {
    const { username } = req.body;
    
    try {
        const profile = await getPlayer(username);
        const player = await client.player.uuid(profile.id);
        const rank = getPlayerRank(player);
        const hypixelLevel = getNetworkLevel(player);
        const status = await client.status.uuid(profile.id);
        const playersCount = await client.gameCounts();

        res.json({
            name: profile.name,
            id: profile.id,
            rank: rank.cleanName,
            level: hypixelLevel.level,
            status: status,
            playersCount: playersCount.playerCount
        });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

async function getPlayer(username) {
    const url = `https://api.mojang.com/users/profiles/minecraft/${username}`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        throw new Error('Player not found');
    }
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
