import { Type } from "@sinclair/typebox";
import { RouteOptions, RawRequestDefaultExpression, RawReplyDefaultExpression } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server } from "http";
import DealController from "../../controllers/DealController";
import { Deal, DealSchema, RemoveId } from "../../models/DealModel";

interface RouteProps extends RouteGenericInterface {
    Body: RemoveId<Deal>;
    Reply: Deal;
}

const route: RouteOptions<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, RouteProps, unknown> = {
    method: 'POST',
    url: '/deal',
    schema: {
        body: DealSchema,
        response: {
            201: DealSchema,
            500: Type.Null(),
        }
    },
    handler: async (request, reply) => {
        const { body: deal } = request;

        const dealWithId = await DealController.save(deal);
        if (!dealWithId) {
            reply.status(500).send();
        } else {
            reply.status(201).send(dealWithId);
        }
    }
}

export default route;