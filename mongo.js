const fs = require('fs');
const osmosis = require('osmosis');
let InfoSave = [];

const MongoClient = require("mongodb").MongoClient;
   
const url = "mongodb://localhost:27017/";
const mongoClient = new MongoClient(url, { useNewUrlParser: true });


osmosis
  .get('https://www.google.co.in/search?q=javascript')
  .paginate('#foot table tr > td a[href]',3)
  .find('#search')
  .find('.g .r')
  .set({
    'Nomination': 'h3',
    'Url': 'a@href'
})
  .data(function(data) {
    console.log(data);
    InfoSave.push(data);

    

    mongoClient.connect(err => {
        const collection = mongoClient.db("mybase").collection("db");

        collection.insertOne(data, function(err, result) {

            if (err) {
                return console.log(err);
            }
            console.log(result.ops);
            mongoClient.close();
        });
    });
  });