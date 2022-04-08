import moment from 'moment'
import React, {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import {Row, Col, Form, Input, Select, Button, Typography, DatePicker } from 'antd'

import ActionUser from '../actions/User'

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'
import ModalDialogs from '../components/ModalDialogs/ModalDialogs'
import _ from 'lodash'

const { Title } = Typography
const { Option } = Select
const [errorModalDialogs] = ModalDialogs(['error'])

const MyProfile = props => {

  const dispatch = useDispatch()

  const User = useSelector(state => state.User) || {}

  const [onSubmit, setOnSubmit] = useState(false)
  const [userInfo, setUserInfo] = useState({
    fullName: '',
    email: '',
    dateOfBirth: '',
    phone: '',
  })

  const [form] = Form.useForm()

  useEffect(() => {
    try {
      if(Object.keys(User.authInfo.user).length) {
        const defaultFormValue = {...User.authInfo.user}
        //safe value
        defaultFormValue.dateOfBirth = moment(defaultFormValue.dateOfBirth)
        defaultFormValue.phone = defaultFormValue.phone.substr(2)

        //set form value
        form.setFieldsValue(defaultFormValue)
        setUserInfo(User.authInfo.user)
      }
    } catch (e) {}
  },[User])

  //handlers
  const handleCancel = () => {
    window.location.replace('/dashboard')
  }

  const onFinish = async (values) => {
    setOnSubmit(true)
    //handle change password
    await ActionUser.changePassword(values, handleChangePassError.bind(this))

    const dataPrepared = _prepareData(values)
    //handle update user info
    dispatch(ActionUser.update(dataPrepared, userInfo.id))
    setOnSubmit(false)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleChangePassError = (e) => {
    setOnSubmit(false)
  }
  const _prepareData = values => {
    let dataPrepared = {...values}
    dataPrepared.phone = `${values.phonePrefix}${values.phone}`
    dataPrepared = _.omit(dataPrepared, ['oldPassword', 'password', 'phonePrefix', 'confirm', 'email'])
    return dataPrepared
  }


  const disabledDate = current => {
    // Can not select days before today and today
    //return current && current < moment().endOf('day')
    return current && (
      current > moment().subtract(16, 'years') //>= 16 years old
      || current < moment().subtract(100, 'years')
    )
  }

  const prefixSelector = (
    <Form.Item name="phonePrefix" noStyle>
      <Select disabled={true} style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  )

  //render
  const htmlSpin = onSubmit ? <LoadingSpinner/> : null

  return (
    <>
      <div className="tabled">
        <Row gutter={[24, 0]} justify="space-around">
          <Col
            xs={{ span: 24, offset: 0 }}
            lg={{ span: 12, offset: 0 }}
            md={{ span: 12 }}
          >
            {htmlSpin}
            <Title className="mb-15">My Profile</Title>
            <Title className="font-regular text-muted" level={5}>
              Update your information
            </Title>
            <Form
              form={form}
              name='MyProfileForm'
              initialValues={{ ...userInfo, phonePrefix: '84' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className='row-col'
            >
              <Form.Item
                name='fullName'
                rules={[
                  { required: true, message: 'Please input your username!' },
                  { pattern: /^[a-zA-Z ]+$/, message: 'Full Name is invalid' },
                  { min: 3, message: 'Length of Full name must be >= 3 characters' },
                ]}
              >
                <Input disabled={onSubmit} placeholder='Full Name' />
              </Form.Item>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Please input your email!' },
                  { pattern: /\S+@\S+\.\S+/, message: 'Email is invalid' },
                ]}
              >
                <Input disabled={true} placeholder='Email' />
              </Form.Item>

              <Form.Item
                name='dateOfBirth'
                rules={[
                  { required: true, message: 'Please input your birthday!' },
                ]}
              >
                <DatePicker
                  disabled={onSubmit}
                  format="YYYY-MM-DD"
                  placeholder="Birthday"
                  defaultPickerValue={moment().subtract(18, 'years')}
                  // defaultValue={moment('1999-06-06', 'YYYY-MM-DD')}
                  disabledDate={disabledDate}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { min: 6, max: 8, message: 'Length of Phone number from 8 to 10 characters' },
                  { pattern: /^\d*$/, message: 'Phone number must be numeric!' },
                ]}
              >
                <Input disabled={onSubmit} addonBefore={prefixSelector}/>
              </Form.Item>

              {/*<Form.Item name='remember' valuePropName='checked'>
                  <Checkbox>
                    I agree the{' '}
                    <a href='#dadn' className='font-bold text-dark'>
                      Terms and Conditions
                    </a>
                  </Checkbox>
                </Form.Item>*/}


              <Form.Item>
                &nbsp;
              </Form.Item>

              <Form.Item
                name='oldPassword'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, max: 255, message: 'Length of old word must be >= 6 characters' },
                ]}
              >
                <Input.Password disabled={onSubmit} placeholder='Password' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your new password!' },
                  { min: 6, max: 255, message: 'Length of new password must be >= 6 characters' },
                ]}
              >
                <Input.Password disabled={onSubmit} placeholder='New Password' />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your new password!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve()
                      }
                      return Promise.reject(new Error('The two passwords that you entered do not match!'))
                    },
                  }),
                ]}
              >
                <Input.Password disabled={onSubmit} placeholder='Confirm New Password' />
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

export default MyProfile
