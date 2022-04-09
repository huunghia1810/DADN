import { useState } from "react"

import {
  Card,
  Col,
  Row,
  Typography,
  Tooltip,
  Progress,
  Upload,
  message,
  Switch,
  Button,
  Timeline,
  Radio, List, Table, Avatar,
} from "antd"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFan, faBullhorn, faTowerBroadcast, faVolumeHigh, faShieldHalved } from '@fortawesome/free-solid-svg-icons'

import {
  RightOutlined,
} from "@ant-design/icons"
import Paragraph from "antd/lib/typography/Paragraph"

import Echart from "../components/chart/EChart"
import LineChart from "../components/chart/LineChart"

import card from "../assets/images/info-card-1.jpg"
import warning from "../assets/images/warning.png"
import cooler from "../assets/images/cooler.png"
import broadcast from "../assets/images/broadcast.png"
import volume from "../assets/images/volume.png"
import shield from "../assets/images/shield.png"

function Home() {
  const { Title, Text } = Typography

  const onChange = (e) => console.log(`radio checked:${e.target.value}`)

  const [reverse, setReverse] = useState(false)

  //--------------data section members start------------
  const columnsMembers = [
    {
      title: "Id",
      dataIndex: "id",
      key: "id",
      width: "5%",
    },
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Phone number",
      key: "phoneNumber",
      dataIndex: "phoneNumber",
    },
    {
      title: "Date joined",
      key: "dateJoined",
      dataIndex: "dateJoined",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
  ]

  const arrMembers = [
    {
      id: "1",
      name: "Nguyen Van A",
      phoneNumber: "0987654321",
      dateJoined: "18-02-2022 13:34:12",
      status: (<>
        <span className={"text-success"}>active</span>
      </>),
    },
    {
      id: "2",
      name: "Nguyen Van B",
      phoneNumber: "0987654321",
      dateJoined: "18-02-2022 13:34:12",
      status: (<>
        <span className={"text-danger"}>inactive</span>
      </>),
    },
    {
      id: "3",
      name: "Nguyen Van C",
      phoneNumber: "0987654321",
      dateJoined: "18-02-2022 13:34:12",
      status: (<>
        <span className={"text-success"}>active</span>
      </>),
    },
    {
      id: "4",
      name: "Nguyen Van D",
      phoneNumber: "0987654321",
      dateJoined: "18-02-2022 13:34:12",
      status: (<>
        <span className={"text-success"}>active</span>
      </>),
    },
    {
      id: "5",
      name: "Nguyen Van E",
      phoneNumber: "0987654321",
      dateJoined: "18-02-2022 13:34:12",
      status: (<>
        <span className={"text-danger"}>inactive</span>
      </>),
    },
  ]
  //--------------data section members end------------

  //--------------data section leak history start------------
  const columnsGasLeakHistory = [
    {
      title: "Sensor",
      dataIndex: "sensor",
      key: "sensor",
      width: "32%",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
    },
    {
      title: "Time",
      key: "time",
      dataIndex: "time",
    },
  ]

  const arrGasLeakHistory = [
    {
      sensor: "Gas",
      status: "1",
      time: "18-02-2022 13:34:12",
    },
    {
      sensor: "Gas",
      status: "1",
      time: "18-02-2022 13:34:12",
    },
    {
      sensor: "Gas",
      status: "1",
      time: "18-02-2022 13:34:12",
    },
    {
      sensor: "Gas",
      status: "1",
      time: "18-02-2022 13:34:12",
    },
    {
      sensor: "Gas",
      status: "1",
      time: "18-02-2022 13:34:12",
    },
    {
      sensor: "Gas",
      status: "1",
      time: "18-02-2022 13:34:12",
    },
  ]
  //--------------data section leak history end------------

  return (
    <>
      <div className="layout-content">
        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14}>
            <Card bordered={false} className="criclebox device-status-section">
              <Row className="device-row" gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={128}
                    src={cooler}
                  ></Avatar>
                  <Switch className="device-toggle" defaultChecked />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={128}
                    src={warning}
                  ></Avatar>
                  <Switch className="device-toggle" defaultChecked />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={128}
                    src={broadcast}
                  ></Avatar>
                  <Switch className="device-toggle" defaultChecked />
                </Col>
              </Row>
              <Row className="device-row" gutter={[24, 0]}>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={128}
                    src={cooler}
                  ></Avatar>
                  <Switch className="device-toggle" defaultChecked />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={128}
                    src={volume}
                  ></Avatar>
                  <Switch className="device-toggle" defaultChecked />
                </Col>
                <Col xs={24} sm={24} md={12} lg={8} xl={8}>
                  <Avatar
                    className="shape-avatar"
                    shape="square"
                    size={128}
                    src={shield}
                  ></Avatar>
                  <Switch className="device-toggle" defaultChecked />
                </Col>
              </Row>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card bordered={false} className="criclebox h-full">
              <LineChart />
            </Card>
          </Col>
        </Row>

        <Row gutter={[24, 0]}>
          <Col xs={24} sm={24} md={12} lg={12} xl={14} className="mb-24">
            <Card
                bordered={false}
                className="header-solid h-full ant-invoice-card"
                title={[<h6 className="font-semibold m-0">Members</h6>]}
                extra={[
                  <Button type="primary">
                    <span>Add</span>
                  </Button>,
                ]}
            >
              <div className="table-responsive">
                <Table
                    columns={columnsMembers}
                    dataSource={arrMembers}
                    pagination={false}
                    className="ant-border-space"
                />
              </div>
            </Card>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={10} className="mb-24">
            <Card
                bordered={false}
                className="header-solid h-full ant-invoice-card"
                title={[<h6 className="font-semibold m-0">Gas Leak History</h6>]}
                extra={[
                  <Button type="primary">
                    <span>View all</span>
                  </Button>,
                ]}
            >
              <div className="table-responsive">
                <Table
                    columns={columnsGasLeakHistory}
                    dataSource={arrGasLeakHistory}
                    pagination={false}
                    className="ant-border-space"
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
