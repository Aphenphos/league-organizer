import { getUser, signOut } from './services/auth-service.js';
import { protectPage } from './utils.js';
import createUser from './components/User.js';
// displays teams
// State
let user = null;

// Action Handlers
async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    display();
}

async function handleAddPlayer(player, team) {
    const playerToAdd = await addPlayer(player.name, team.id);

    team = team.id;
    team.players.push(playerToAdd);
}

async function handleSignOut() {
    signOut();
}

// Components 
const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

function display() {
    User({ user });

}

handlePageLoad();


