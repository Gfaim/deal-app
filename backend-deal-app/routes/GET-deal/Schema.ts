import { Type } from "@sinclair/typebox";
import { DealSchema } from "../../models/DealModel";

const querystring = {
    id: Type.Optional(Type.String({ format: 'uuid' })),
    name: Type.Optional(Type.String()),
}

const schema = {
    schema: {
        querystring: querystring,
        response: {
            200: DealSchema,
        }
    }
}

export default schema;