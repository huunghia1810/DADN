import React, {Component, useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import queryString from 'query-string'
import moment from 'moment'
import _ from 'lodash'

import {
  Layout,
  DatePicker,
  Button,
  Typography,
  Card,
  Form,
  Input,
  Checkbox,
  Select,
} from 'antd'

import { Link } from 'react-router-dom'
import {
  DribbbleOutlined,
  TwitterOutlined,
  InstagramOutlined,
  GithubOutlined,
} from '@ant-design/icons'

//----------import components---------------
import LoadingSpinner from './../components/LoadingSpinner/LoadingSpinner'
import ModalDialogs from '../components/ModalDialogs/ModalDialogs'
import NotificationDialogs from '../components/NotificationDialogs/NotificationDialogs'

//----------import actions---------------
import ActionUser from '../actions/User'

const [errorNotificationDialogs, successNotificationDialogs] = NotificationDialogs(['error', 'success'])

const { Title } = Typography
const { Option } = Select
const { Header, Footer, Content } = Layout

const SignUp = props => {

  const dispatch = useDispatch()

  const User = useSelector(state => state.User) || {}

  const objParams = queryString.parse(props.location.search)

  const [onSubmit, setOnSubmit] = useState(false)
  const [formValues, setFormValues] = useState(false)

  const [form] = Form.useForm()

  useEffect(() => {
    dispatch(ActionUser.checkAuth())
  },[])

  useEffect(() => {
    if(Object.keys(User.authInfo).length) {
      setOnSubmit(false)
      handleRedirect()
    }
    if(!_.isNull(User.error)) { //register error
      setOnSubmit(false)
      const {errors} = User.error
      if(Array.isArray(errors)) {
        errors.map(err => {
          form.setFields([
            {
              //value: formValues[err.path] || '',
              name: [err.path],
              //errors: [err.message.substring(`${err.path} `.length)],
              errors: [err.message],
            }
          ])
        })
      }
    }
  },[User])

  const handleRedirect = () => {
    if(!_.isUndefined(objParams.redirect) && objParams.redirect !== '/sign-out') {
      props.history.push(objParams.redirect)
    } else {
      props.history.push('/dashboard')
    }
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
      <Select disabled={onSubmit} style={{ width: 70 }}>
        <Option value="84">+84</Option>
      </Select>
    </Form.Item>
  )


  const onFinish = (values) => {
    setOnSubmit(true)
    setFormValues(values)
    const dataPrepared = _prepareData(values)
    dispatch(ActionUser.signUp(dataPrepared))

    successNotificationDialogs.show({
      message: 'Messs aaa ',
      description: ' descrpsd sdfsf sf ',
      placement: 'top',
      duration: 1.5,
    })
    console.log('Success:', values)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const _prepareData = values => {
    const dataPrepared = {...values}
    dataPrepared.phone = `${values.phonePrefix}${values.phone}`
    return dataPrepared
  }

  //render
  const htmlSpin = onSubmit ? <LoadingSpinner/> : null

  return (
    <>
      <div className='layout-default ant-layout layout-sign-up'>
        <Content className='p-0'>
          <div className='sign-up-header'>
            <div className='content'>
              <Title>Sign Up</Title>
              {/*<p className='text-lg'>*/}
              {/*  Use these awesome forms to login or create new account in your*/}
              {/*  project for free.*/}
              {/*</p>*/}
            </div>
          </div>

          {htmlSpin}
          <Card
            className='card-signup header-solid h-full ant-card pt-0'
            title={<h5>Register</h5>}
            bordered='false'
          >
            {/*<div className='sign-up-gateways'>
                <Button type='false'>
                  <img src={logo1} alt='logo 1' />
                </Button>
                <Button type='false'>
                  <img src={logo2} alt='logo 2' />
                </Button>
                <Button type='false'>
                  <img src={logo3} alt='logo 3' />
                </Button>
              </div>
              <p className='text-center my-25 font-semibold text-muted'>Or</p>*/}
            <Form
              form={form}
              name='UserForm'
              initialValues={{ remember: true, phonePrefix: '84' }}
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
                <Input disabled={onSubmit} placeholder='Email' />
              </Form.Item>
              <Form.Item
                name='password'
                rules={[
                  { required: true, message: 'Please input your password!' },
                  { min: 6, max: 255, message: 'Length of password must be >= 6 characters' },
                ]}
              >
                <Input.Password disabled={onSubmit} placeholder='Password' />
              </Form.Item>
              <Form.Item
                name="confirm"
                dependencies={['password']}
                rules={[
                  {
                    required: true,
                    message: 'Please confirm your password!',
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
                <Input.Password disabled={onSubmit} placeholder='Confirm Password' />
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
                  disabledDate={disabledDate}
                />
              </Form.Item>

              <Form.Item
                name="phone"
                rules={[
                  { required: true, message: 'Please input your phone number!' },
                  { min: 8, max: 10, message: 'Length of Phone number from 8 to 10 characters' },
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
                <Button
                  disabled={onSubmit}
                  style={{ width: '100%' }}
                  type='primary'
                  htmlType='submit'
                >
                  SIGN UP
                </Button>
              </Form.Item>
            </Form>
            <p className='font-semibold text-muted text-center'>
              Already have an account?{' '}
              <Link to='/sign-in' className='font-bold text-dark'>
                Sign In
              </Link>
            </p>
          </Card>
        </Content>
        <Footer>
          <p className='copyright'>
            {' '}
            Copyright © 2022 Gas System Management by <a href='#dadn'>DADN's team</a>.{' '}
          </p>
        </Footer>
      </div>
    </>
  )
}

export default SignUp
