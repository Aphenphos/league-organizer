export function createPlayers(tbody) {
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
    team.textContent = player.teams_id;
    console.log(player.team_id);

    // you good
    // it is showing data
    // player id showed more data i believe
    // i see what your sayingh
    

    //  saying their team ID is undefined
    //yeah id is showing the actual players IDs not the teams IDs
    // idk wh its not showing the teams ids
    // oh I know why we need to make the one that shows players with teams 
    

    tablePlayerName.append(name, team);

    return tablePlayerName;
}