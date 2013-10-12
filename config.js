module.exports = function(){
    switch(process.env.NODE_ENV){
        case 'viajar':
        return {
          db: {
            db: 'heroku_app16667947',
            host: 'ds035448.mongolab.com',
            port: 35448,  // optional, default: 27017
            username: 'ideasuser', // optional
            password: 'pass', // optional
            collection: 'sessions' // optional, default: sessions
          },
        };
        default :
        return {
          db: {
            db: 'viajar',
            host: 'localhost',
            port: 27017,  // optional, default: 27017
            //username: 'admin', // optional
            //password: 'secret', // optional
            collection: 'sessions' // optional, default: sessions
          },
        };
    }
};