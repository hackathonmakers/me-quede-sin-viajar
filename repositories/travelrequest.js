var ph  = require('../models/travelrequest');


var travelrequest = {
   clear: function (callback) {
     ph.remove({}, function(err) {
       callback();
     });
   },
    client: function (){
        return ph;
    },
    all: function(callback){
     ph.find({}, function(err, records){
        callback(records);
     });
    },
    get: function(id, callback){
     ph.find({"_id":id}, function(err, records){
        callback(records);
     });
    },
    find: function(text, callback){
      var query = ph.find();
      if (text) {
        var re = new RegExp(text, "i");  
      }
      query.where('title').regex(re).or('comments').regex(re);
      query.exec(function(err, records) {
            if (err){
                console.log(err);
            }
            else
            {
                callback(records);
            }
      });
    },
    getRandom: function (count,callback,onError){
        var query = ph.find({});
        if (count){
          query.limit(count);
        }

        query.exec(function(err, records){
              if (err){
                  onError(err);
              }
              else
              {
                  callback(records);
              }
          });
    },
    save: function (data, callback) {
        var newTravelrequest = new ph({
            geo: data.geo,
    		    requested: data.requested,
    		    carpooling: data.carpooling
        });
        newTravelrequest.save(callback);
    },
    getWorstDay: function(callback) {
    	ph.aggregate(
		    { $group : {
		        _id: {
		            year : { $year : "$requested" },        
		            month : { $month : "$requested" },        
		            day : { $dayOfMonth : "$requested" },
		        },
		        count: { $sum: 1 }
		    }},
        { $group : { 
          _id: null,
          maxCount: {
           $max: '$count' 
          }
        }},
		    function (err, res) {
		    	callback(res);
		    }
		);
    }
};

module.exports = travelrequest;

