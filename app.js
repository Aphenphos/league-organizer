import { getUser, signOut } from './services/auth-service.js';
import { findById, protectPage } from './utils.js';
import createUser from './components/User.js';
import { addPlayer, getTeams, getTeamsWithPlayers, removePlayer } from './services/teams-names.js';
import { renderTeams } from './components/RenderTeams.js';
// displays teams
// State
let user = null;
let teams = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    teams = await getTeamsWithPlayers();
    console.log(teams);

    display();
}

async function handleAddPlayer(player, team) {
    const playerToAdd = await addPlayer(player.name, team.id);

    team = team.id;
    team.players.push(playerToAdd);
}

async function handleRemovePlayer(player) {
    await removePlayer(player.id);

    const team = (player.team_id);

    const index = findById(teams, player.team_id);
    console.log(index);
    if (index !== -1) {
        team.players.splice(index, 1);
    }
}


async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Teams = renderTeams(
    document.querySelector('#all-teams-container'),
    { handleAddPlayer, handleRemovePlayer }
);

function display() {
    User({ user });
    Teams({ teams });
}

handlePageLoad();


