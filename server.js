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

  // delete
  server.delete("/api/synths", function(req, res){
    // get the collectoin
    const collection = db.collection('synths');
    // get the object to filter with
    const filterObject = {};

    // delete Many using the filter object, run callback
    collection.deleteMany(filterObject, function(err, result){
      if (err){
        console.log(err);
        res.status(500);
        res.send();
      }

      console.log("All Synths deleted");
      res.status(204);
      res.send();
    })
  });

  // update
  server.put("/api/synths/:id", function(req, res){
    // get the collection
    const collection = db.collection('synths');
    // get the id
    const objectID = ObjectID(req.params.id);
    // make a filter object
    const filterObject = { _id: objectID };
    // get the updated object details
    const updatedItem = req.body;

    collection.update(filterObject, updatedItem, function(err, result){
      if (err){
        console.log(err);
        res.status(500);
        res.send(result);
      }

      res.status(204);
      res.send();
    });

    // run update on the collecion using the filter object and the updated data
  })


  // find 1




  server.listen(3000, function(){
    console.log("Listening on port 3000");
  });
})
