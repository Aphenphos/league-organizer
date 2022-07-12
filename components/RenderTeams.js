

function Team({ team, handleRemoveTeam, handleAddPlayer, handleRemovePlayer }) {
    const li = document.createElement('li');
    li.classList.add('team-container');
    const button = document.createElement('button');
    button.classList.add('remove-team');
    button.textContent = 'Delete Team';
    button.addEventListener('click', () => {
        handleRemoveTeam(team);
    });
    const h1 = document.createElement('h1');
    h1.textContent = team.name;
    h1.classList.add('team-name');

    const form = AddPlayer({ team, handleAddPlayer });

    const ul = document.createElement('ul');
    ul.classList.add('team-player');
    if (team.players[0] !== undefined) {
        for (const player of team.players) {
            const P = Player({ player, handleRemovePlayer });
            ul.append(P);
        }
        li.append(button, h1, ul, form);
        return li;
    } else { 
        li.append(button, h1, ul, form);
        return li;
    }
}

function Player({ player, handleRemovePlayer }) {
    const li = document.createElement('li');
    li.classList.add('player');

    const h1 = document.createElement('h1');
    h1.textContent = player.name;
    h1.classList.add('player-name');

    const button = document.createElement('button');
    button.classList.add('deletePlayer');
    button.textContent = 'X';
    button.addEventListener('click', () => {
        handleRemovePlayer(player);
    });
    li.append(h1, button);

    return li;
}

function AddPlayer({ team, handleAddPlayer }) {
    const form = document.createElement('form');
    form.classList.add('input-form');
    
    const input = document.createElement('input');
    input.required = true;
    input.type = 'text';
    input.title = `Add a new player to ${team.name}`;
    input.name = 'new-player-name';
    input.placeholder = 'New Player Name';
    input.classList.add('text-input');

    form.append(input);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleAddPlayer(input.value, team.id);
        form.reset;
    });
    return form;
}


export function renderTeams(root,
    {   
        handleRemoveTeam,
        handleAddPlayer,
        handleRemovePlayer
    }) {
    return ({ teams }) => {
        root.innerHTML = '';

        for (const team of teams) {
            const item = Team({
                handleRemoveTeam,
                team,
                handleAddPlayer,
                handleRemovePlayer,
            });
            root.append(item);

        }
    };
}