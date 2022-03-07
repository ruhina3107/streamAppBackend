module.exports = function() {

    // const UserService = require('../services/UserService.js')
    const Common = require('../Utils/common.js')

    // var userService = new UserService();
    var common = new Common();

   this.twilioMobileValidation = (mobile, callback) => {
   
    var name = 'user'
    console.log("in controller")
    var response = common.sendOtpMobile(mobile.number, mobile.ext)
    console.log(response)
        callback(response)
   }


   this.otpValidate = async (req, callback) => {
    var response = {}
    var data = req
    var otpVerifynumber = await common.otpVerify(data.mobile, data.countryCode, data.otp)
    if (otpVerifynumber.error) {
        response.error = true
        response.msg = 'OTP_VERIFY'
    } else {
        console.log("otpVerifynumber", otpVerifynumber)
        data.otp = '1234';
        
                
                response.error = false
                response.msg = "OTP"
                response.data = ""
            
          
       
    }
    callback(response)
}

}