
module.exports = function(server, validator) 
{
    const basePath = '/api/users/'
    const UserController = require('../controller/UserController.js')
    var userController = new UserController();

server.post(basePath + 'check',[], (request, response) => {
    
   
        var body = request.body
        var mobile = {}

        mobile.number = body.mobile
        mobile.ext = body.countryCode
        console.log(mobile)
        userController.twilioMobileValidation(mobile, (result) => {
           
            console.log("result", result)
            return response.send(result)
        })
   
})


server.post(basePath + 'otpVerifywebsite', [
    
], (request, response) => {
    
        var body = request.body
        userController.otpValidate(body, (result) => {
           
                return response.send(result)
            
        })
    
})

}
