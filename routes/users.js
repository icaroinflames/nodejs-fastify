async function routes(fastify, options){
    fastify.get('/users', async (req, reply) => {
        const query = 'SELECT * FROM users';
        const result = await fastify.pg.query(query, null);
        return result.rows;
        //res.send(formatSuccessResponse(result.rows));
    });

    fastify.post('/users', async (req, reply)=> {
        const query = 'INSERT INTO users (email, password, timestamp) VALUES ($1, $2, NOW()::timestamp)';
        const result = fastify.pg.query(query, [req.body.email, req.body.password]);
        if(result.rowCount > 0){
            //res.send(formatSuccessResponse("El usuario se ha agregado correctamente"));
            return "El usuario se ha agregado correctamente";
        }else{
            //res.send(formatSuccessResponse("No se ha podido agregar al usuario"));
            return "No se ha podido agregar al usuario";
        }
        
    } );

    fastify.get('/users/:id', async (req, reply) => {
        const query = 'SELECT * FROM users WHERE user_id = $1';
        const result = await fastify.pg.query(query, [req.params.id]);
        if(result.rows != null && result.rows.length > 0){
            //res.send(formatSuccessResponse(result.rows[0]));
            return result.rows[0];
        }else{
            //res.send(formatSuccessResponse("El usuario no existe"));
            return "El usuario no existe";
        }
        
    });

    fastify.put('/users/:id', async (req, reply) => {
        const query = 'UPDATE users SET email=$1, password=$2 WHERE user_id = $3';
        const result = await fastify.pg.query(query, [req.body.email, req.body.password, req.params.id]);
        const message = `${result.rowCount} filas han sido actualizadas`;
        //res.send(formatSuccessResponse(message));
        return message;
    } );
    
    fastify.delete('/users/:id', async (req, reply) => {
        const query = 'DELETE FROM users WHERE user_id = $1';
        const result = await fastify.pg.query(query, [req.params.id]);
        const message = result.rowCount > 0 ? "El usuario se ha eliminado correctamente" : "El usuario no existe";
        //res.send(formatSuccessResponse(message));   
        return message;
         
    });
}

module.exports = routes;