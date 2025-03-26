import {Account, Databases, ID, Client, Avatars, Query, Storage} from 'react-native-appwrite';



export const config = {
    endpoint: 'https://cloud.appwrite.io/v1',
    platform: 'com.hgeral.hgmanager',
    projectId: '67e22dbe001a7109ee54',
    databaseId: '67e22f7a002e087edfdd',
    userCollectionId: '67e22f9d003a65f36ab4',
    orderCollectionId: '67e230de0019a5100921',
    storageId: '67e233ca0017ca865dde'
}


// Init your React Native SDK
const client = new Client();

client
    .setEndpoint(config.endpoint)
    .setProject(config.projectId)
    .setPlatform(config.platform)
;

const account = new Account(client);
const foto = new Avatars(client);
const db = new Databases(client);
const storage = new Storage(client);

export const createUser = async (email, password, username) => {
    try {
        const newAccount = await account.create(
            ID.unique(),
            email,
            password,
            username

        )

        if(!newAccount) throw Error;
        const avatarUrl = foto.getInitials(username)
        await signIn(email, password);

        const newUser = await db.createDocument(
            config.databaseId,
            config.userCollectionId,
            ID.unique(),
            {
                accountId: newAccount.$id,
                email,
                username,
                foto: avatarUrl,

            }


        )


    return newUser;
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
}

export const signIn = async (email, password) => {
    try {
        const session = await account.createEmailPasswordSession(email, password);
        return session;
    } catch (error) {
        throw new Error(error);
    }
}

export const getCurrentUser = async () => {
    try {
        const currentAccount = await account.get();
        if(!currentAccount) throw Error;
        const currentUser = await db.listDocuments(
            config.databaseId,
            config.userCollectionId,
            [Query.equal('accountId', currentAccount.$id)]
        )
        if(!currentUser) throw Error;

        return currentUser.documents[0];
    } catch (error) {
        throw new Error(error);
    }
}

export const getAllOrders = async () => {
    try{
        const orders = await db.listDocuments(
            config.databaseId,
            config.orderCollectionId,
        )
        return orders.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getDailyOrders = async (userId) => {
    try {
        const today = new Date();
        const startOfDay = new Date(today.setHours(0, 0, 0, 0)).toISOString();  // 00:00:00 de hoje
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();  // 23:59:59 de hoje

        const orders = await db.listDocuments(
            config.databaseId,
            config.orderCollectionId,
            [
                Query.equal('funcionario', userId),
                Query.greaterThanEqual('data', startOfDay),  // A partir de 00:00
                Query.lessThanEqual('data', endOfDay)       // Até 23:59
            ]
        );

        return orders.documents;
    } catch (error) {
        throw new Error(error);
    }
};


export const searchOrders = async (query) => {
    try{
        const orders = await db.listDocuments(
            config.databaseId,
            config.orderCollectionId,
            [
                Query.search('cliente', query),
            ]
        )
        return orders.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const getUserOrders = async (userId) => {
    try{
        const today = new Date();
        const endOfDay = new Date(today.setHours(23, 59, 59, 999)).toISOString();  // 23:59:59 de hoje
        const orders = await db.listDocuments(
            config.databaseId,
            config.orderCollectionId,
            [
                Query.equal('funcionario', userId),
                Query.greaterThanEqual('data', endOfDay),
            ]
        )
        return orders.documents;
    } catch (error) {
        throw new Error(error);
    }
}

export const signOut = async () => {
    try {
        const session = await account.deleteSession('current')

        return session;

    } catch (error) {
        throw new Error(error);
    }
}

export const getFilePreview = async (fileId, type) => {
    let fileUrl;

    try {
        fileUrl = storage.getFileView(storageId, fileId)
        if(!fileUrl) throw Error;
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const uploadFile = async (file, type) => {
    if(!file) return;

    const { mimeType, ...rest } = file;
    const asset = {type: mimeType, ...rest};

    try {
        const uploadedFile = await storage.createFile(
            config.storageId,
            ID.unique(),
            asset
        );

        const fileUrl = await getFilePreview(uploadedFile.$id, type);
        return fileUrl;
    } catch (error) {
        throw new Error(error);
    }
}

export const criarOrdem = async (form) => {
    try {
        // Verifica se form.data é um objeto Date válido
        const data = form.data instanceof Date ? form.data : new Date(form.data);

        if (isNaN(data)) {
            throw new Error('Data inválida');
        }

        const newOrder = await db.createDocument(
            config.databaseId,
            config.orderCollectionId,
            ID.unique(), {
                cliente: form.cliente,
                local: form.local,
                funcionario: form.funcionario,
                data: data.toISOString()  // Adicionando a data no formato ISO
            }
        );
        return newOrder;
    } catch (error) {
        throw new Error(error);
    }
};

