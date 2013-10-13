var travelrequestRepository = require('../repositories/travelrequest.js');

exports.fetch = function(req, res){
  travelrequestRepository.getWorstDay(function (stat) {
    console.log(stat);
    travelrequestRepository.getWorstCompany(function (company) {
      console.log(company);
      res.render('stats', {'stats':stat[0], 'companyStats': {'company': 'Fluviales', 'maxCount':100}});
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
  var json = {latitude:20, longitude:30, company: 'emp1', requested: new Date(), car_pooling:true};
  travelrequestRepository.save(json, function(err){
  	if (!err) {
  		res.send({'status': "ok"}, 200);	
  	} else {
  		res.send({'status': "failed"}, 500);
  	}
  	
  });
  
};