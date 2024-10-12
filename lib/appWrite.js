import { Alert } from 'react-native';
import { Account, Avatars, Client, Databases, ID, Query } from 'react-native-appwrite';
import { ENDPOINT, PLATFORM, PROJECT_ID, DATABASE_ID, USERS_COLLECTION_ID, VIDEOS_COLLECTION_ID, STORAGE_ID } from "@env";

export const config = {
    endpoint: ENDPOINT,
    platform: PLATFORM,
    projectId: PROJECT_ID,
    databaseId: DATABASE_ID,
    usersCollectionId: USERS_COLLECTION_ID,
    videosCollectionId: VIDEOS_COLLECTION_ID,
    storageId: STORAGE_ID,
};
// export const config = {
//     endpoint: 'https://cloud.appwrite.io/v1',
//     platform: 'com.jasim.aora',
//     projectId: '66f821d40004ade629c5',
//     databaseId: '66f8256c0030ad558d44',
//     usersCollectionId: '66f825a6001a216348e4', 
//     videosCollectionId:'66f8262900203acec52a',
//     storageI: '66f828920013251dcfec'
// }

// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint) // Your Appwrite Endpoint
    .setProject(config.projectId) // Your project ID
    .setPlatform(config.platform) // Your application ID or bundle ID.

    const account = new Account(client);
    const avatars = new Avatars(client);
    const databases = new Databases(client);
 export const createUser = async(email, password, username) => {
    try {
        const newAccount= await account.create(
            ID.unique(),
            email,
            password,
            username
        )
        if (!newAccount) throw Error;
        
        await signIn(email, password);
        
        const avatarUrl = avatars.getInitials(username)

        const newUser = await databases.createDocument(
            config.databaseId,
            config.usersCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                avatar:avatarUrl
            }
        )
        if (!newUser) 
        {
            throw Error;
        } 
        
        return newUser;
    } catch (error) {
        Alert.alert('Error', error.message)
    }
 }

export const signIn = async(email, password) =>
{
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session;     
    } catch (error) {
        throw new Error(error);
    }
}
    
export const getCurrentUser = async () =>
{
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;

        const currentUser = await databases.listDocuments(
            config.databaseId,
            config.usersCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )

        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        
    }

}