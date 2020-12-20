import React, { Component } from 'react'
import { user_info_update } from '../../requests'
import {
  Card,
  Button,
  Form,
  Input,
  Spin,
  message,
  Radio,
  InputNumber
} from 'antd'

const { TextArea } = Input;
const formItemLayout = {
  labelCol: {
    span: 4
  },
  wrapperCol: {
    span: 16
  }
}
@Form.create()

class Edit extends Component {
  constructor() {
    super()
    this.state = {
      isLoading: false
    }
  }
  handleSubmit = (e) => {
    e.preventDefault()
    this.props.form.validateFields((err, values) => {
      if (!err) {
        this.setState({
          isLoading: true
        })
        //console.log(values)
        user_info_update(values)
          .then((resp) => {
            if (resp.data.data !== "请登录后重试") {
              message.success(resp.data.message)
            }
          })
          .catch((err) => {
            console.log(err)
          })
          .finally(() => {
            this.setState({ isLoading: false })
          })
      }
    })
  }

  render() {
    const {
      getFieldDecorator
    } = this.props.form
    return (
      <Card
        title="更新个人信息"
        bordered={false}
      >
        <Spin spinning={this.state.isLoading}>
          <Form
            onSubmit={this.handleSubmit}
            {...formItemLayout}
          >
            <Form.Item
              label="姓名"
            >

              {getFieldDecorator('userName', {
                rules: [
                  {
                    required: true,
                    message: '姓名是必填的'
                  }
                ]
              })(
                <Input
                  placeholder="姓名"
                />,
              )}
            </Form.Item>
            <Form.Item label="年龄">
              {getFieldDecorator('age', {
                initialValue: 18,
                rules: [
                  {
                    required: true,
                    message: '年龄是必填的'
                  }
                ]
              })
                (<InputNumber min={10} max={30} />)}
            </Form.Item>
            <Form.Item label="性别">
              {getFieldDecorator('gender',
                {
                  rules: [
                    {
                      required: true,
                      message: '性别是必填的'
                    }
                  ]
                })(
                  <Radio.Group >
                    <Radio value={'男'}>男</Radio>
                    <Radio value={'女'}>女</Radio>
                  </Radio.Group>
                )}
            </Form.Item>
            <Form.Item
              label="邮箱地址"
            >
              {getFieldDecorator('email', {
                rules: [
                  {
                    required: true,
                    message: '邮箱是必填的'
                  }, {
                    type: 'email',
                    message: '邮箱格式不正确',
                  },
                ],
              })(
                <Input
                  placeholder="邮箱号码"
                />,
              )}
            </Form.Item>
            <Form.Item
              label="附加信息"
            >
              {getFieldDecorator('introduction', {
                rules: [
                  {
                    required: true,
                    message: '自我介绍是必填的'
                  }
                ],
              })(
                <TextArea
                  rows={8}
                  placeholder="自我介绍"
                />,
              )}
              <Button type="primary" htmlType="submit" style={{ margin: '30px 0px 0px' }}>
                确定更新
            </Button>
            </Form.Item>
          </Form>
        </Spin>
      </Card>
    )
  }
}

export default Edit
