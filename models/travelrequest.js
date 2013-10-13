var coreMongoose = require("../repositories/core-mongoose");

var mongoose = coreMongoose.mongoose;

//Schema requests
var travelrequestSchema = mongoose.Schema({
    latitude: String,
    longitude: String,
    company: String,
    requested: Date,
    car_pooling: Boolean
})
module.exports = mongoose.model('travelrequest', travelrequestSchema);