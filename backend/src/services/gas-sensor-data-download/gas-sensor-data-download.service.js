// Initializes the `gas-sensor-data-download` service on path `/gas-sensor-data-download`
const { GasSensorDataDownload } = require('./gas-sensor-data-download.class')
const hooks = require('./gas-sensor-data-download.hooks')

module.exports = function (app) {
  const options = {
    paginate: app.get('paginate')
  }

  // Initialize our service with any options it requires
  app.use('/gas-sensor-data-download', new GasSensorDataDownload(options, app), function(req, res) {
    const result = res.data

    res.type('xlsx')
    res.end(result)

    // const result = res.data
    // const data = result.data // will be either `result` as an array or `data` if it is paginated
    // const csv = json2csv({ data, fields })
    // res.type('csv')
    // res.end(csv)
  })

  // Get our initialized service so that we can register hooks
  const service = app.service('gas-sensor-data-download')

  service.hooks(hooks)
}
