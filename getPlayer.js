import { updateStatus, updatePlayerName, session } from './updateStatus.js';
import { updateGuild } from './guild.js';

let created = document.getElementById('created');

document.getElementById('checkButton').addEventListener('click', function() {
    clearInterval(updateStatus.intervalId);
    var container = document.querySelector(".container");
    var container2 = document.querySelector(".container2");
    var container3 = document.querySelector(".container3");
    var message = document.getElementById("message");

    message.style.display = "none";
    container.style.display = "flex";
    container2.style.display = "flex";
    container3.style.display = "flex";
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

            let created1 = data.created_at;
            created.textContent = created1;
            
            updateStatus(playerName, uuid);
            updatePlayerName(playerName);
            updateGuild(playerName, uuid);
        }
    })
    .catch(error => console.log('Error:', error))
}
