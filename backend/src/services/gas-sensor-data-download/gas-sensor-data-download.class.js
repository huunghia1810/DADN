const Excel = require('exceljs')
const path = require('path')

/* eslint-disable no-unused-vars */
exports.GasSensorDataDownload = class GasSensorDataDownload {
  constructor (options) {
    this.options = options || {}
  }

  async find (params) {
    return []
  }

  async get (id, params) {
    return await this._generateSampleReport()
    // return {
    //   id, text: `A new message with ID: ${id}!`
    // }
  }

  async create (data, params) {
    if (Array.isArray(data)) {
      return Promise.all(data.map(current => this.create(current, params)))
    }

    return data
  }

  async update (id, data, params) {
    return data
  }

  async patch (id, data, params) {
    return data
  }

  async remove (id, params) {
    return { id }
  }


  //-----------------------------private functions---------------------------
  //-----------------------------private functions---------------------------
  async _generateSampleReport() {
    const workbook = new Excel.Workbook()
    const worksheet = workbook.addWorksheet("My Sheet")

    worksheet.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Name', key: 'name', width: 32},
      {header: 'D.O.B.', key: 'dob', width: 15,}
    ]

    worksheet.addRow({id: 1, name: 'NghiaNH', dob: new Date(1999, 8, 12)})
    worksheet.addRow({id: 2, name: 'NghiaNguyen', dob: new Date(1998, 6, 20)})

// save under export.xlsx
    await workbook.xlsx.writeFile('export.xlsx')

//load a copy of export.xlsx
    const newWorkbook = new Excel.Workbook()
    await newWorkbook.xlsx.readFile('export.xlsx')

    const newworksheet = newWorkbook.getWorksheet('My Sheet')
    newworksheet.columns = [
      {header: 'Id', key: 'id', width: 10},
      {header: 'Name', key: 'name', width: 32},
      {header: 'D.O.B.', key: 'dob', width: 15,}
    ]
    await newworksheet.addRow({id: 3, name: 'New Guy', dob: new Date(2000, 1, 1)})

    //return await newWorkbook.xlsx.writeFile('export2.xlsx')

    const buffer = await newWorkbook.x
    lsx.writeBuffer()
    return buffer
    //console.log("File is written")

  }
}
