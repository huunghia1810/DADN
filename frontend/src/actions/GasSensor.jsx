import _ from 'lodash'
import { saveAs } from 'file-saver'

//import * as constantDevice from '../constants/Device'

import feathersClient from './../feathersClient'

class ActionGasSensor {
  downloadReport() {
    feathersClient.service('gas-sensor-data-download').get(1)
      .then(response => { //typeof response = buffer of xlsx file
        return saveAs(
          new Blob([response], { type: "application/octet-stream" }),
          `gas-sensor-sample-reports.xlsx`
        )
      }).catch(error => {
      debugger
    })
  }
}

export default new ActionGasSensor()