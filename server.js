const express = require('express');
const parser = require('body-parser');
const server = express();

server.use(parser.json());
server.use(express.static('client/build'));
server.use(parser.urlencoded({extended: true}));

const MongoClient = require('mongodb').MongoClient;
const ObjectID = require('mongodb').ObjectID;

MongoClient.connect("mongodb://localhost:27017", function(err, client){
  if(err){
    console.log(err);
    return;
  }

  const db = client.db("synths");
  console.log("Connected to Synths");


  // RESTful ROUTEs

  // create new
  server.post("/api/synths", function(req, res){
    // get the collection
    const collection = db.collection('synths');
    // get the item to add
    const item = req.body;

    // save to DB and run callback function
    collection.save(item, function(err, result){
      if(err){
        console.log(err);
        res.status(500);
        res.send();
      }

      console.log('Saved to Synths DB');
      res.status(201);
      res.send(item);
    })
  });

  // get all
  server.get("/api/synths", function(req, res){
    // get the collection
    const collection = db.collection('synths');
    // find all the items in it, return it and run callback
    collection.find().toArray(function(err, allItems){
      if (err){
        console.log(err);
        res.status(500);
        res.send();
      }

      res.json(allItems);
    })
  });

  // find


  // update


  // delete




  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });
})
