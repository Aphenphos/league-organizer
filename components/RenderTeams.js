function Team({ team }) {
    const li = document.createElement('li');
    li.classList.add('team-container');

    const h1 = document.createElement('h1');
    h1.textContent = team.name;

    const ul = document.createElement('ul');
    ul.classList.add('team-player');
    for (const player of team.players) {
        const P = Player({ player, handleRemovePlayer });
        ul.append(P);
    }

    const form = AddPlayer({ team, handleAddPlayer });

    li.append(h1, ul, form);
}

function Player({ player, handleRemovePlayer }) {
    const li = document.createElement('li');
    li.classList.add('player');

    const h1 = document.createElement('h1');
    h1.textContent = player.name;

    const button = document.createElement('button');
    button.classList.add('deletePlayer');
    button.textContent = 'X';
    button.addEventListener('click', () => {
        handleRemovePlayer(player);
    });

    li.append(h1, button);
}

function AddPlayer({ team, handleAddPlayer }) {
    const form = document.createElement('form');
    
    const input = document.createElement('input');
    input.required = true;
    input.type = 'text';
    input.title = `Add a new player to ${team.name}`;
    input.name = 'new-player-name';
    input.placeholder = 'Player Name';

    form.append(input);

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        await handleAddPlayer(input.value, team.id);
        form.reset;
    });
}