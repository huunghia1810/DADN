import { useState, useEffect } from 'react'
import moment from 'moment'
import 'moment/locale/vi'

import {useDispatch, useSelector} from 'react-redux'

import feathersClient from './../../feathersClient'

import {
  Row, Col, Breadcrumb, Badge, Dropdown, Button, List,
  Avatar, Input, Drawer, Typography, Switch, Menu, message,
} from 'antd'

import {
  SearchOutlined,
  StarOutlined,
  TwitterOutlined,
  FacebookFilled,
} from '@ant-design/icons'

import { NavLink, Link } from 'react-router-dom'
import styled from 'styled-components'
import notifyWarning from '../../assets/images/warning-2.png'
import defaultAvatar from '../../assets/images/user.png'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSignOut } from '@fortawesome/free-solid-svg-icons'

//----------import constants---------------
import * as constantNotification from '../../constants/Notification'

//----------import actions---------------
import ActionNotification from '../../actions/Notification'
import ActionUser from '../../actions/User'

const ButtonContainer = styled.div`
  .ant-btn-primary {
    background-color: #1890ff
  }
  .ant-btn-success {
    background-color: #52c41a
  }
  .ant-btn-yellow {
    background-color: #fadb14
  }
  .ant-btn-black {
    background-color: #262626
    color: #fff
    border: 0px
    border-radius: 5px
  }
  .ant-switch-active {
    background-color: #1890ff
  }
`
const bell = [
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    key={0}
  >
    <path
      d='M10 2C6.68632 2 4.00003 4.68629 4.00003 8V11.5858L3.29292 12.2929C3.00692 12.5789 2.92137 13.009 3.07615 13.3827C3.23093 13.7564 3.59557 14 4.00003 14H16C16.4045 14 16.7691 13.7564 16.9239 13.3827C17.0787 13.009 16.9931 12.5789 16.7071 12.2929L16 11.5858V8C16 4.68629 13.3137 2 10 2Z'
      fill='#111827'
    ></path>
    <path
      d='M10 18C8.34315 18 7 16.6569 7 15H13C13 16.6569 11.6569 18 10 18Z'
      fill='#111827'
    ></path>
  </svg>,
]
const clockicon = [
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    key={0}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M10 18C14.4183 18 18 14.4183 18 10C18 5.58172 14.4183 2 10 2C5.58172 2 2 5.58172 2 10C2 14.4183 5.58172 18 10 18ZM11 6C11 5.44772 10.5523 5 10 5C9.44772 5 9 5.44772 9 6V10C9 10.2652 9.10536 10.5196 9.29289 10.7071L12.1213 13.5355C12.5118 13.9261 13.145 13.9261 13.5355 13.5355C13.9261 13.145 13.9261 12.5118 13.5355 12.1213L11 9.58579V6Z'
      fill='#111827'
    ></path>
  </svg>,
]
const logsetting = [
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    key={0}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z'
      fill='#111827'
    ></path>
  </svg>,
]
const toggler = [
  <svg
    width='20'
    height='20'
    xmlns='http://www.w3.org/2000/svg'
    viewBox='0 0 448 512'
    key={0}
  >
    <path d='M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z'></path>
  </svg>,
]
const setting = [
  <svg
    width='20'
    height='20'
    viewBox='0 0 20 20'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    key={0}
  >
    <path
      fillRule='evenodd'
      clipRule='evenodd'
      d='M11.4892 3.17094C11.1102 1.60969 8.8898 1.60969 8.51078 3.17094C8.26594 4.17949 7.11045 4.65811 6.22416 4.11809C4.85218 3.28212 3.28212 4.85218 4.11809 6.22416C4.65811 7.11045 4.17949 8.26593 3.17094 8.51078C1.60969 8.8898 1.60969 11.1102 3.17094 11.4892C4.17949 11.7341 4.65811 12.8896 4.11809 13.7758C3.28212 15.1478 4.85218 16.7179 6.22417 15.8819C7.11045 15.3419 8.26594 15.8205 8.51078 16.8291C8.8898 18.3903 11.1102 18.3903 11.4892 16.8291C11.7341 15.8205 12.8896 15.3419 13.7758 15.8819C15.1478 16.7179 16.7179 15.1478 15.8819 13.7758C15.3419 12.8896 15.8205 11.7341 16.8291 11.4892C18.3903 11.1102 18.3903 8.8898 16.8291 8.51078C15.8205 8.26593 15.3419 7.11045 15.8819 6.22416C16.7179 4.85218 15.1478 3.28212 13.7758 4.11809C12.8896 4.65811 11.7341 4.17949 11.4892 3.17094ZM10 13C11.6569 13 13 11.6569 13 10C13 8.34315 11.6569 7 10 7C8.34315 7 7 8.34315 7 10C7 11.6569 8.34315 13 10 13Z'
      fill='#111827'
    ></path>
  </svg>,
]
const notifyTitleMaxLength = 25

const Header = props => {

  const {
    placement,
    name,
    subName,
    onPress,
    handleSidenavColor,
    handleSidenavType,
    handleFixedNavbar,
  } = props

  const { Title, Text } = Typography

  const dispatch = useDispatch()
  const { authInfo } = useSelector(state => state.User) || {}
  const StoreNotification = useSelector(state => state.Notification) || {}

  const [visible, setVisible] = useState(false)
  const [data, setData] = useState([])
  const [totalUnread, setTotalUnread] = useState(0)
  const [sidenavType, setSidenavType] = useState('transparent')

  const showDrawer = () => setVisible(true)
  const hideDrawer = () => setVisible(false)

  useEffect(() => {
    dispatch(ActionNotification.getListNotifications())
    dispatch(ActionNotification.getListNotifications(constantNotification.NOTIFICATION_GET_TYPE_UNREAD))
    feathersClient.service('notifications')
      .on('created', message => {
        handleListenNotifications(message)
      })
      .on('updated', message => {
        handleListenNotifications(message)
      })
      .on('patched', message => {
        handleListenNotifications(message)
      })
  },[])

  useEffect(() => {
    const arrNewNotifications = []
    StoreNotification.listNotifications.map(curNotify => {
      //prepare description
      const strDesc = moment(curNotify.createdAt).locale('vi').fromNow()

      arrNewNotifications.push({
        key: curNotify.id,
        title: curNotify.content.length > notifyTitleMaxLength ? `${curNotify.content.substring(0, notifyTitleMaxLength)}...` : curNotify.content,
        description: <>{clockicon} {strDesc}</>,
        avatar: notifyWarning,
        unread: curNotify.status === constantNotification.NOTIFICATION_GET_TYPE_UNREAD,
      })
    })
    setData(arrNewNotifications)
    setTotalUnread(StoreNotification.totalUnread || 0)
  },[StoreNotification])
  useEffect(() => window.scrollTo(0, 0))

  const handleListenNotifications = (message) => {
    if(message.createdBy === authInfo.user.id) {
      //fetch notifications
      dispatch(ActionNotification.getListNotifications())
      dispatch(ActionNotification.getListNotifications(constantNotification.NOTIFICATION_GET_TYPE_UNREAD))
    }
  }

  const handleClickNotify = (objNotify) => {
    dispatch(ActionNotification.updateNotify({id: objNotify.key, data: {status: 'read'}}))
  }

  const handleLogout = () => {
    dispatch(ActionUser.signOut())
  }

  //------------------------render section----------------------------------
  //------------------------render section----------------------------------
  const htmlNotificationsMenu = (
    <List
      min-width='100%'
      className='list-notifications header-notifications-dropdown '
      itemLayout='horizontal'
      dataSource={data}
      renderItem={item => (
        <List.Item
          onClick={() => handleClickNotify(item)}
          key={item.key}
          className={item.unread ? 'item-unread' : null}
        >
          <List.Item.Meta
            avatar={<Avatar shape='square' src={item.avatar} />}
            title={item.title}
            description={item.description}
          />
        </List.Item>
      )}
    />
  )

  const userMenu = (
    <List
      min-width='100%'
      className='user-logout header-notifications-dropdown '
      itemLayout='horizontal'
      dataSource={[{title: 'Logout', key: 'Logout'}]}
      renderItem={item => (
        <List.Item
          onClick={() => handleLogout()}
          key={item.key}
        >
          <List.Item.Meta
            avatar={<FontAwesomeIcon icon={faSignOut} />}
            title={item.title}
          />
        </List.Item>
      )}
    />
  )

  return (
    <>
      <div className='setting-drwer' onClick={showDrawer}>
        {setting}
      </div>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to='/'>Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item style={{ textTransform: 'capitalize' }}>
              {name.replace('/', '')}
            </Breadcrumb.Item>
          </Breadcrumb>
          <div className='ant-page-header-heading'>
            <span
              className='ant-page-header-heading-title'
              style={{ textTransform: 'capitalize' }}
            >
              {subName.replace('/', '')}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className='header-control'>
          <Badge size='small' count={totalUnread}>
            <Dropdown overlay={htmlNotificationsMenu} trigger={['click']}>
              <a href=''
                className='ant-dropdown-link'
                onClick={(e) => e.preventDefault()}
              >
                {bell}
              </a>
            </Dropdown>
          </Badge>
          {/*<Button type='link' onClick={showDrawer}>
            {logsetting}
          </Button>
          <Button
            type='link'
            className='sidebar-toggler'
            onClick={() => onPress()}
          >
            {toggler}
          </Button>
          <Drawer
            className='settings-drawer'
            mask={true}
            width={360}
            onClose={hideDrawer}
            placement={placement}
            visible={visible}
          >
            <div layout='vertical'>
              <div className='header-top'>
                <Title level={4}>
                  Configurator
                  <Text className='subtitle'>See our dashboard options.</Text>
                </Title>
              </div>

              <div className='sidebar-color'>
                <Title level={5}>Sidebar Color</Title>
                <div className='theme-color mb-2'>
                  <ButtonContainer>
                    <Button
                      type='primary'
                      onClick={() => handleSidenavColor('#1890ff')}
                    >
                      1
                    </Button>
                    <Button
                      type='success'
                      onClick={() => handleSidenavColor('#52c41a')}
                    >
                      1
                    </Button>
                    <Button
                      type='danger'
                      onClick={() => handleSidenavColor('#d9363e')}
                    >
                      1
                    </Button>
                    <Button
                      type='yellow'
                      onClick={() => handleSidenavColor('#fadb14')}
                    >
                      1
                    </Button>

                    <Button
                      type='black'
                      onClick={() => handleSidenavColor('#111')}
                    >
                      1
                    </Button>
                  </ButtonContainer>
                </div>

                <div className='sidebarnav-color mb-2'>
                  <Title level={5}>Sidenav Type</Title>
                  <Text>Choose between 2 different sidenav types.</Text>
                  <ButtonContainer className='trans'>
                    <Button
                      type={sidenavType === 'transparent' ? 'primary' : 'white'}
                      onClick={() => {
                        handleSidenavType('transparent')
                        setSidenavType('transparent')
                      }}
                    >
                      TRANSPARENT
                    </Button>
                    <Button
                      type={sidenavType === 'white' ? 'primary' : 'white'}
                      onClick={() => {
                        handleSidenavType('#fff')
                        setSidenavType('white')
                      }}
                    >
                      WHITE
                    </Button>
                  </ButtonContainer>
                </div>
                <div className='fixed-nav mb-2'>
                  <Title level={5}>Navbar Fixed </Title>
                  <Switch onChange={(e) => handleFixedNavbar(e)} />
                </div>
                <div className='ant-docment'>
                  <ButtonContainer>
                    <Button type='black' size='large'>
                      FREE DOWNLOAD
                    </Button>
                    <Button size='large'>VIEW DOCUMENTATION</Button>
                  </ButtonContainer>
                </div>
                <div className='viewstar'>
                  <a href='#dadn'>{<StarOutlined />} Star</a>
                  <a href='#dadn'> 190</a>
                </div>

                <div className='ant-thank'>
                  <Title level={5} className='mb-2'>
                    Thank you for sharing!
                  </Title>
                  <ButtonContainer className='social'>
                    <Button type='black'>{<TwitterOutlined />}TWEET</Button>
                    <Button type='black'>{<FacebookFilled />}SHARE</Button>
                  </ButtonContainer>
                </div>
              </div>
            </div>
          </Drawer>*/}
          <Dropdown overlay={userMenu} trigger={['click']}>
            <div className='btn-sign-in'>
              <img src={defaultAvatar} />&nbsp;
              <span>{authInfo.user.fullName || ' '}</span>
            </div>
          </Dropdown>
          {/*<Link to='/sign-in' className='btn-sign-in'>*/}
          {/*  <img src={defaultAvatar} />&nbsp;*/}
          {/*  <span>{authInfo.user.fullName || ' '}</span>*/}
          {/*</Link>*/}
          <Input
            className='header-search'
            placeholder='Type here...'
            prefix={<SearchOutlined />}
          />
        </Col>
      </Row>
    </>
  )
}

export default Header
