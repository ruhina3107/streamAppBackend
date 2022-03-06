module.exports = function () {
  const bcrypt = require('bcryptjs')
  const multer = require('multer')
var jwt = require('jsonwebtoken')
const authy = require('authy')(process.env.TWILIO_KEY)

this.generateToken = function (data, secret) {
    return new Promise(function (resolve) {
      jwt.sign(data, secret, (err, token) => {
        if (err) {
          resolve(err)
          console.log('error')
        } else {
          resolve(token)
          console.log('error')

        }
      })
    })
  }
  this.comparePassword = function (password, hash) {
    return new Promise(function (resolve) {
      bcrypt.compare(password, hash, function (err, result) {
        if (err) {
          err = false
          resolve(err)
        } else {
          resolve(result)
        }
      })
    })
  }


  this.fileUpload = function (image, dir) {
    return new Promise(function (resolve) {
      try {
        console.log(image)
        var data = {}
        //var img  = {}
        var uid = uuid()
        var storage = multer.diskStorage({
          destination: (req, file, cb) => {
          cb(null, process.env.IMAGE_PATH + dir)
          },
          filename: (req, file, cb) => {
            cb(null, uid + '.' + file.originalname.split('.')[1])
          }
        })
        var upload = multer({ storage: storage }).single('file')
        upload(image, null, function (err) {
          if (typeof image.File.name === 'undefined' || err) {
            data.error = true
            data.msg = err
          } else {
            data.error = false
            data.msg = process.env.HOST + ':' + process.env.PORT + '/' + image.file.name.replace('public/', '').replace(/\\/g, '/')
            //img.msg = process.env.HOST + ':' + process.env.PORT + '/public/' + image.file.path.replace(/\\/g, '/')
          }
          resolve(data)
        })
      } catch (err) {
        err.error = true
        resolve(err)
      }
    })
  }

  this.sendOtpMobile = function (mobileNumber, countryCode) {
    console.log("inOtp")
    var response = {}
    return new Promise(function (resolve) {
      try {
         authy.phones().verification_start(mobileNumber, countryCode, { via: 'sms', locale: 'en' }, function (err, res) {
           if (res) {
        response.error = false
         response.data = res
           } else {
             response.error = true
             response.data = null
             response.msg = err.message
           }
           console.log(response)
           resolve(response)
         })
      } catch (err) {
        console.log(response)
        err.error = true
        err.msg = 'FAILED'
        resolve(err)
      }
    })
  }

  this.otpVerify = function (mobileNumber, countryCode, otp) {
    var response = {}
    return new Promise(function (resolve) {
      try {
        authy.phones().verification_check(mobileNumber, countryCode, otp, function (err, res) {
          if (res) {
            response.error = false
            response.data = res
          } else {
            response.error = true
            response.data = null
            response.msg = err.message
          }
          resolve(response)
        })
      } catch (err) {
        err.error = true
        err.msg = 'FAILED'
        resolve(err)
      }
    })
  }
}