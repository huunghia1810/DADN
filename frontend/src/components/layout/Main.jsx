import queryString from 'query-string'
import _ from 'lodash'

import React, { useState, useEffect } from 'react'
import {useLocation, useParams} from 'react-router-dom'
import {useDispatch, useSelector} from 'react-redux'

import { Layout, Drawer, Affix } from 'antd'
import Sidenav from './Sidenav'
import Header from './Header'
import Footer from './Footer'

//----------import pages---------------
import Home from './../../pages/Home'
import Tables from './../../pages/Tables'
import DeviceList from './../../pages/DeviceList'
import DeviceForm from './../../pages/DeviceForm'
import MyProfile from './../../pages/MyProfile'
import Settings from './../../pages/Settings'
import Help from './../../pages/Help'
import SignOut from './../../pages/SignOut'
import PageNotFound from './../layout/PageNotFound/PageNotFound'

//import SideBar from './../../components/SideBar/SideBar'

const { Header: AntHeader, Content, Sider } = Layout

function Main({ children }) {
  const { entity, action } = useParams()

  const User = useSelector(state => state.User) || {}

  useEffect(() => {
    if(Object.keys(User.authInfo).length) {
      console.log('Auth Info______________', User)
    }
  },[User])

  const [childComponent, setChildComponent] = useState(false)
  const [visible, setVisible] = useState(false)
  const [placement, setPlacement] = useState('right')
  const [sidenavColor, setSidenavColor] = useState('#1890ff')
  const [sidenavType, setSidenavType] = useState('transparent')
  const [fixed, setFixed] = useState(false)

  const openDrawer = () => setVisible(!visible)
  const handleSidenavType = (type) => setSidenavType(type)
  const handleSidenavColor = (color) => setSidenavColor(color)
  const handleFixedNavbar = (type) => setFixed(type)

  let { pathname } = useLocation()
  //pathname = pathname.replace('/', '')

  useEffect(() => {
    handleUpdateMainContent()
  },[])

  useEffect(() => {
    handleUpdateMainContent()
  },[entity, action])
  
  useEffect(() => {
    if (pathname === 'rtl') {
      setPlacement('left')
    } else {
      setPlacement('right')
    }
  }, [pathname])

  const handleUpdateMainContent = () => {
    let mainComponent = null
    switch (entity) {
      case 'dashboard':
        mainComponent = <Home></Home>
        break
      case 'tables':
        mainComponent = <Tables></Tables>
        break
      case 'devices':
        if(_.isUndefined(action) || (!_.isUndefined(action) && action === 'list')) {
          mainComponent = <DeviceList></DeviceList>
        }else if(action === 'add') {
          mainComponent = <DeviceForm></DeviceForm>
        }
        break
      case 'my-profile':
        mainComponent = <MyProfile></MyProfile>
        break
      case 'settings':
        mainComponent = <Settings></Settings>
        break
      case 'help':
        mainComponent = <Help></Help>
        break
      case 'sign-out':
        mainComponent = <SignOut></SignOut>
        break
      default:
        mainComponent = <PageNotFound></PageNotFound>
        break
    }
    if(mainComponent === null) {
      mainComponent = <PageNotFound></PageNotFound>
    }
    setChildComponent(mainComponent)
  }
  
  return (
    <Layout
      className={`layout-dashboard ${
        pathname === 'profile' ? 'layout-profile' : ''
      } ${pathname === 'rtl' ? 'layout-dashboard-rtl' : ''}`}
    >
      <Drawer
        title={false}
        placement={placement === 'right' ? 'left' : 'right'}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === 'right' ? 'left' : 'right'}
        width={250}
        className={`drawer-sidebar ${
          pathname === 'rtl' ? 'drawer-sidebar-rtl' : ''
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === 'rtl' ? 'layout-dashboard-rtl' : ''
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme='light'
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === '#fff' ? 'active-route' : ''
            }`}
            style={{ background: sidenavType }}
          >
            <Sidenav color={sidenavColor} />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint='lg'
        collapsedWidth='0'
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type)
        }}
        trigger={null}
        width={250}
        theme='light'
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === '#fff' ? 'active-route' : ''
        }`}
        style={{ background: sidenavType }}
      >
        <Sidenav color={sidenavColor} />
      </Sider>
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? 'ant-header-fixed' : ''}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
            />
          </AntHeader>
        )}
        <Content className='content-ant'>
          {/*{children}*/}
          {childComponent !== null ? childComponent : ''}
        </Content>
        <Footer />
      </Layout>
    </Layout>
  )
}

export default Main
