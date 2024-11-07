import { Client, Account, Databases, ID } from 'appwrite';

const client = new Client();
client
    .setEndpoint('https://cloud.appwrite.io/v1') // Your Appwrite Endpoint
    .setProject('67210af2003b1c3823c6'); // Your project ID

export const account = new Account(client);
export const database = new Databases(client);

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
        return response;
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