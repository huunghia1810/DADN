import moment from 'moment'
import _ from 'lodash'
import React, {useEffect, useState} from 'react'
import {useHistory, useParams} from 'react-router-dom'
import {useDispatch} from 'react-redux'
import {
  Row,
  Col,
  Button,
  Typography, Form, Input,
} from 'antd'

import LoadingSpinner from '../components/LoadingSpinner/LoadingSpinner'

const { Title } = Typography

const DeviceForm = props => {
  const history = useHistory()
  const { action, id } = useParams()
  const dispatch = useDispatch()

  const [onSubmit, setOnSubmit] = useState(false)
  const [userInfo, setUserInfo] = useState({})

  const [form] = Form.useForm()

  useEffect(() => {

  }, [])

  //handlers
  const onFinish = async values => {
    setOnSubmit(true)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

  const handleCancel = () => {
    history.push('/dashboard')
  }

  //render
  const htmlSpin = onSubmit ? <LoadingSpinner/> : null
  const formName = !_.isUndefined(id) ? `Update device` : `New device`
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
            <Title className="mb-15" level={2}>{formName}</Title>
            <Form
              form={form}
              name='DeviceForm'
              initialValues={{ ...userInfo, phonePrefix: '84' }}
              onFinish={onFinish}
              onFinishFailed={onFinishFailed}
              className='row-col'
            >
              <Form.Item
                name='fullName'
                rules={[
                  { required: true, message: 'Please input your username!' },
                  { pattern: /^[A-Za-z0-9 ]+$/, message: 'Full Name is invalid' },
                  { min: 3, message: 'Length of Full name must be >= 3 characters' },
                ]}
              >
                <Input disabled={onSubmit} placeholder='Full Name' />
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

export default DeviceForm
