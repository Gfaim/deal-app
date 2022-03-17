import { Type } from "@sinclair/typebox";
import { RouteOptions, RawRequestDefaultExpression, RawReplyDefaultExpression } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server } from "http";
import DealController from "../../controllers/DealController";
import { Deal, DealSchema } from "../../models/DealModel";

interface RouteProps extends RouteGenericInterface {
    Body: Deal;
    Reply: Deal;
}

const route: RouteOptions<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, RouteProps, unknown> = {
    method: 'PATCH',
    url: '/deal',
    schema: {
        body: DealSchema,
        response: {
            201: DealSchema,
            404: Type.Null(),
        }
    },
    handler: async (request, reply) => {
        const { body: deal } = request;

        const response = await DealController.update(deal);

        if (!response) {
            reply.status(404).send();
        } else {
            reply.status(200).send(response);
        }
    }
}

export default route;