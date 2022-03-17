import { FastifyInstance, FastifySchema, RouteOptions } from "fastify";
import { IncomingMessage, Server, ServerResponse } from "http";


type RouteOpts = RouteOptions<Server, IncomingMessage, ServerResponse, any, unknown, FastifySchema>

const registerRoute = (app: FastifyInstance, opts: RouteOpts | Array<RouteOpts>) => {
    if (opts instanceof Array) {
        opts.map((el) => {
            app.route(el)
        })
    } else {
        app.route(opts);
    }
}

export default registerRoute;