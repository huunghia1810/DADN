import {useEffect, useState, useRef} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {useHistory} from 'react-router-dom'
import Highlighter from 'react-highlight-words'

import {Row, Col, Card, Table, Button, Input, Space, Tag} from 'antd'
import {EditOutlined, PlusOutlined, SearchOutlined} from '@ant-design/icons'

import * as constantDevice from '../constants/Device'

import ActionDevice from '../actions/Device'

const { STATUS, DEVICE_TYPES } = constantDevice

const DeviceList = props => {
  const searchInput = useRef(null)
  const history = useHistory()
  const dispatch = useDispatch()

  const User = useSelector(state => state.User) || {}
  const Device = useSelector(state => state.Device) || {}

  const [tableData, setTableData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [searchedColumn, setSearchedColumn] = useState('')


  //for filter columns of table
  const getColumnSearchProps = dataIndex => ({
    filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters }) => (
      <div style={{ padding: 8 }}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={e => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{ marginBottom: 8, display: 'block' }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            style={{ width: 90 }}
          >
            Search
          </Button>
          <Button onClick={() => handleReset(clearFilters)} size="small" style={{ width: 90 }}>
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({ closeDropdown: false })
              debugger
              setSearchText(selectedKeys[0])
              setSearchedColumn(dataIndex)
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: filtered => <SearchOutlined style={{ color: filtered ? '#1890ff' : undefined }} />,
    onFilter: (value, record) =>
      record[dataIndex]
        ? record[dataIndex].toString().toLowerCase().includes(value.toLowerCase())
        : '',
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => searchInput.current.select(), 100)
      }
    },
    render: text =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{ backgroundColor: '#ffc069', padding: 0 }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  })

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm()
    setSearchText(selectedKeys[0])
    setSearchedColumn(dataIndex)
  }

  const handleReset = clearFilters => {
    clearFilters()
    setSearchText('')
  }

  // table code start
  const columns = [
    {title: 'Name', dataIndex: 'name', key: 'name', width: '33%', ...getColumnSearchProps('name')},
    {title: 'Code', dataIndex: 'code', key: 'code', width: '25%', ...getColumnSearchProps('code')},
    {title: 'Type', key: 'type', dataIndex: 'type', width: '25%',
      filters: [
        {text: <span>Buzzer</span>, value: DEVICE_TYPES.BUZZER},
        {text: <span>Fan</span>, value: DEVICE_TYPES.FAN},
        {text: <span>Gas Sensor</span>, value: DEVICE_TYPES.GAS_SENSOR},
        {text: <span>Led</span>, value: DEVICE_TYPES.LED},
      ],
      onFilter: (value, record) => record.type == value,
      //filterSearch:(input, record) => record.type === input
    },
    {title: 'Status', key: 'status', dataIndex: 'status', width: '15%',
      /*filters: [
        {text: <span>Active</span>, value: 'active'},
        {text: <span>Inactive</span>, value: 'inactive'},
      ],
      onFilter: (value, record) => {
        debugger
        return record.status.startsWith(value)
      },
      //filterSearch:(input, record) => record.status === input*/
    },
    {title: 'Action', key: 'action', dataIndex: 'action', width: '10%'},
  ]

  useEffect(() => {
    dispatch(ActionDevice.getDevices())
  }, [])

  useEffect(() => {
    _setDataTables()
  }, [Device])

  const _setDataTables = () => {
    let _tableData = []

    if(Device.listDevices.length) {
      _tableData = Device.listDevices.map(device => {
        const _tableDataItem = { key: device.id, ...device }
        
        //prepare render
        _tableDataItem.name = (
          <>
            <strong>{_tableDataItem.name}</strong>
          </>
        )
        const color = _tableDataItem.status === STATUS.ACTIVE ? 'green' : 'volcano'
        _tableDataItem.status = (
          <>
            <Tag color={color}>
              {_tableDataItem.status === STATUS.ACTIVE ? 'Active' : 'Inactive'}
            </Tag>
            {/*<span className={_tableDataItem.status === STATUS.ACTIVE ? 'text-success' : 'text-danger'}>*/}
            {/*  {_tableDataItem.status === STATUS.ACTIVE ? 'Active' : 'Inactive'}*/}
            {/*</span>*/}
          </>
        )
        _tableDataItem.action = (
          <>
            <div className="ant-employed">
              <a href="#" onClick={() => history.push('/devices/modify')}>
                <EditOutlined style={{ fontSize: '20px'}} />
              </a>
            </div>
          </>
        )

        return _tableDataItem
      })
    }

    setTableData(_tableData)
  }

  //render
  return (
    <>
      <div className='tabled'>
        <Row gutter={[24, 0]}>
          <Col xs='24' xl={24}>
            <Card
              bordered={false}
              className='devices-list criclebox tablespace mb-24'
              title='List devices'
              extra={
                <>
                  <Button onClick={() => history.push('/devices/modify')} type='primary'>
                    <span><EditOutlined /></span>
                    <span>Modify</span>
                  </Button>
                </>
              }
            >
              <div className='table-responsive'>
                <Table
                  columns={columns}
                  dataSource={tableData}
                  pagination={{pageSize: 10}}
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

export default DeviceList
