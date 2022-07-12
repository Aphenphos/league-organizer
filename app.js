import { getUser, signOut } from './services/auth-service.js';
import { findById, protectPage } from './utils.js';
import createUser from './components/User.js';
import { addPlayer, addTeam, getTeamsWithPlayers, removePlayer, removeTeam } from './services/teams-names.js';
import { renderTeams } from './components/RenderTeams.js';
// displays teams
// State
let user = null;
let teams = [];

const newTeamInput = document.querySelector('#new-team-input');
// Action Handlers
newTeamInput.addEventListener('submit', async (e) => {
    e.preventDefault();
    const data = new FormData(newTeamInput);
    const newTeam = await addTeam(data.get('new-team-name'));
    
    newTeam.players = [];
    
    teams.push(newTeam);
    
    display();
});

async function handlePageLoad() {
    user = getUser();
    protectPage(user);

    teams = await getTeamsWithPlayers();

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



async function handleRemoveTeam(team) {
    
    for (const player of team.players) {
        await removePlayer(player.id);
    }

    await removeTeam(team.id);
    
    const teamIndex = teams.indexOf(team);
    teams.splice(teamIndex, 1);

    console.log(teams);
    display();
}

async function handleSignOut() {
    signOut();
}

const User = createUser(
    document.querySelector('#user'),
    { handleSignOut }
);

const Teams = renderTeams(
    document.querySelector('#all-teams-container'),
    { handleRemoveTeam, handleAddPlayer, handleRemovePlayer }
);

function display() {
    User({ user });
    Teams({ teams });
}

handlePageLoad();


