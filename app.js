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

async function handleAddPlayer(playerName, teamId) {
    const playerToAdd = await addPlayer(playerName, teamId);

    const team = findById(teams, teamId);
    team.players.push(playerToAdd);

    display();
}

async function handleRemovePlayer(player) {
    await removePlayer(player.id);

    const team = findById(teams, player.team_id);

    const index = team.players.indexOf(player);
    if (index !== -1) {
        team.players.splice(index, 1);
    }

    display();
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


