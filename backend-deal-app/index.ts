import fastify from 'fastify'
import * as dotenv from "dotenv";
import { connectToDatabase } from './services/database';
import registerRoute from './routes/RegisterRoute';
import DealRoutes from './routes/DealRoutes'

dotenv.config();
const app = fastify()

connectToDatabase().then(() => {
    registerRoute(app, DealRoutes);

    app.listen(process.env.PORT || 8080, (err, address) => {
        if (err) {
            app.log.error(err)
            process.exit(1)
        }
        console.log(`Server listening at ${address}`)
    })
}).catch((err) => {
    console.error(err)
    process.exit(1)
})


export default app;