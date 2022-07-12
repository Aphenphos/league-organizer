
function Player({ player }) {

    const tablePlayerName = document.createElement('tr');
    tablePlayerName.classList.add('player');

    const name = document.createElement('td');
    name.textContent = player.name;
    console.log(player);
    const team = document.createElement('td');
    team.textContent = player.teams.name;

    tablePlayerName.append(name, team);

    return tablePlayerName;
}

export function createPlayers(tbody) {
    return ({ players }) => {
        tbody.innerHTML = '';

        for (const player of players) {
            const item = Player({ player });
            tbody.append(item);
        }
    };
}