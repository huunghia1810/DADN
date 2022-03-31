import React, { useCallback, useState, useEffect } from 'react'

import {
  Row,
  Col,
  Card,
  Radio,
  Table,
  Upload,
  message,
  Progress,
  Button,
  Avatar,
  Typography,
} from "antd"
import rest from '@feathersjs/rest-client'

import feathersClient from './../feathersClient'

const aaa = () => {

}
const Tables = props => {

  useEffect(() => {
    fetchSetting()
  }, [])

  const fetchSetting = async () => {
    return feathersClient.service('settings').find({
      query: {
        $sort: {
          id: -1
        }
      }
    }).then(res => {
      debugger
        //this.setState({products: res.data})
    })

  }

  return (
    <>
      <div>
        abc
      </div>
    </>
  )
}

export default Tables
