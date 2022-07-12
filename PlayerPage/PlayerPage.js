import { getUser, signOut } from '../services/auth-service.js';
import { protectPage } from '../utils.js';
import createUser from '../components/User.js';
import { getTeams, getPlayers, getPlayersWithTeams } from '../services/teams-names.js';
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

// async function handleAddPlayer(player, team) {
//     const playerToAdd = await addPlayer(player.name, team.id);

//     team = team.id;
//     team.players.push(playerToAdd);
// }

// async function handleRemovePlayer(player) {
//     await removePlayer(player.id);

//     const team = player.team_id;

//     const index = team.players.indexOf(player);

//     if (index !== -1) {
//         team.players.splice(index, 1);
//     }

//     display();
// }


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