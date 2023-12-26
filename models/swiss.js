let client = require('../dbConnection');
const { ObjectId } = require('mongodb');

let collection = client.db("test2").collection('testcollection');

function postSwiss(swiss, callback) {
    collection.insertOne(swiss, callback);
}

function getAllSwiss(callback) {
    collection.find({}).toArray(callback);
}

function getSwissById(id, callback) {
    collection.findOne({ _id: ObjectId(id) }, callback);
}


module.exports = { postSwiss, getAllSwiss, getSwissById };
