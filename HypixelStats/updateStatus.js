let intervalId;
export let session = document.getElementById('session');
let gameType = document.getElementById('gameType');
const apiKey = "4074995b-3d71-488b-8338-148b96a52329";

export function updatePlayerName(newName) {
    let playerNameElement = document.querySelector('.playerName');
    playerNameElement.textContent = newName;
}

export function updateStatus(playerName, uuid) {
    clearInterval(intervalId);

    fetch(`https://api.hypixel.net/v2/status?key=${apiKey}&name=${playerName}&uuid=${uuid}`)
    .then(response => response.json())
    .then(data => {
        let online = data.session.online;
        let gameType1 = data.session.gameType;
        let mode = data.session.mode;
        let map = data.session.map;
        
        session.textContent = online ? "Online" : "Offline";
        session.style.color = online ? "green" : "red";

        gameType1.textContent = "" + gameType;

        intervalId = setInterval(() => updateStatus(playerName, uuid), 5000);
    })
    .catch(error => console.log('Error:', error))
}
