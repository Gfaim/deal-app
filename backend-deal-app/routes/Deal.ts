import { FastifyReply, FastifyRequest } from "fastify";
import { Deal } from "../schemas/Deal";

const SaveDeal = async (request: FastifyRequest, reply: FastifyReply): Promise<Deal> => {
    // TODO: save in the database, check duplicate

    return {
        label: "Grosse transaction",
        amount: 40,
        date: "maintenant"
    }
}

const GetDeal = async (request: FastifyRequest, reply: FastifyReply): Promise<Deal> => {
    return {
        label: "Grosse transaction",
        amount: 40,
        date: "maintenant"
    }
}

const UpdateDeal = async (request: FastifyRequest, reply: FastifyReply): Promise<Deal> => {
    return {
        label: "Grosse transaction",
        amount: 40,
        date: "maintenant"
    }
}

const ListDeal = async (request: FastifyRequest, reply: FastifyReply): Promise<Array<Deal>> => {
    return [{
        label: "Grosse transaction",
        amount: 40,
        date: "maintenant"
    }]
}

const GetDealDetail = async (request: FastifyRequest, reply: FastifyReply): Promise<string> => {
    return "details"
}

export default SaveDeal;