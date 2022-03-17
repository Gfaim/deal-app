import { Type } from "@sinclair/typebox";
import { RouteOptions, RawRequestDefaultExpression, RawReplyDefaultExpression } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server } from "http";
import DealController from "../../controllers/DealController";
import { Deal, DealSchema } from "../../models/DealModel";

interface RouteProps extends RouteGenericInterface {
    Reply: Array<Deal>;
};

const route: RouteOptions<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, RouteProps, unknown> = {
    method: 'GET',
    url: '/deals',
    schema: {
        querystring: {
            id: Type.Optional(Type.String()),
            name: Type.Optional(Type.String())
        },
        response: {
            200: Type.Array(DealSchema),
        }
    },
    handler:
        async (request, reply) => {
            var deals: Array<Deal> = [];

            deals = await DealController.getList();
            reply.status(200).send(deals);
        }
}

export default route;
