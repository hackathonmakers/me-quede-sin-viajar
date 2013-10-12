var coreMongoose = require("../repositories/ccore-mongoose");

var mongoose = coreMongoose.mongoose;

//Schema requests
var travelrequestSchema = mongoose.Schema({
    geo: Object,
    requested: String,
    carpooling: Boolean
})
module.exports = mongoose.model('travelrequest', travelrequestSchema);