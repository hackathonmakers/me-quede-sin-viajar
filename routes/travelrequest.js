var travelrequestRepository = require('../repositories/travelrequest.js');

exports.fetch = function(req, res){
  travelrequestRepository.getStats(function (data) {
	res.render('stats', {'stats':data});  	
  })
};

exports.add = function(req, res){
  var json = req.body.json;
  travelrequestRepository.save(json, function(err){
  	if (!err) {
  		res.send("ok", 200);	
  	} else {
  		res.send("failed", 500);
  	}
  	
  });
  
};

exports.mock = function(req, res){
  var json = {latitude:20, longitude:30, company: 'emp1', request: new Date(), car_pooling:true};
  travelrequestRepository.save(json, function(err){
  	if (!err) {
  		res.send("ok", 200);	
  	} else {
  		res.send("failed", 500);
  	}
  	
  });
  
};