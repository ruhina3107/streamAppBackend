module.exports = function () {
    require('dotenv').config()
    const config = {
      client: 'mysql2',
      connection: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_NAME
      },
      pool: {
        min: Number(process.env.DB_POOL_MIN),
        max: Number(process.env.DB_POOL_MAX)
      },
      acquireConnectionTimeout: Number(process.env.DB_TIMEOUT)
    }
    var Knex = require('knex')
    
    const users = 'Users'
   

    this.fetchadminDetails = (adminData) => {
      var output = {}
      console.log(adminData)
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(users)
          .select('*')
          .where(adminData)
          .then((result) => {
            if (result) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }
    this.adminVerifyJwtToken = (admindata) => {
      var output = {}
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(admindata.role)
          .select('*')
          .where(admindata.where)
          .then((result) => {
            if (result.length === 1) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

   
    

    this.userRegister = (data) => {
      var output = {}
      console.log("ddd",data)
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(users)
          .insert(data)
          .then((result) => {
            if (result.length) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    this.searchData = (data) => {
      var output = {}
      return new Promise(function (resolve) {
        var knex = new Knex(config)
        knex(addJob).select('*')
        // .join(`${applyJob}`, `${addJob}.jobId`, `${applyJob}.jobId`)
        // .whereNot(`${applyJob}.userId`,'=', data)
        .where(data)
          .then((result) => {
            if (result.length) {
              output.error = false
              output.data = result
            } else {
              output.error = true
            }
            resolve(output)
          })
          .catch((err) => {
            err.error = true
            err.data = null
            resolve(err)
          }).finally(() => {
            knex.destroy()
          })
      })
    }

    
  }
  