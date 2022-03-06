module.exports = function () {
  const AdminAuthRepository = require('../repository/AdminRepository')
  const Common = require('../Utils/common')
  require('dotenv').config()

  var adminAuthRepository = new AdminAuthRepository();
  var common = new Common();

  this.adminVerifyPwd = async (data, callback) => {
    var response = {}
    try {
      var admin = {}
      admin.userName = data.Email
      var adminDetailsData = await adminAuthRepository.fetchadminDetails(admin)
      console.log(adminDetailsData)
      if (adminDetailsData.error === false) {
        var adminDetails = adminDetailsData.data[0]
        var compare = await common.comparePassword(data.Password, adminDetails.password)
        if (adminDetails.userName === data.Email && compare === true || (adminDetails.userName === data.Email &&  adminDetails.password === data.Password)) {
          var adminAuth = {}
          adminAuth.Id = adminDetails.Id
          adminAuth.Roles = 'admin'
          var adminList = {}
          adminList.username = adminDetails.username
          adminList.userMail = adminDetails.userMail
          adminList.isAdmin = adminDetails.isAdmin
          adminList.Id = adminDetails.Id
          adminList.token = await common.generateToken(adminAuth, process.env.JWT_SECRET)
          response.error = false
          response.data = adminList
          response.msg = 'VALID'
          console.log("response",response)
        } else {
          response.error = true
          response.msg = 'FAILED: $[1],Password'
        }
      } else {
        response.error = true
        response.msg = 'FAILED: $[1],Email Id'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.adminVerifyTokenService = async (data, callback) => {
    var response = {}
    try {
      var admin = {}
      switch (data.Roles) {
        case 'admin':
          admin.where = { Id: data.Id }
          admin.role = 'Admin'
          break
        case 'users':
          admin.where = { Id: data.Id }
          admin.role = 'Users'
          break
        case 'providers':
          admin.where = { Id: data.Id }
          admin.role = 'Provider'
          break
        default:
          console.log('Error')
          break
      }
      var adminTokenData = await adminAuthRepository.adminVerifyJwtToken(admin)
      if (adminTokenData.error === false) {
        var adminTokenDetails = adminTokenData.data[0]
        response.error = false
        response.msg = 'VALID'
        response.data = adminTokenDetails
      } else {
        response.error = true
        response.msg = 'FAILED'
      }
      callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }


  

  

  
  


  this.register = async (data, callback) => {
    var response = {}
    try {
        
          var resp={}
          resp.userMail = data.Email
          resp.password = data.Password
          resp.userMobile = data.Mobile
          resp.userName = data.Name
          var appsliderInsertData = await adminAuthRepository.userRegister(resp)
          if (appsliderInsertData.error === false) {
            response.error = false
            response.data = appsliderInsertData.data[0]
            response.msg = 'VALID'
          } else {
            response.error = true
            response.msg = 'FAILED'
          }
          callback(response)
    } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
    }
  }

  this.providerFileUploadService = async (data, callback) => {
    var response = {}
    try {
        var dir = 'provider'
        var file = await common.fileUpload(data, dir)
        if (file.error) {
            response.error = true
            response.msg = 'UPDATE_ERROR: $[1],file'
        } else {
            response.error = false
            response.msg = 'VALID'
            response.data = { imageUrl: file.msg }
        }
        callback(response)
    } catch (err) {
        err.error = true
        err.msg = 'OOPS'
        callback(err)
    }
}


this.getUsersRegistered= async (data, callback) => {
  var response = {}
  try {
    
      var profileDetails = await adminAuthRepository.getData()
      console.log(profileDetails)
      if (profileDetails.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],file'
      } else {
          response.error = false
          response.msg = 'VALID'
          response.data = profileDetails.data
      }
      callback(response)
  } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
  }
}

this.updateProfile = async (data, userId,callback) => {
  var response = {}
  try {

        console.log("request",data)
        var appsliderInsertData = await adminAuthRepository.updateEmployeeProfile(data,userId)
        console.log(appsliderInsertData)
        if (appsliderInsertData.error === false) {
          response.error = false
          response.data = appsliderInsertData.data
          response.msg = 'VALID'
        } else {
          response.error = true
          response.msg = 'FAILED'
        }
        callback(response)
  } catch (err) {
    err.error = true
    err.msg = 'OOPS'
    callback(err)
  }
}

this.search= async (data, callback) => {
  var response = {}
  try {
    console.log(data)
      var profileDetails = await adminAuthRepository.searchData(data)
      console.log(profileDetails)
      if (profileDetails.error) {
          response.error = true
          response.msg = 'UPDATE_ERROR: $[1],file'
      } else {
          response.error = false
          response.msg = 'VALID'
          response.data = profileDetails.data
      }
      callback(response)
  } catch (err) {
      err.error = true
      err.msg = 'OOPS'
      callback(err)
  }
}
}
