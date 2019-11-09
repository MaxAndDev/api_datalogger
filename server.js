const http = require('http');
const app = require('./app');
const keyGenerator = require('./api/utilities/keyGenerator');


const port = process.env.PORT || 3000;

const server = http.createServer(app);

server.listen(port, function(){
    keyGenerator((err, public, private) => {
        console.log(err);
        console.log(private);
        console.log(public);
     });
});


