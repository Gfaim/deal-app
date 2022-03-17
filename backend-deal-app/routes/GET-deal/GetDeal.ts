import { Type } from "@sinclair/typebox";
import { RouteOptions, RawRequestDefaultExpression, RawReplyDefaultExpression } from "fastify";
import { RouteGenericInterface } from "fastify/types/route";
import { Server } from "http";
import DealController from "../../controllers/DealController";
import { Deal, DealSchema } from "../../models/DealModel";

interface RouteProps extends RouteGenericInterface {
    Reply: Deal;
    Querystring: {
        id?: string;
        name?: string;
    }
};

const route: RouteOptions<Server, RawRequestDefaultExpression<Server>, RawReplyDefaultExpression<Server>, RouteProps, unknown> = {
    method: 'GET',
    url: '/deal',
    schema: {
        querystring: {
            id: Type.Optional(Type.String()),
            name: Type.Optional(Type.String())
        },
        response: {
            200: DealSchema,
            404: Type.Null(),
        }
    },
    preValidation: (request, reply, done) => {
        const { id, name } = request.query
        done(((id !== undefined && id !== "") || (name !== undefined && name !== "")) ? undefined : new Error('Please give at least an id or a name'))
    }, handler:
        async (request, reply) => {
            const { id, name } = request.query;
            var deal = undefined;

            if (id !== undefined) {
                deal = await DealController.getById(id)
            } else {
                deal = await DealController.getByName(name as string)
            }
            if (!deal) {
                reply.status(404).send();
            } else {
                reply.status(200).send(deal);
            }
        }
}

export default route;
