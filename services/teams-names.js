import client from './client.js';

export async function getTeams() {
    const response = await client
        .from('')
        .select(`
            id,
            name
        `);

    return response;
}

export async function getPlayers() {
    const response = await client
        .from('')
        .select(`
            id,
            name,
        `);

    return response;
}