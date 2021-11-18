const fastify = require('fastify')({logger: true});

const users = require('./routes/users');

const replyFormatter = require('./hooks/responseFormatter');

fastify.register(require('fastify-postgres'), {
    host: 'database',
    database: 'prueba-docker',
    user: 'admin',
    password: 'password',
    port: 5432,
});

fastify.get('/', async (request, reply) => {
    return {hello: 'world'};
});

fastify.addHook('preSerialization', replyFormatter);
fastify.register(users);

const start = async () => {
    try {
        await fastify.listen(3000, '0.0.0.0');
        console.log('node-fastify listen on port -> %d', 3000);
    } catch (error) {
        fastify.log.error(error);
        process.exit(1);
    }
};

start();