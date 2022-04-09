import _ from 'lodash'
import React, { useCallback, useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

import {Row, Col, Slider, Button, Typography, Form, Input, Switch } from 'antd'

import feathersClient from './../feathersClient'

import ActionSetting from '../actions/Setting'

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const { Title } = Typography
const FIELDS = {
  FAN_MODE: 'fanMode',
  SEND_SMS: 'sendSMS',
  LED_BUZZ: 'ledBuzz',
  
  FAN_SPEED: 'fanSpeed',
  BUZZ_LOUNDNESS: 'buzzLoudness',
}

const Settings = props => {
  const history = useHistory()
  const dispatch = useDispatch()

  const User = useSelector(state => state.User) || {}
  const Setting = useSelector(state => state.Setting) || {}

  const [onSubmit, setOnSubmit] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const [fanMode, setFanMode] = useState(true)
  const [sendSms, setSendSms] = useState(false)
  const [ledBuzz, setLedBuzz] = useState(true)

  const [fanSpeed, setFanSpeed] = useState(true)
  const [buzzLoudness, setBuzzLoudness] = useState(true)

  const [disabledFanSpeed, setDisabledFanSpeed] = useState(false)
  const [disabledBuzzLoudness, setDisabledBuzzLoudness] = useState(false)

  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(ActionSetting.getSettings())
  }, [])

  useEffect(() => {
    if(Object.keys(Setting.settings).length) {
      //set value slider & switch
      handleSetFormValue(Setting.settings)
    }
  }, [Setting])

  //handlers
  const onFinish = async (values) => {
    setOnSubmit(true)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const onChange = (fieldName, value, e) => {
    switch (fieldName) {
      case FIELDS.FAN_MODE:
        setDisabledFanSpeed(!value)
        break
      case FIELDS.SEND_SMS:
        break
      case FIELDS.LED_BUZZ:
        setDisabledBuzzLoudness(!value)
        break

      case FIELDS.FAN_SPEED:
        setFanSpeed(value)
        break
      case FIELDS.BUZZ_LOUNDNESS:
        setBuzzLoudness(value)
        break
    }
    console.log('onChange: ', fieldName, value, e);
  }

  const onAfterChange = value => {
    console.log('onAfterChange: ', value);
  }

  const handleCancel = () => {
    history.push('/dashboard')
    //window.location.replace('/dashboard')
  }

  const handleSetFormValue = values => {
    form.setFieldsValue(values)

    //set values for Switch, Slider
    setSendSms(!!values.sendSMS)
    setFanMode(!!values.fanMode)
    setLedBuzz(!!values.ledBuzz)

    setFanSpeed(values.fanSpeed)
    setBuzzLoudness(values.buzzLoudness)
  }

  //render
  const htmlSpin = onSubmit ? <LoadingSpinner/> : null

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 16, offset: 0 }}
            md={{ span: 24 }}
          >
            {htmlSpin}
            <Title className="mb-15">&nbsp;</Title>
            {/*<Title className="font-regular text-muted" level={5}>*/}
            {/*  Update your information*/}
            {/*</Title>*/}
            <Form
              form={form}
              name='SettingForm'
              //initialValues={{ phonePrefix: '84' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className='row-col'
              labelCol={{ span: 8 }}
              wrapperCol={{ span: 16 }}
            >
              <Form.Item
                label="Fan Mode"
                name='fanMode'
              >
                <Switch className="device-toggle" onChange={onChange.bind(this, FIELDS.FAN_MODE)} defaultChecked={fanMode} />
                <Input disabled={onSubmit} type='hidden' placeholder='Fan Mode' />
              </Form.Item>

              <Form.Item
                label="Fan Speed"
                name='fanSpeed'
              >
                <Slider value={fanSpeed} disabled={disabledFanSpeed} onChange={onChange.bind(this, FIELDS.FAN_SPEED)} />
                <Input disabled={onSubmit} type='hidden' placeholder='Fan Speed' />
              </Form.Item>

              <Form.Item
                label="LED & Buzz Mode"
                name='ledBuzz'
              >
                <Switch className="device-toggle" onChange={onChange.bind(this, FIELDS.LED_BUZZ)} defaultChecked={ledBuzz} />
                <Input disabled={onSubmit} type='hidden' placeholder='Warn Gas Leak Through LED + Buzz' />
              </Form.Item>

              <Form.Item
                label="Buzz Loudness"
                name='buzzLoudness'
              >
                <Slider value={buzzLoudness} disabled={disabledBuzzLoudness} onChange={onChange.bind(this, FIELDS.BUZZ_LOUNDNESS)} />
                <Input disabled={onSubmit} type='hidden' placeholder='Buzz Loudness' />
              </Form.Item>

              <Form.Item
                label="Warn Gas Leak Through SMS"
                name='sendSMS'
              >
                <Switch className="device-toggle" onChange={onChange.bind(this, FIELDS.SEND_SMS)} defaultChecked={sendSms} />
                <Input disabled={onSubmit} type='hidden' placeholder='Warn Gas Leak Through SMS' />
              </Form.Item>


              <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                <Button
                  disabled={onSubmit}
                  style={{ width: '100px' }}
                  type='primary'
                  htmlType='submit'
                >
                  Save
                </Button>

                <Button
                  disabled={onSubmit}
                  style={{ width: '100px' }}
                  type='default'
                  onClick={handleCancel}
                  htmlType='button'
                >
                  Cancel
                </Button>
              </Form.Item>
            </Form>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Settings
