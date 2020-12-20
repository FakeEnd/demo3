import React, { Component } from 'react'
import { Layout, Menu, Icon } from 'antd'
import { withRouter } from 'react-router-dom'
import { adminRoutes } from '../../routes'
import './index.less'
const { Header, Content, Footer } = Layout

@withRouter

class Frame extends Component {

  onMenuClick = ({ key }) => {
    this.props.history.push(key)
  }

  render() {
    return (
      <Layout className="layout" style={{ minHeight: '100%', height: '40px' }}>
        <Header style={{ height: '45px',padding:'0px 20px' }}>
          <div
          className="logo"/>
          <Menu
            theme="dark"
            mode="horizontal"
            selectedKeys={[this.props.location.pathname]}
            style={{ lineHeight: '45px' }}
            onClick={this.onMenuClick}
          >
            {
              adminRoutes.map(item => {
                return (
                  <Menu.Item key={item.pathname}>
                    <Icon type={item.icon} />
                    {item.title}
                  </Menu.Item>
                )
              })
            }
          </Menu>
        </Header>
        <Content style={{ padding: '0px 20px', margin: '20px 0px 0px ', height: '100%' }}>
          <div style={{ background: '#fff', padding: "10px 10px", minHeight: '100%' }}>{this.props.children}</div>
          <Footer style={{ textAlign: 'center', backgroundColor: '#F2F2F2' }}>Copyright  2019-2020 山东大学软工郭常瑞 All Rights Reserved. </Footer>
        </Content>

      </Layout>
    )
  }
}
export default Frame
