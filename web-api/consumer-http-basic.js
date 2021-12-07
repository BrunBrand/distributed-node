
import Fastify from 'fastify';
const server = Fastify({logger:true});
import fetch from 'node-fetch';
import https from 'https';
import fs from 'fs';
import dirname from '../dirname.js';
const HOST = process.env.HOST || '127.0.0.1';
const PORT = process.env.PORT || 3000;  
const TARGET = process.env.TARGET || 'localhost:4000';

const options = {
    agent: new https.Agent({
        ca: fs.readFileSync(dirname+ "\\shared\\tls\\basic-certificate.cert"),
    })
}


server.get('/', async()=>{
    const req = await fetch(`http://${TARGET}/recipes/42`);
    const payload = await req.json();

    return{
        consumer_pid: process.pid,
        producer_data: payload
    };
})

server.listen(PORT,HOST,()=>{
    console.log(`Consumer running at http://${HOST}:${PORT}/`);
})
