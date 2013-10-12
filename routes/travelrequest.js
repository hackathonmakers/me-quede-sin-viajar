var travelrequestRepository = require('../repositories/travelrequest.js');

exports.fetch = function(req, res){
  res.send("respond with a resource");
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