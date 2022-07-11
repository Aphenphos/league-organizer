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
                id:playerID
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

export async function addPlayer(player, team) {
    const response = await client
        .from('team-table')
        .insert({
            name: player.name,
            team_id: team
        })
        .single();

    return response.data;
}

export async function removePlayer(playerName) {
    const response = await client
        .from('team-table')
        .delete()
        .eq('id', playerName)
        .single();

    return response.data;
}
