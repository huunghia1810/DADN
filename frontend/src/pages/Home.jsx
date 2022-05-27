import _ from 'lodash'
import moment from 'moment'
import {useEffect, useState} from 'react'
import {useDispatch, useSelector} from 'react-redux'

import feathersClient from './../feathersClient'

import { Card, Col, Row, Switch, Button, Table, Avatar } from 'antd'

import ActionUser from '../actions/User'
import ActionGasLeak from '../actions/GasLeak'
import ActionGasData from '../actions/GasData'

import * as constantUser from '../constants/User'
import * as constantGasData from '../constants/GasData'

import GasLeakChart from '../components/chart/GasLeak'

import warning from '../assets/images/warning.png'
import cooler from '../assets/images/cooler.png'
import broadcast from '../assets/images/broadcast.png'
import volume from '../assets/images/volume.png'
import shield from '../assets/images/shield.png'

const { STATUS } = constantUser

const Home = props => {

  const dispatch = useDispatch()
  const [arrMembers, setArrMembers] = useState([])
  const [gasLeakData, setGasLeakData] = useState([])
  const [gasLeakCategories, setGasLeakCategories] = useState([])
  const [gasDataHistory, setGasDataHistory] = useState([])
  const [gasLeakStatus, setGasLeakStatus] = useState(false)

  const User = useSelector(state => state.User) || {}
  const GasLeakStore = useSelector(state => state.GasLeak) || {}
  const GasDataStore = useSelector(state => state.GasData) || {}

  useEffect(() => {
    dispatch(ActionUser.getUsers())
    dispatch(ActionGasLeak.getGasLeaks())
    dispatch(ActionGasData.getGasData())

    feathersClient.service('gas-leak')
      .on('created', message => {
        _handleListenGasLeak(message)
      })
      .on('updated', message => {
        _handleListenGasLeak(message)
      })
      .on('patched', message => {
        _handleListenGasLeak(message)
      })

    feathersClient.service('gas-data')
      .on('created', message => {
        _handleListenGasData(message)
      })
      .on('updated', message => {
        _handleListenGasData(message)
      })
      .on('patched', message => {
        _handleListenGasData(message)
      })

  }, [])

  useEffect(() => {
    _renderSectionMember()
  }, [User])

  useEffect(() => {
    _setDataSeries()
  }, [GasLeakStore])

  useEffect(() => {
    _setDataLeakHistory()
    _updateGasLeakStatusLatest()
  }, [GasDataStore])

  const _updateGasLeakStatusLatest = () => {
    if (GasDataStore.listGasData.length) {
      const itemLatest = GasDataStore.listGasData[0]
      const gasLeakStatusIsEnable = itemLatest.status === constantGasData.STATUS.ACTIVE ? true : false
      debugger
      setGasLeakStatus(gasLeakStatusIsEnable)
    }
  }
  //--------------data section leak start------------
  const _handleListenGasLeak = message => {
    dispatch(ActionGasLeak.getGasLeaks())
  }
  const _setDataSeries = () => {
    if(GasLeakStore.listGasLeaks.length) {
      let arrGasLeakData = [],
        arrGasLeakCategories = []
      for(let i = GasLeakStore.listGasLeaks.length - 1; i >= 0; i--) {
        const item = GasLeakStore.listGasLeaks[i]

        arrGasLeakData.push(item.index || 0)
        arrGasLeakCategories.push(moment(item.createdAt).locale('en').format('hh:mm a'))
      }

      setGasLeakData([...arrGasLeakData])
      setGasLeakCategories([...arrGasLeakCategories])
    }
  }

  //--------------data section members start------------
  const _renderSectionMember = () => {
    if(User.listUsers.length) {
      const arrTmpMembers = User.listUsers.map(curUser => {

        const htmlStatus = curUser.status === STATUS.ACTIVE
          ? (<span className={'text-success'}>Active</span>) :
          (<span className={'text-danger'}>Inactive</span>)

        return (
          {
            id: curUser.id,
            name: curUser.fullName,
            phoneNumber: curUser.phone,
            dateJoined: moment(curUser.createdAt).locale('vi').fromNow(),
            status: htmlStatus,
          }
        )
      })

      setArrMembers(arrTmpMembers)
    }
  }
  const columnsMembers = [
    { title: 'Id', dataIndex: 'id', key: 'id', width: '5%' },
    { title: 'Name', key: 'name', dataIndex: 'name' },
    {title: 'Phone number', key: 'phoneNumber', dataIndex: 'phoneNumber' },
    { title: 'Date joined', key: 'dateJoined', dataIndex: 'dateJoined' },
    { title: 'Status', key: 'status', dataIndex: 'status' }
  ]
  //--------------data section members end------------

  //--------------data section leak history start------------
  const columnsGasLeakHistory = [
    { title: 'Sensor', dataIndex: 'sensor', key: 'sensor', width: '32%' },
    { title: 'Status', key: 'status', dataIndex: 'status' },
    { title: 'Time', key: 'time', dataIndex: 'time' },
  ]

  const _handleListenGasData = message => {
    dispatch(ActionGasData.getGasData())
  }

  const _setDataLeakHistory = () => {
    if (GasDataStore.listGasData.length) {
      let arrGasDataHistory = []
      GasDataStore.listGasData.map(item => {
        arrGasDataHistory.push({
          sensor: 'Gas',
          status: (item.status == constantGasData.STATUS.ACTIVE ? (<span className={'text-success'}>Active</span>) : (<span className={'text-danger'}>Inactive</span>)),
          time: moment(item.createdAt).locale('en').format('DD/MM/YYYY hh:mm:ss a'),
        })
      })

      setGasDataHistory(arrGasDataHistory)
    }
  }
  //--------------data section leak history end------------

  return (
    <>
      <div className='layout-content'>
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14}>
            <Card bordered={false} className='criclebox device-status-section'>
              <Row className='device-row' gutter={[24, 0]}>
                <Col xs={24} sm={24} md={24} lg={24} xl={24}>
                  <Avatar
                    className='shape-avatar'
                    shape='square'
                    size={350}
                    src={cooler}
                  ></Avatar>
                  <Switch className='device-toggle'
                          checked={gasLeakStatus}
                          disabled={true}
                          defaultChecked={false} />
                </Col>
                {/*<Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className='shape-avatar'
                    shape='square'
                    size={128}
                    src={warning}
                  ></Avatar>
                  <Switch className='device-toggle' defaultChecked />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className='shape-avatar'
                    shape='square'
                    size={128}
                    src={broadcast}
                  ></Avatar>
                  <Switch className='device-toggle' defaultChecked />
                </Col>*/}
              </Row>
              {/*<Row className='device-row' gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className='shape-avatar'
                    shape='square'
                    size={128}
                    src={cooler}
                  ></Avatar>
                  <Switch className='device-toggle' defaultChecked />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className='shape-avatar'
                    shape='square'
                    size={128}
                    src={volume}
                  ></Avatar>
                  <Switch className='device-toggle' defaultChecked />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className='shape-avatar'
                    shape='square'
                    size={128}
                    src={shield}
                  ></Avatar>
                  <Switch className='device-toggle' defaultChecked />
                </Col>
              </Row>*/}
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className='mb-24'>
            <Card bordered={false} className='criclebox h-full'>
              <GasLeakChart data={gasLeakData} categories={gasLeakCategories} title="Gas leak data" />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className='mb-24'>
            <Card
                bordered={false}
                className='header-solid h-full ant-invoice-card'
                title={[<h6 className='font-semibold m-0'>New Members</h6>]}
                extra={[
                  /*<Button type='primary'>
                    <span>Add</span>
                  </Button>,*/
                ]}
            >
              <div className='table-responsive'>
                <Table
                    columns={columnsMembers}
                    dataSource={arrMembers}
                    pagination={false}
                    className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className='mb-24'>
            <Card
                bordered={false}
                className='header-solid h-full ant-invoice-card'
                title={[<h6 className='font-semibold m-0'>Gas Leak History</h6>]}
                extra={[
                  /*<Button type='primary'>
                    <span>View all</span>
                  </Button>,*/
                ]}
            >
              <div className='table-responsive'>
                <Table
                    columns={columnsGasLeakHistory}
                    dataSource={gasDataHistory}
                    pagination={false}
                    className='ant-border-space'
                />
              </div>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Home
