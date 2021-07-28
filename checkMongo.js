const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://admin:160993@cluster0.g2hde.mongodb.net/admin?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
client.connect(async (err) => {
    if (err) {console.log(err);return}
    const collection = client.db("test").collection("devices");
    await collection.insertOne({name:"Tin"});
// perform actions on the collection object
client.close(); });

