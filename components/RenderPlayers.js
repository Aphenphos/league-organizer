export default function createPlayers(tbody) {
    return ({ players }) => {
        tbody.innerHTML = '';

        for (const player of players) {
            const playerList = Player({ player });
            tbody.append(playerList);
        }
    };
}

function Player({ player }) {

    const tablePlayerName = document.createElement('tr');
    tablePlayerName.classList.add('player');

    const name = document.createElement('td');
    name.textContent = player.name;

    const team = document.createElement('td');
    team.textContent = player.team.name;
    

    tablePlayerName.append(name, team);

    return tablePlayerName;
}