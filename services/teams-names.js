import client from './client.js';

export async function getTeams() {
    const response = await client
        .from('team-table')
        .select(`
            id,
            name,
        `);

    return response;
}

export async function getPlayers() {
    const response = await client
        .from('player-table')
        .select(`
            id,
            name,
            team_id,
        `);

    return response;
}

export async function addPlayer(playerName, teamName) {
    const response = await client
        .from('team-table')
        .insert({
            name: playerName,
            team_id: teamName
        })
        .single();

    return response;
}

export async function removePlayer(playerName) {
    const response = await client
        .from('team-table')
        .delete()
        .eq('id', playerName)
        .single();

    return response;
}

//addPlayer removePlayer

//getPlayersWithTeams