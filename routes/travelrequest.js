var travelrequestRepository = require('../repositories/travelrequest.js');

exports.fetch = function(req, res){
  travelrequestRepository.getWorstDay(function (stat) {
    travelrequestRepository.getWorstCompanyName(function (companies) {
      travelrequestRepository.getWorstHour(function (hour) {
        var maxHour = 0, totalCount = 0;
        for (var i = 0; i < hour.length; i++) {
          if (hour[i].count > totalCount) {
            console.log('newmax', hour[i].count, ' ', hour[i]._id.hour);
            totalCount = hour[i].count;
            maxHour = hour[i]._id.hour;
          }
        };
        res.render('stats', {'stats':stat[0], 'companies': companies, 'dayStats': {'hour': maxHour, 'count' : totalCount}});
      });
    });
  });
};

exports.add = function(req, res){
  var json = req.body;
  travelrequestRepository.save(json, function(err){
  	if (!err) {
  		res.send({'status': "ok"}, 200);	
  	} else {
  		res.send({'status': "failed"}, 500);
  	}
  });
};

exports.mock = function(req, res){

  var companyGenerator = {
    next: function() {
      var values =  ["Fluviales", "Etacer"];
      return values[Math.floor((Math.random()*2))];
    }
    
  };

  var dayGenerator = {
    next: function() {
      return Math.floor((Math.random()*71200029)+1310487575000);
    }
    
  };

  var carPoolingGenerator = {
    next: function() {
      var values =  [true, false];
      return values[Math.floor((Math.random()*2))];
    }
    
  };

  for (var i = 0; i < 412; i++) {
    var json = {latitude:20, longitude:30, company: companyGenerator.next(), requested: new Date(dayGenerator.next()), car_pooling:carPoolingGenerator.next()};
    travelrequestRepository.save(json, function(err){
      if (!err) {
        res.send({'status': "ok"}, 200);  
      } else if (i == 412){
        res.send({'status': "failed"}, 500);
      }
      
    });
  };
  
  
};