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
            latitude: data.latitude,
            longitude: data.longitude,
    		    requested: data.requested,
            company: data.company,
    		    car_pooling: data.car_pooling
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
    },
    getWorstCompany: function(callback) {
      ph.aggregate([
        { $group : {
            _id: null,
            count: { $sum: 1 }
        }},
        { $group : { 
          _id: "$company",
          worstCompany: {
            $max: '$count'
          }
        }}],
        function (err, res) {
          callback(res);
        }
      );
    },
    getWorstCompanyName: function(callback) {
      ph.aggregate(
        { $group : {
            _id: "$company",
            count: { $sum: 1 }
        }},
        function (err, res) {
          callback(res);
        }
      );
    },
    getWorstHour: function(callback) {
      ph.aggregate(
        { $group : {
            _id: {
              hour : { $hour : "$requested" }
            },
            count: { $sum: 1 }
        }},
        function (err, res) {
          console.log(res);
          callback(res);
        }
      );
    }
};

module.exports = travelrequest;

