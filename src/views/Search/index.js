import React, { Component } from 'react'
import { Form, message, Menu, Dropdown, Button, Card, Input, Table, Tag } from 'antd';
import { course_search, course_select, } from '../../requests'
import './index.less'
const { Search } = Input;

const ButtonGroup = Button.Group

@Form.create()

class Searchpage extends Component {
  constructor() {
    super()
    this.state = {
      prop: '课程名称查询',
      list: [],
      value: '',
    }
  }

  selectCourse = (record) => {
    course_select({ courseId: record.courseId.toString() })
      .then((resp) => {
        if (resp.data.message === 'success') {
          message.success("成功选课")
          this.newSearch(this.state.value)
        } else if (resp.data.code === 7) {
          message.error("你已经选择了此课程，不能重复选择哦", 2)
        } else if (resp.data.code === 6) {
          message.error("课余量为0", 2)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  newSearch = (value) => {
    let prop = this.state.prop === '课程号查询' ? 'id' : 'name'

    course_search(prop, value)
      .then((resp) => {
        if (resp.data.data !== "请登录后重试") {
          let newlist = resp.data.data.map((item, index) => {
            return {
              ...item,
              key: index
            }
          })
          this.setState({ list: newlist, value: value })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  Search = (value) => {
    let prop = this.state.prop === '课程号查询' ? 'id' : 'name'

    course_search(prop, value)
      .then((resp) => {
        if (resp.data.data !== "请登录后重试") {
          message.success('查询成功', 0.5);
          let newlist = resp.data.data.map((item, index) => {
            return {
              ...item,
              key: index
            }
          })
          this.setState({ list: newlist, value: value })
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }
  componentDidMount(){
    this.Search("")
  }

  render() {

    const columns = [
      {
        title: '课程号',
        dataIndex: 'courseId',
        key: 'courseId',
      },
      {
        title: '课序号',
        dataIndex: 'courseIndex',
        key: 'courseIndex',
      },
      {
        title: '课程名称',
        dataIndex: 'courseName',
        key: 'courseName',
      },
      {
        title: '课剩余数量',
        key: 'remainNum',
        dataIndex: 'remainNum',
        render: tag => (
          <span>
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          </span>
        )
      },
      {
        title: '选课人数',
        key: 'selectNum',
        dataIndex: 'selectNum',
        render: tag => (
          <span>
            <Tag color="blue" key={tag}>
              {tag}
            </Tag>
          </span>
        )
      }, 
      {
        title: '操作',
        key: 'action',
        render: (text, record) => {
          return (
            record.remainNum > 0
              ?
              <ButtonGroup>
                <Button size="small" type="primary" onClick={this.selectCourse.bind(this, record)} >选课</Button>
              </ButtonGroup>
              :
              <span>
                <Tag color="red" key={record.courseId}>
                  课余量为0
                </Tag>
              </span>
          )
        }
      }
    ];
    const menu = (
      <Menu onClick={({ item }) => this.setState({ prop: item.props.children })}>
        <Menu.Item>
          课程号查询
        </Menu.Item>
        <Menu.Item>
          课程名称查询
        </Menu.Item>
      </Menu>
    );
    return (
      <>
        <Dropdown overlay={menu} placement="bottomCenter">
          <Button>{this.state.prop}</Button>
        </Dropdown>
        <Search
          style={{ margin: "15px 0px 0px" }}
          placeholder="课程号或者课程名称"
          enterButton="Search"
          size="default"
          onSearch={value => this.Search(value)}
        />
        <Card
          title="搜索结果"
          bordered={false}
        //style={{ margin: '0px'  }}
        >
          <Table
            tableLayout='fixed'
            size="small"
            dataSource={this.state.list} columns={columns}
            pagination={{
              total: this.state.list.length,
              pageSize: 8
            }}
          />
        </Card>
      </>
    )
  }
}
export default Searchpage