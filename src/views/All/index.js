import React, { Component } from 'react'
import { Card, Table, Spin, Button, Form, message } from 'antd';
import { course_personal, course_delete } from '../../requests'

const ButtonGroup = Button.Group

@Form.create()

class All extends Component {
    constructor() {
        super()
        this.state = {
            list: [],
            hasMore: false,
            offset: 0,
            isLoading: true,
        }
    }

    getDate = () => {
        this.setState({ isLoading: true })
        course_personal()
            .then((resp) => {
                if (resp.data.data !== "请登录后重试") {
                    let newlist = resp.data.data.map((item, index) => {
                        return {
                            ...item,
                            key: index
                        }
                    })
                    this.setState({ list: newlist })
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.setState({ isLoading: false })
            })
    }

    deleteCourse = (record) => {
        this.setState({ isLoading: true })
        course_delete({courseId : record.courseId.toString()})
            .then((resp) => {
                if (resp.data.data !== "请登录后重试") {
                    message.success("课程删除成功",1)
                    this.getDate()
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.setState({ isLoading: false })
            })
    }


    componentDidMount() {
        this.getDate()
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
            }, {
                title: '操作',
                key: 'action',
                render: (text, record) => {
                    return (
                        <ButtonGroup>
                            <Button size="small" type="danger" onClick={this.deleteCourse.bind(this,record)} >删除</Button>
                        </ButtonGroup>
                    )
                }
            }
        ];
        return (
            <div>
                <Card
                    title="课程列表"
                    bordered={false}
                >
                    <Spin spinning={this.state.isLoading}>
                        <Table
                            size="small"
                            dataSource={this.state.list} columns={columns}
                            tableLayout='fixed'
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
export default All