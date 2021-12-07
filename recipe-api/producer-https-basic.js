import Fastify from 'fastify';
import fs from 'fs';
import dirname from './../dirname.js';

const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 4000;




const server = Fastify({logger:true},{
    https:{
        key: fs.readFileSync(dirname + "\\recipe-api\\tls\\basic-private.key"),
        cert: fs.readFileSync(dirname + "\\shared\\tls\\basic-certificate.cert"),
    }
});

server.get('/recipes/:id', async(req,reply)=>{

    console.log(`worker request pid=${process.pid}`);
    const id = Number(req.params.id);
    if(id!=42){
        reply.statusCode = 404;
        return {error: 'not_found'};
    }
    return {
        producer_pid: process.pid,
        recipe: {
            id, name: "Chicken Tikka Masala",
            steps: "Throw it in a pot...",
            igredients: [
                {id: 1, name: "Chicken", quantity: "1 lb"},
                {id: 2, name: "Sauce", quantity: "2 cups"}
            ]
        }
    }
})

server.listen(PORT,HOST, ()=> {
    console.log(`Producer running at http://${HOST}:${PORT}`);
})