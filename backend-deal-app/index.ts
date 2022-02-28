import fastify from 'fastify'
import * as dotenv from "dotenv";
import { collections, connectToDatabase } from './services/database';
import { Deal, DealSchema, RemoveId } from './models/DealModel';
import { Type } from '@sinclair/typebox';

dotenv.config();
const router = fastify()

connectToDatabase().then(() => {
    router.post<{
        Body: RemoveId<Deal>;
        Reply: Deal;
    }>('/deal',
        {
            schema: {
                body: DealSchema,
                response: {
                    201: DealSchema,
                }
            }
        },
        async (request, reply) => {
            const { body: deal } = request;
            const response = await collections.deals?.insertOne(deal);

            const dealWithId = { ...deal, id: response?.insertedId.toString() }
            reply.status(201).send(dealWithId)
        }
    );

    router.get<{
        Reply: Deal;
        Querystring: {
            id?: string;
            name?: string;
        }
    }>('/deal', {
        schema: {
            querystring: {
                id: Type.Optional(Type.String({ format: 'uuid' })),
                name: Type.Optional(Type.String())
            },
            response: {
                200: DealSchema,
            }
        },
        preValidation: (request, reply, done) => {
            const { id, name } = request.query
            done(((id !== undefined && id !== "") || (name !== undefined && name !== "")) ? undefined : new Error('Please give at least an id or a name'))
        }
    },
        async (request, reply) => {
            const { id, name } = request.query;
            var deal = undefined;

            if (id !== undefined) {
                deal = await collections.deals?.findOne<Deal>({ _id: id });
            } else {
                deal = await collections.deals?.findOne<Deal>({ label: name as string });
            }
            if (!deal) {
                reply.status(404).send();
            } else {
                deal.id = (deal as any)._id
                reply.status(200).send(deal as Deal);
            }
        }
    );

    router.get<{
        Reply: string;
        Querystring: {
            id?: string;
            name?: string;
        }
    }>('/deal/detail',
        {
            schema: {
                querystring: {
                    id: Type.Optional(Type.String({ format: 'uuid' })),
                    name: Type.Optional(Type.String())
                },
                response: {
                    200: Type.String(),
                }
            },
            preValidation: (request, reply, done) => {
                const { id, name } = request.query
                done(((id !== undefined && id !== "") || (name !== undefined && name !== "")) ? undefined : new Error('Please give at least an id or a name'))
            }
        },
        async (request, reply) => {
            const { id, name } = request.query;
            var deal = undefined;

            if (id !== undefined) {
                deal = await collections.deals?.findOne<Deal>({ _id: id });
            } else {
                deal = await collections.deals?.findOne<Deal>({ label: name as string });
            }
            if (!deal) {
                reply.status(404).send();
            }
            reply.status(200).send(deal?.detail);
        }
    );

    router.get<{
        Reply: Array<Deal>;
        Querystring: { limit?: number };
    }>('/deals',
        {
            schema: {
                querystring: {
                    limit: Type.Optional(Type.Integer())
                },
                response: {
                    200: Type.Array(DealSchema),
                }
            }
        },
        async (request, reply) => {
            const { limit } = request.query;
            var deals: Array<Deal> = []

            if (limit !== undefined) {
                deals = await collections.deals?.find<Deal>({}).limit(limit)?.toArray() as Array<Deal>;
            } else {
                deals = await collections.deals?.find<Deal>({}).toArray() as Array<Deal>;
            }
            if (deals === undefined) {
                reply.status(200).send([])
            } else {
                deals = deals.map((deal: Deal): Deal => {
                    return {
                        ...deal,
                        id: (deal as any)._id
                    };
                })
                reply.status(200).send(deals);
            }
        }
    );

    // router.patch('/deal', UpdateDeal);


    router.listen(process.env.PORT || 8080, (err, address) => {
        if (err) {
            console.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })
}).catch((err) => {
    console.error(err)
    process.exit(1)
})


export default router;