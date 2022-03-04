const express = require('express')
const app = express()
const cors = require('cors')
const path = require('path')
const fs = require('fs');
app.use(cors())
app.use('/public', express.static(path.join(__dirname, 'public')))
var jwt = require('jsonwebtoken')
const bodyParser = require('body-parser')

require('./Utils/common.js')()

const http = require('http').Server(app)
const https = require('https');

require('dotenv').config()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use('/', function(request, response, next) {
    request.headers.lang = request.headers.lang || 'default'
    console.log(`IP: ${request.connection.remoteAddress} Method: ${request.method} Route: ${request.originalUrl} Body: ` + JSON.stringify(request.body))
    next()
})

app.use('/', function(request, response, next) {
   
    response.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    response.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    response.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    response.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
  
    request.headers.lang = request.headers.lang || 'default'
    console.log(`IP: ${request.connection.remoteAddress} Method: ${request.method} Route: ${request.originalUrl} Body: ` + JSON.stringify(request.body))
    next()
})

var privateKey  = fs.readFileSync(path.join(__dirname+'/SSL/auth.key'), 'utf8');

var certificate = fs.readFileSync(path.join(__dirname+'/SSL/domain.crt'), 'utf8');

const options = {key: privateKey, cert: certificate};
console.log(options)
var server = https.createServer(options, app);
async function auth(request, response, next) {
    var error = {}
    try {
        console.log("token.",request.headers.access_token)
        var auth = await this.getPayloadFromToken(request.headers.access_token, process.env.JWT_SECRET)
        console.log(auth)
        if (auth.error) {
            request.params.auth = auth.data
            var authenticate = await this.apiServicesAuthCtrl(request)
            if (authenticate.error) {
                //next()
                error.error = true
                error.msg = 'Unauthorized accesss'
                return response.status(401).send(error)
            } else {
                next()
            }
            // error.error = true
            // error.msg = 'Unauthorized access'
            // return response.status(401).send(error)
        } else {
            request.params.auth = auth.data
            var authenticate = await this.apiServicesAuthCtrl(request)
            if (authenticate.error) {
                error.error = true
                error.msg = 'Unauthorized accesss'
                return response.status(401).send(error)
            } else {
                next()
            }
        }
    } catch (err) {
        err.error = true
        err.msg = 'Unauthorized access'
        return response.status(401).send(err)
    }
}
//app.use(express.bodyParser());

async function adminauth(request, response, next) {
    var error = {}
    try {
        var auth = await this.getAdminAuthToken(request.headers.token, process.env.JWT_SECRET)
        if (auth.error) {
            error.error = true
            error.msg = 'Unauthorized'
            return response.send(error)
        } else {
            var result = await this.adminAuthVerifyToken(auth.data)
            if (result.error) {
                error.error = true
                error.msg = 'Unauthorized'
                return response.send(error)
            } else {
                request.params.tokendata = [result.data]
            }
        }
    } catch (err) {
        err.error = true
        err.msg = 'Unauthorized'
        return response.send(err)
    }
    next()
}

app.auth = auth
app.adminauth = adminauth







app.get('/', function(req, res) {
    res.sendfile('index.html');
});
require('./routes/AdminRoutes')(app)


// server.listen(process.env.PORT, function() {
//     console.log('Server is running on', process.env.PORT)
    
// })

http.listen(process.env.PORT, function() {
    console.log('Server is running on', process.env.PORT)
   
})

