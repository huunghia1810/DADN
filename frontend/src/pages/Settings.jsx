import _ from 'lodash'
import React, { useCallback, useState, useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import { useHistory } from 'react-router-dom'

import {Row, Col, Slider, Button, Typography, Form, Input, Switch } from 'antd'

import ActionSetting from '../actions/Setting'

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import NotificationDialogs from '../components/NotificationDialogs/NotificationDialogs'

const [errorNotificationDialogs, successNotificationDialogs] = NotificationDialogs(['error', 'success'])

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

  const [fanModeToggle, setFanModeToggle] = useState(false)
  const [sendSMSToggle, setSendSMSToggle] = useState(false)
  const [ledBuzzToggle, setLedBuzzToggle] = useState(false)

  const [fanSpeed, setFanSpeed] = useState(0)
  const [buzzLoudness, setBuzzLoudness] = useState(0)

  const [disabledFanSpeed, setDisabledFanSpeed] = useState(false)
  const [disabledBuzzLoudness, setDisabledBuzzLoudness] = useState(false)

  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(ActionSetting.getSettings())
  }, [])

  useEffect(() => {
    if(Object.keys(Setting.settingInfo).length) {
      //set value slider & switch
      handleSetFormValue(Setting.settingInfo)
    }
  }, [Setting])

  //handlers
  const onFinish = async values => {
    setOnSubmit(true)
    const dataPrepared = _prepareData(values)

    //debugger
    dispatch(ActionSetting.creatSetting(dataPrepared, handleCreateSettingSuccess.bind(this), handleCreateSettingError.bind(this)))
  }

  const onFinishFailed = error => {
    console.log('Failed:', error)
  }

  const handleCreateSettingError = res => {
    //not show dialog error because trigger from feathersClient.hooks in App.js
    setOnSubmit(false)
  }

  const handleCreateSettingSuccess = res => {
    const message = _.isUndefined(Setting.settingInfo.id) ? `Create setting successful` : `Update setting successful`
    successNotificationDialogs.show({
      message,
      description: ' ',
      placement: 'top',
      duration: 1.5,
    })
    setOnSubmit(false)
  }

  const _prepareData = values => {
    let dataPrepared = {...values}
    debugger
    if(!_.isUndefined(Setting.settingInfo.id)) {
      dataPrepared.id = Setting.settingInfo.id
    }

    return dataPrepared
  }

  const onChange = (fieldName, value, e) => {
    switch (fieldName) {
      case FIELDS.FAN_MODE:
        setDisabledFanSpeed(!value)
        setFanModeToggle(value)
        break
      case FIELDS.SEND_SMS:
        setSendSMSToggle(value)
        break
      case FIELDS.LED_BUZZ:
        setDisabledBuzzLoudness(!value)
        setLedBuzzToggle(value)
        break

      case FIELDS.FAN_SPEED:
        setFanSpeed(value)
        break
      case FIELDS.BUZZ_LOUNDNESS:
        setBuzzLoudness(value)
        break
    }
    form.setFieldsValue({
      [fieldName]: typeof value == 'boolean' ? (value === true ? '1' : '0') : value,
    })
    console.log('onChange: ', fieldName, value, e);
  }

  const handleCancel = () => {
    history.push('/dashboard')
  }

  const handleSetFormValue = values => {
    debugger
    form.setFieldsValue(values)

    //set values for Switch, Slider
    setSendSMSToggle(values.sendSMS == 1 ? true : false)
    setFanModeToggle(values.fanMode == 1 ? true : false)
    setLedBuzzToggle(values.ledBuzz == 1 ? true : false)

    setDisabledFanSpeed(values.fanMode == 0)
    setDisabledBuzzLoudness(values.ledBuzz == 0)

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
            <Title className="mb-15" level={2}>Settings</Title>
            {/*<Title className="font-regular text-muted" level={5}>*/}
            {/*  Update your information*/}
            {/*</Title>*/}
            <Form
              form={form}
              name='SettingForm'
              initialValues={{ fanMode: '0', ledBuzz: '0', sendSMS: '0', fanSpeed: '0', buzzLoudness: '0' }}
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
                <Switch className="device-toggle" onChange={onChange.bind(this, FIELDS.FAN_MODE)} defaultChecked={true} checked={fanModeToggle} />
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
                <Switch className="device-toggle" onChange={onChange.bind(this, FIELDS.LED_BUZZ)} defaultChecked={true} checked={ledBuzzToggle} />
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
                <Switch className="device-toggle" onChange={onChange.bind(this, FIELDS.SEND_SMS)} defaultChecked={true} checked={sendSMSToggle} />
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
