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
    create: function (data, callback) {
        var newTravelrequest = new ph({
            title: data.title,
            description: data.description,
            username: data.username,
            created_time: new Date(),
            tags : data.tags,
            comments: 0,
            likes: 0
        });
        newTravelrequest.save(callback);
    }
};

module.exports = travelrequest;

