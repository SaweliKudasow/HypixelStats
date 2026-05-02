const express = require('express');
const { Client, getPlayerRank, getNetworkLevel } = require('@zikeji/hypixel');
const axios = require('axios');
const token = require('./token.json');

const app = express();
const port = 3010;
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
        const playersCount = await getPlayersCount();

        res.json({
            name: profile.name,
            id: profile.id,
            rank: rank.cleanName,
            level: hypixelLevel.level,
            status: status,
            playersCount: playersCount
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

async function getPlayersCount() {
    try {
        const response = await axios.get('https://api.hypixel.net/counts', {
            headers: {
                'API-Key': token.token
            }
        });
        
        if (response.data && response.data.success && response.data.playerCount !== undefined) {
            return response.data.playerCount;
        }
        return 0;
    } catch (error) {
        console.error('Error fetching player count:', error.message);
        return 0;
    }
}

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
