export let guild1 = document.getElementById('guild');
export let guildName = document.getElementById('guildName');
const apiKey = "4074995b-3d71-488b-8338-148b96a52329";

export function updateGuild(playerName, uuid) {
    fetch(`https://api.hypixel.net/v2/guild?key=${apiKey}&name=${playerName}&uuid=${uuid}`)
    .then(response => response.json())
    .then(data => {
        let guild = data.guild;
        
        guild1.textContent = "Guild: ";

        if(guild === null) {
            guildName.style.color = "red";
            guildName.textContent = "None";
        } else {
            guildName.style.color = "rgb(136, 136, 136)";

            guildName.textContent = "" + guild.name;
        }
    })
    .catch(error => console.log('Error:', error))
}
