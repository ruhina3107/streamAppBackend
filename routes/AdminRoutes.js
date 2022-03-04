

module.exports = function(app) {
  const { Result } = require('express-validator');
  const multer = require('multer');
  const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads')
    },
    filename: (req, file, callBack) => {
        callBack(null, `FunOfHeuristic_${file.originalname}`)
    }
  })
  
const upload = multer({ storage: storage })
    const AdminAuthService = require('../services/AdminService')
    const Common = require('../Utils/common')
    require('dotenv').config()
  
    var adminAuthService = new AdminAuthService();
    var common = new Common();
  
    //login Route
  
    app.post(`/api/login`, [],  (req, res) => {
        var response = {}
        var data = req.body 
        console.log(data)
        adminAuthService.adminVerifyPwd(data, (result) => {
           
            if (result.error ) {
              response.status = 0
           
            } else {
                console.log(result.data)
              response.status = 1
              response.data = result.data
            }
            console.log("final ",response)
            return res.send(response)
        })        
    })

    
  //Register Employee Route
  app.post(`/api/register`, [],  (req, res) => {
    var response = {}
    var data = req.body 
    console.log(data)
    adminAuthService.register(data, (result) => {
       
        if (result.error) {
          response.status = 0
       
        } else {
            console.log("in")
          response.status = 1
          response.data = result.data
        }
        console.log("final ",response)
        return res.send(response)
    })        
})

  
}



