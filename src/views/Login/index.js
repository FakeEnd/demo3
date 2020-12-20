import React, { Component } from 'react'
import { Form, Icon, Input, Button, Card } from 'antd';
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { login } from '../../actions/user'

import './login.less'

const mapState = state => ({
  isLogin: state.user.isLogin,
  isLoading: state.user.isLoading
})

@connect(mapState, { login })
@Form.create()
class Login extends Component {
  handleSubmit = e => {
    e.preventDefault();
    this.props.form.validateFields((err, values) => {
      //console.log(values)
      if (!err) {
        this.props.login(values)
      }
    })
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    return (
      this.props.isLogin
        ?
        <Redirect to='/admin' />
        :
        <>
          <Card
            title="登录界面"
            className="login-style"
          >
            <Form onSubmit={this.handleSubmit} className="login-form">
              <Form.Item>
                {getFieldDecorator('username', {
                  rules: [{ required: true, message: '学工号/统一身份认证ID' }],
                })(
                  <Input
                    disabled={this.props.isLoading}
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                {getFieldDecorator('password', {
                  rules: [{ required: true, message: '统一身份认证密码' }],
                })(
                  <Input
                    disabled={this.props.isLoading}
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
                    placeholder="密码"
                  />,
                )}
              </Form.Item>
              <Form.Item>
                <Button loading={this.props.isLoading} type="primary" htmlType="submit" >
                  登录
            </Button>
              </Form.Item>
            </Form>      
          </Card>
          <p className="login-footer">Copyright  2019-2020 山东大学软工郭常瑞 All Rights Reserved.</p>
        </>
    )
  }
}

export default Login