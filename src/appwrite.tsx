import { Client, Account, Databases, ID, Teams } from 'appwrite';

const client = new Client();
client
    .setEndpoint(import.meta.env.VITE_ENDPOINT) // Your Appwrite Endpoint
    .setProject(import.meta.env.VITE_PROJ_ID); // Your project ID

export const account = new Account(client);
export const database = new Databases(client);
export const teams = new Teams(client);

export const createAccount = async (email: string, password: string, name: string) => {
    try {
        const response = await account.create(ID.unique(), email, password, name);
        if (response) { return response; }
    } catch (error) {
        return error;
        console.error('Error creating account:', error);
    }
};

export const loginAccount = async (email: string, password: string) => {
    try {
        const response = await account.createEmailPasswordSession(email, password);
        const resTeams = await teams.list()
        return [response, resTeams];
    } catch (error) {
        if (error instanceof Error) {
            console.error('Error logging in:', error.message);
            return error.message;
        } else {
            console.error('Error logging in:', error);
            return String(error);
        }
    }
};