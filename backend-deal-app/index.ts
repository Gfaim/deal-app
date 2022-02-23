import fastify from 'fastify'
import SendDeal from './Deal'


const router = fastify()

router.get('/ping', async (request, reply) => {
    return 'pong\nhaha'
})

router.get('/deal', SendDeal);

router.listen(8080, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening at ${address}`)
})

export default router;