let errorMessage = document.getElementById('errorMessage');
let resultsPanel = document.getElementById('playerResults');

const tabOverview = document.getElementById('tab-overview');
const tabAchievements = document.getElementById('tab-achievements');
const panelOverview = document.getElementById('panel-overview');
const panelAchievements = document.getElementById('panel-achievements');

function setResultsTab(which) {
    const isOverview = which === 'overview';
    tabOverview.setAttribute('aria-selected', String(isOverview));
    tabAchievements.setAttribute('aria-selected', String(!isOverview));
    tabOverview.classList.toggle('tab-btn-active', isOverview);
    tabAchievements.classList.toggle('tab-btn-active', !isOverview);
    panelOverview.hidden = !isOverview;
    panelAchievements.hidden = isOverview;
}

tabOverview.addEventListener('click', () => setResultsTab('overview'));
tabAchievements.addEventListener('click', () => setResultsTab('achievements'));

tabOverview.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') {
        e.preventDefault();
        tabAchievements.focus();
        setResultsTab('achievements');
    }
});
tabAchievements.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowLeft') {
        e.preventDefault();
        tabOverview.focus();
        setResultsTab('overview');
    }
});

document.getElementById('username').addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        getPlayerInfo();
    }
});

async function getPlayerInfo() {
    const username = document.getElementById('username').value;

    let attempts = 0;
    const maxAttempts = 5;

    while (attempts < maxAttempts) {
        try {
            const data = await fetchPlayerInfo(username);
            displayPlayerInfo(data);
            return;
        } catch (error) {
            attempts++;
            console.error(`Attempt ${attempts} failed:`, error);

            if (attempts === maxAttempts) {
                displayError(error.message);
            }
        }
    }
}

async function fetchPlayerInfo(username) {
    const response = await fetch('/getPlayerInfo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error);
    }

    return response.json();
}

function formatHypixelTimestamp(ms) {
    if (ms == null || Number.isNaN(ms)) return '—';
    const d = new Date(ms);
    return d.toLocaleString(undefined, {
        dateStyle: 'medium',
        timeStyle: 'short'
    });
}

function formatAchievementKey(key) {
    return String(key)
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1).toLowerCase())
        .join(' ');
}

function displayPlayerInfo(data) {
    errorMessage.textContent = '';
    errorMessage.style.display = 'none';

    if (resultsPanel.classList.contains('down')) {
        resultsPanel.classList.remove('down');
    }
    resultsPanel.classList.add('up');

    document.body.style.overflow = '';

    document.querySelector('.hero').classList.add('hide');
    document.querySelector('.Search').classList.add('anim');

    document.getElementById('playerName').textContent = data.name;
    document.getElementById('playerId').textContent = data.id;
    document.getElementById('playerRank').textContent = data.rank;
    document.getElementById('playerLevel').textContent = data.level;

    const sessionEl = document.getElementById('playerSession');
    const online = Boolean(data.status && data.status.online);
    sessionEl.textContent = online ? 'Online' : 'Offline';
    sessionEl.classList.remove('online', 'offline');
    sessionEl.classList.add(online ? 'online' : 'offline');

    document.getElementById('playerKarma').textContent =
        data.karma != null ? String(data.karma) : '—';
    document.getElementById('playerFirstLogin').textContent = formatHypixelTimestamp(data.firstLogin);
    document.getElementById('playerLastLogin').textContent = formatHypixelTimestamp(data.lastLogin);

    const points = data.achievementPoints ?? 0;
    document.getElementById('playerAchievementPoints').textContent = String(points);

    const oneTime = Array.isArray(data.achievementsOneTime) ? data.achievementsOneTime : [];
    document.getElementById('oneTimeAchievementsCount').textContent = String(oneTime.length);

    const oneTimeList = document.getElementById('achievementsOneTimeList');
    oneTimeList.replaceChildren();
    [...oneTime].sort((a, b) => a.localeCompare(b)).forEach((id) => {
        const li = document.createElement('li');
        li.textContent = formatAchievementKey(id);
        oneTimeList.appendChild(li);
    });

    const tiered = data.achievementsTiered && typeof data.achievementsTiered === 'object'
        ? data.achievementsTiered
        : {};
    const tieredEntries = Object.entries(tiered).filter(
        ([, tier]) => typeof tier === 'number' && tier > 0
    );
    document.getElementById('tieredAchievementsCount').textContent = String(tieredEntries.length);

    const tieredList = document.getElementById('achievementsTieredList');
    tieredList.replaceChildren();
    tieredEntries
        .sort(([a], [b]) => a.localeCompare(b))
        .forEach(([key, tier]) => {
            const li = document.createElement('li');
            const label = document.createElement('span');
            label.textContent = formatAchievementKey(key);
            const tierSpan = document.createElement('span');
            tierSpan.className = 'tiered-tier';
            tierSpan.textContent = ` · tier ${tier}`;
            li.appendChild(label);
            li.appendChild(tierSpan);
            tieredList.appendChild(li);
        });

    const countEl = document.getElementById('playersCount');
    const valueEl = countEl.querySelector('.live-value');
    if (valueEl) {
        valueEl.textContent = String(data.playersCount);
    } else {
        countEl.textContent = `Players: ${data.playersCount}`;
    }
    countEl.classList.add('wakeup');

    setResultsTab('overview');
}

function displayError(message) {
    console.log(message);

    errorMessage.textContent = message;
    errorMessage.style.display = 'block';

    if (resultsPanel.classList.contains('up')) {
        resultsPanel.classList.remove('up');
    }
    resultsPanel.classList.add('down');

    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';
}
