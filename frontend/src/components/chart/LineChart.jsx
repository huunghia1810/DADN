import ReactApexChart from 'react-apexcharts'
import {Button, Typography} from 'antd'
import { saveAs } from 'file-saver'
import { MinusOutlined } from '@ant-design/icons'
import lineChart from './configs/lineChart'

import ActionGasSensor from '../../actions/GasSensor'

const { Title, Paragraph } = Typography

const LineChart = props => {

  const handleDownloadFile = async () => {
    await ActionGasSensor.downloadReport()
  }
  return (
    <>
      <div className='linechart'>
        <div>
          <Title level={5}>Gas sensor data</Title>
          <Paragraph className='lastweek'>
            {/*than last week <span className='bnb2'>+30%</span>*/}
            <strong>2.345</strong> (present gas data)
          </Paragraph>
        </div>
        <div className='sales'>
          {/*<ul>
            <li>{<MinusOutlined />} Traffic</li>
            <li>{<MinusOutlined />} Sales</li>
          </ul>*/}
          <Button type='primary' onClick={handleDownloadFile}>
            <span>View Report</span>
          </Button>
        </div>
      </div>

      <ReactApexChart
        className='full-width'
        options={lineChart.options}
        series={lineChart.series}
        type='area'
        height={350}
        width={'100%'}
      />
    </>
  )
}

export default LineChart
