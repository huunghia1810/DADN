import React, { useState } from 'react'
import {Button, Typography} from 'antd'
import Chart from 'react-apexcharts'

import ActionGasSensor from '../../actions/GasSensor'

const { Title, Paragraph } = Typography

const GasLeakChart = props => {
  const series = [
    {
      name: 'Index',
      data: props.data
    }
  ]
  const options = {
    chart: {
      width: '100%',
      height: 350,
      type: 'line',
      zoom: {
        enabled: false
      }
    },
    dataLabels: {
      enabled: false
    },
    stroke: {
      width: 2,
      curve: 'smooth'
    },
    colors: ['#8c8c8c'],
    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 1,
        inverseColors: true,
        gradientToColors: ['#DB162F'],
        opacityFrom: 1,
        opacityTo: 1,
        type: 'vertical',
        stops: [0, 30]
      }
    },
    xaxis: {
      categories: props.categories,
    }
  }

  const handleDownloadFile = async () => {
    await ActionGasSensor.downloadReport()
  }

  return (
    <>
      <div className='linechart'>
        <div>
          <Title level={5}>Gas leak data</Title>
          <Paragraph className='lastweek'>
            present gas data newest
          </Paragraph>
        </div>
        {/*<div className='sales'>
          <Button type='primary' onClick={handleDownloadFile}>
            <span>View Report</span>
          </Button>
        </div>*/}
      </div>

      <div id='chart'>
        <Chart options={options} series={series} type='line' height={350} />
      </div>
    </>
  )
}

export default GasLeakChart