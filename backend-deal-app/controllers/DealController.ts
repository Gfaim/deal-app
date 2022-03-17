import { Deal } from "../models/DealModel";
import type { IController } from "./IController";
import { collections } from "../services/database";
import { ObjectId } from "mongodb";

const DealController: IController<Deal> = {
    getById: async (id) => {
        const response = await collections.deals?.findOne<Deal>(new ObjectId(id));

        if (!response)
            return null;
        return { ...response, id: (response as any)._id };
    },
    getByName: async (name) => {
        const response = await collections.deals?.findOne<Deal>({ label: name });

        if (!response)
            return null;
        return { ...response, id: (response as any)._id };
    },
    getList: async () => {
        const response = await collections.deals?.find<Deal>({}).toArray();

        const list: Array<Deal> = []

        if (!response)
            return []
        response.map((elem) => {
            list.push({ ...elem, id: (elem as any)._id })
        })
        return list
    },
    save: async (deal) => {
        const response = await collections.deals?.insertOne(deal);

        if (!response || !response.acknowledged) {
            return null;
        }
        return { ...deal, id: response.insertedId.toString() };
    },
    delete: async (id) => {
        const response = await collections.deals?.deleteOne(new ObjectId(id));

        if (!response || !response.acknowledged)
            return false;
        return response.deletedCount != 0
    },
    update: async (deal) => {
        const response = await collections.deals?.updateOne(new ObjectId(deal.id), { ...deal })

        if (!response || !response.acknowledged)
            return null
        return deal;
    },
}

export default DealController;