import moment from 'moment'
import _ from 'lodash'
import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import {Row, Col, Button, Typography, Form, Input, Space, Select, Slider} from 'antd'
import { MinusCircleOutlined, PlusOutlined } from '@ant-design/icons'

import ActionDevice from '../actions/Device'

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import NotificationDialogs from '../components/NotificationDialogs/NotificationDialogs'

const [errorNotificationDialogs, successNotificationDialogs] = NotificationDialogs(['error', 'success'])

const { Title } = Typography
const { Option } = Select

const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
}
const DEVICE_TYPES = {
  BUZZER: 'BUZZER',
  FAN: 'FAN',
  GAS_SENSOR: 'GAS_SENSOR',
  LED: 'LED',
}
const DeviceForm = props => {
  const history = useHistory()
  const { action, id } = useParams()
  const dispatch = useDispatch()

  const User = useSelector(state => state.User) || {}
  const Device = useSelector(state => state.Device) || {}

  const [onSubmit, setOnSubmit] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const [formListInit, setFormListInit] = useState([])

  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(ActionDevice.getDevices())
  }, [])

  useEffect(() => {
    try {
      if(Object.keys(User.authInfo.user).length) {
        //form.setFieldsValue({listDevices: [{fieldKey: 123, isListField: true, key: 123, name: '', code: '', status: STATUS.ACTIVE, type: DEVICE_TYPES.BUZZER}]})
      }
    } catch (e) {}
  }, [User])

  useEffect(() => {
    _setFormData()
  }, [Device])

  //handlers
  const onFinish = async values => {
    setOnSubmit(true)
    const dataPrepared = _prepareData(values)

    dispatch(ActionDevice.modifyDevice(dataPrepared, handleModifyDeviceSuccess.bind(this), handleModifyDeviceError.bind(this)))
  }

  const handleModifyDeviceSuccess = res => {
    successNotificationDialogs.show({
      message: 'Modify successful',
      description: ' ',
      placement: 'top',
      duration: 1.5,
    })
    setOnSubmit(false)
    setTimeout(() => history.push('/devices'), 1550)
  }

  const handleModifyDeviceError = res => {
    //not show dialog error because trigger from feathersClient.hooks in App.js
    setOnSubmit(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleCancel = () => {
    history.push('/dashboard')
  }

  const _prepareData = values => {
    const { listDevices } = {...values}
    let dataPrepared = [...listDevices]

    return dataPrepared
  }

  const _setFormData = () => {
    let _listDevices = [{id: '', name: '', status: STATUS.ACTIVE, code: '', type: DEVICE_TYPES.BUZZER}]
    //_listDevices = [{fieldKey: 123, isListField: true, key: 123, name: '', status: STATUS.ACTIVE, code: '', type: DEVICE_TYPES.BUZZER}]
    if(Device.listDevices.length) {
      _listDevices = Device.listDevices.map(device => {
        return {id: device.id, name: device.name, status: device.status, code: device.code, type: device.type}
      })
    }
    form.setFieldsValue({listDevices: _listDevices})
  }

  //render
  const htmlSpin = onSubmit ? <LoadingSpinner/> : null
  //const formName = !_.isUndefined(id) ? `Update device` : `New device`
  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            md={{ span: 20 }}
            lg={{ span: 18, offset: 0 }}
          >
            {htmlSpin}
            <Title className="mb-15" level={2}>Modify device(s)</Title>
            <Form
              form={form}
              name='DeviceForm'
              initialValues={{ phonePrefix: '84' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className='row-col'
              // labelCol={{ span: 8 }}
              // wrapperCol={{ span: 16 }}
            >
              <Form.List
                name="listDevices"
                initialValue={formListInit}
                rules={[
                  { required: true, message: 'Please add device(s)' },
                ]}
              >
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, id, name, ...restField }) => (
                      <>
                        <Row className="device-row-item" gutter={[24, 0]}>
                          <Col xs={24} sm={24} md={8} lg={8}>
                            <Form.Item
                              {...restField}
                              name={[name, 'name']}
                              rules={[
                                { required: true, message: 'Please input Name of Device' },
                                { min: 3, message: 'Length of Name must be >= 3 characters' }
                              ]}
                            >
                              <Input disabled={onSubmit} placeholder="Name" />
                            </Form.Item>

                            <Form.Item
                              {...restField}
                              name={[name, 'id']}
                              style={{display: 'none'}} >
                              <Input disabled={onSubmit} type='hidden' />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={24} md={6} lg={6}>
                            <Form.Item
                              {...restField}
                              name={[name, 'code']}
                              rules={[
                                { required: true, message: 'Please input Code of Device' },
                                { pattern: /^[A-Za-z0-9_]+$/, message: 'Code is invalid' },
                                { min: 3, message: 'Length of Code must be >= 3 characters' },
                              ]}
                            >
                              <Input disabled={onSubmit} placeholder="Code" />
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={20} md={4} lg={4}>
                            <Form.Item
                              {...restField}
                              name={[name, 'type']}
                              rules={[{ required: true }]}
                            >
                              <Select disabled={onSubmit}>
                                <Option value={DEVICE_TYPES.BUZZER}>Buzzer</Option>
                                <Option value={DEVICE_TYPES.FAN}>Fan</Option>
                                <Option value={DEVICE_TYPES.GAS_SENSOR}>Gas Sensor</Option>
                                <Option value={DEVICE_TYPES.LED}>Led</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={20} md={4} lg={4}>
                            <Form.Item
                              {...restField}
                              name={[name, 'status']}
                              rules={[{ required: true }]}
                            >
                              <Select disabled={onSubmit}>
                                <Option value={STATUS.ACTIVE}>Active</Option>
                                <Option value={STATUS.INACTIVE}>Inactive</Option>
                              </Select>
                            </Form.Item>
                          </Col>
                          <Col xs={24} sm={4} md={2} lg={2}>
                            <MinusCircleOutlined style={{ fontSize: '30px', lineHeight: '35px', marginTop: '5px'}} onClick={() => {
                              if(!onSubmit && fields.length > 1) {
                                return remove(name)
                              } else {
                                return null
                              }
                            }} />
                          </Col>
                        </Row>
                      </>
                    ))}
                    <Form.Item wrapperCol={{ offset: 6, span: 12 }}>
                      <Button type="dashed" disabled={onSubmit} onClick={() => add({id: '', name: '', status: STATUS.ACTIVE, code: '', type: DEVICE_TYPES.BUZZER})} block icon={<PlusOutlined />}>
                        Add device
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>

              <Form.Item wrapperCol={{ offset: 10, span: 10 }}>
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

export default DeviceForm
