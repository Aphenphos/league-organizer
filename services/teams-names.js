import { client } from './client.js';

export async function getTeams() {
    const response = await client
        .from('team-table')
        .select(`
            id,
            name
        `);

    return response.data;
}

export async function getTeamsWithPlayers() {
    const response = await client
        .from('team-table')
        .select(`
            id,
            name,
            players:player-table(
                name,
                id,
                team_id
            )
        `);
    return response.data;
}

export async function getPlayers() {
    const response = await client
        .from('player-table')
        .select(`
            id,
            name,
            team_id
        `);

    return response.data;

}

export async function getPlayersWithTeams() {
    const response = await client
        .from('player-table')
        .select(`
        id,
        name,
        team_id
        teams:team-table(
            id,
            name
        )`);
    return response.data;
}

export async function addPlayer(playerName, team_id) {
    const response = await client
        .from('player-table')
        .insert({
            name:playerName,
            team_id
        })
        .single();

    return response.data;
}

export async function removePlayer(playerId) {
    const response = await client
        .from('player-table')
        .delete()
        .eq('id', playerId)
        .single();

    return response.data;
}
