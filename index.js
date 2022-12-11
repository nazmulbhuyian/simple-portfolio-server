const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');

app.use(express.json())
app.use(cors())





const uri = "mongodb+srv://simple-portfolio:5GwR$XnHL_g8T4U@cluster0.p8qnexq.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run(){
    try{

        const allProjects = client.db('simplePortfolio').collection('projects')

        app.get('/projects', async(req, res) =>{
            const query = {};
            const result = await allProjects.find(query).toArray();
            res.send(result);
        })

        app.get('/projects/:id', async(req, res) =>{
            const id = req.params.id;
            const query = {_id: ObjectId(id)}
            const result = await allProjects.findOne(query);
            res.send(result);
        })

    }
    finally{

    }
}


run().catch(console.log)

app.get('/', (req, res) =>{
    res.send('simple portfolio server is running')
})

app.listen(port, () =>{
    console.log(`simple portfolio is running on ${port}`);
})