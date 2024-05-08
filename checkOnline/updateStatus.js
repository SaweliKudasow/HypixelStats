let intervalId;
export const session = document.getElementById('session');
const apiKey = "f287ae33-d3d1-41cf-9bcf-a0c30dff37f0";

export function updatePlayerName(newName) {
    let playerNameElement = document.querySelector('.playerName');
    playerNameElement.textContent = newName;
}

export function updateStatus(playerName, uuid) {
    clearInterval(intervalId);

    fetch(`https://api.hypixel.net/v2/status?key=${apiKey}&name=${playerName}&uuid=${uuid}`)
    .then(response => response.json())
    .then(data => {
        const online = data.session.online;
        
        session.textContent = online ? "Online" : "Offline";
        session.style.color = online ? "green" : "red";

        intervalId = setInterval(() => updateStatus(playerName, uuid), 5000);
    })
    .catch(error => console.log('Error:', error))
}
