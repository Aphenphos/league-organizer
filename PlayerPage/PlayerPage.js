import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getPlayersWithTeams } from '../services/teams-names.js';
import { createPlayers } from '../components/RenderPlayers.js';
// displays teams
// State
let user = null;
let players = [];

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    players = await getPlayersWithTeams();
    console.log(players);

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


const Players = createPlayers(document.getElementById('players'));

function display() {
    User({ user });
    Players({ players });
}

handlePageLoad();