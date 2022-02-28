import * as mongoDB from "mongodb";

interface Collections {
    deals?: mongoDB.Collection;
};

const collections: Collections = {};

export const connectToDatabase = async (): Promise<void> => {
    const client: mongoDB.MongoClient = new mongoDB.MongoClient(process.env.DB_CONN_STRING as string);
    await client.connect();
    const db: mongoDB.Db = client.db(process.env.DB_NAME);
    console.log(`Successfully connected to database: ${db.databaseName}`);

    collections.deals = db.collection(process.env.DB_COLLECTION_NAME as string);
}

export { collections };
