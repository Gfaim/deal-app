import { Type } from "@sinclair/typebox";
import { RouteOptions, RawRequestDefaultExpression, RawReplyDefaultExpression } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server } from "http";
import DealController from "../../controllers/DealController";
import { Deal, DealSchema } from "../../models/DealModel";

interface RouteProps extends RouteGenericInterface {
    Reply: Deal;
    Querystring: {
        id: string;
    }
};

const route: RouteOptions<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, RouteProps, unknown> = {
    method: 'DELETE',
    url: '/deal',
    schema: {
        querystring: {
            id: Type.Optional(Type.String()),
            name: Type.Optional(Type.String())
        },
        response: {
            200: Type.Null(),
            404: Type.Null(),
        }
    },
    handler:
        async (request, reply) => {
            const { id } = request.query;

            const response = await DealController.delete(id);

            if (!response) {
                reply.status(404).send();
            } else {
                reply.status(200).send();
            }
        }
}

export default route;
