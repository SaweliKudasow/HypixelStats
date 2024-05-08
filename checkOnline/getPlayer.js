import { updateStatus, updatePlayerName, session } from './updateStatus.js';

document.getElementById('checkButton').addEventListener('click', function() {
    clearInterval(updateStatus.intervalId);
    let playerName = document.getElementById("getPlayer").value;
    session.textContent = "";
    getPlayer(playerName);
});

function getPlayer(playerName) {
    fetch(`https://api.ashcon.app/mojang/v2/user/${playerName}`)
    .then(response => response.json())
    .then(data => {
        if (data.code === 404 || data.code === 400) {
            updateStatus();
            updatePlayerName("Not Found");
        } else {
            const uuid = data.uuid;
            playerName = data.username;
            updateStatus(playerName, uuid);
            updatePlayerName(playerName);
        }
    })
    .catch(error => console.log('Error:', error))
}
