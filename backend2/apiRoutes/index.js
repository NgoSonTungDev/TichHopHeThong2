const staffRouter = require('./staff')


function route (app) {
    app.use('/',staffRouter)
}
module.exports = route