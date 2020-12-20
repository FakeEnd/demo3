import React, { Component } from 'react'
import { Card, Row, Descriptions, Spin, Table, Typography, Divider, Form } from 'antd';
import { user_info, social_work, course_grade } from '../../requests'

const { Paragraph } = Typography;
@Form.create()

class Person extends Component {
    constructor() {
        super()
        this.state = {
            sociallist: [],
            scorelist:[],
            isLoading: true,
            personName: "金俊儒",
            sex: "男",
            age: "18",
            emailaddress: "954839106@qq.com",
            Introduction: "",
            studentNumber: "",
        }
    }

    getDate = () => {
        user_info()
            .then((resp) => {
                if (resp.data.data !== "请登录后重试") {
                    let requestData = resp.data.data;
                    let gender = requestData.gender === 1 ? '女' : '男';
                    this.setState({
                        personName: requestData.userName,
                        sex: gender,
                        age: requestData.age,
                        emailaddress: requestData.email,
                        Introduction: requestData.introduction,
                    })
                }
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.setState({ isLoading: false })
            })

        social_work()
            .then((resp) => {
                //console.log(resp)
                let newlist = resp.data.data.map((item, index) => {
                    return {
                        ...item,
                        key: index
                    }
                })
                this.setState({ sociallist: newlist })
            })
            .catch((err) => {
                console.log(err)
            })
            .finally(() => {
                this.setState({ isLoading: false })
            })

        course_grade()
            .then((resp) => {
                //console.log(resp)
                let newlist = resp.data.data.map((item, index) => {
                    return {
                        ...item,
                        key: index
                    }
                })
                this.setState({ scorelist: newlist })
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

        const Content = ({ children, extraContent }) => (
            <Row className="content" type="flex">
                <div className="main" style={{ flex: 1 }}>
                    {children}
                </div>
                <div
                    className="extra"
                    style={{
                        marginLeft: 80,
                    }}
                >
                    {extraContent}
                </div>
            </Row>
        );

        const content = (
            <>
                <Paragraph>
                    {this.state.Introduction}
                </Paragraph>
            </>
        );

        const scorecolumns = [
            // {
            //     title: '成绩唯一识别Id',
            //     dataIndex: 'gradeId',
            //     key: 'gradeId',
            // },
            // {
            //     title: '用户唯一识别Id',
            //     dataIndex: 'userId',
            //     key: 'userId',
            // }, 
            {
                title: '课程唯一识别Id',
                dataIndex: 'courseId',
                key: 'courseId',
            },{
                title: '课程名称',
                dataIndex: 'courseName',
                key: 'courseName',
            },{
                title: '绩点',
                dataIndex: 'gradePoint',
                key: 'gradePoint',
            },{
                title: '排名',
                dataIndex: 'rank',
                key: 'rank',
            }
        ];

        const socialcolumns = [
            {
                title: '社会成果Id',
                dataIndex: 'socialWorkId',
                key: 'socialWorkId',
            },
            {
                title: '姓名',
                dataIndex: 'socialWorkName',
                key: 'socialWorkName',
            }, {
                title: '获得成果的时间',
                dataIndex: 'date',
                key: 'date',
            },{
                title: '时长',
                dataIndex: 'hour',
                key: 'hour',
            }
        ];
        return (
            <div>
                <Card
                    title="个人信息主页"
                    bordered={false}
                >
                    <Descriptions size="small" column={2}>
                        <Descriptions.Item label="姓名">{this.state.personName}</Descriptions.Item>
                        <Descriptions.Item label="性别">{this.state.sex}</Descriptions.Item>
                        <Descriptions.Item label="年龄">{this.state.age}</Descriptions.Item>
                        {/* <Descriptions.Item label="学号">{this.state.studentNumber}</Descriptions.Item> */}
                        <Descriptions.Item label="邮箱地址">
                            {this.state.emailaddress}
                        </Descriptions.Item>
                    </Descriptions>
                    <Divider orientation="left">个人简介</Divider>
                    <Content
                        extraContent={
                            <img
                                src="https://www.sc.sdu.edu.cn/__local/0/BF/BE/EE3BAC2840672689D10E34C3D13_3EA996CA_F40E.jpg"
                                alt="content"
                                width="200px"
                            />
                        }
                    >
                        {content}
                    </Content>
                    <Spin spinning={this.state.isLoading}>
                        <Divider orientation="left">个人成绩列表</Divider>
                        <Table
                            size="small"
                            dataSource={this.state.scorelist} columns={scorecolumns}
                            tableLayout='fixed'
                            pagination={false}
                        />
                        <Divider orientation="left">社会成果列表</Divider>
                        <Table
                            size="small"
                            dataSource={this.state.sociallist} columns={socialcolumns}
                            tableLayout='fixed'
                            pagination={false}
                        />
                    </Spin>
                </Card>
            </div>
        )
    }
}
export default Person