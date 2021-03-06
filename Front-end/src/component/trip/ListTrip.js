import React, { Component } from 'react'
import axios from 'axios'
import { Rate, Tooltip, Select } from 'antd'
import './style.scss'
import _ from 'lodash'

const { Option } = Select;

const arr = [0, 1, 2, 3]

export default class Trip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount() {
        this.loadCombobox()
        axios.get('http://localhost:3000/v1/trip/Public')
            .then((res) => {
                if (res.data.success) {
                    const data = res.data.result
                    this.setState({
                        data: data
                    })
                }
            }).catch((err) => {
                console.log("TCL: Trip -> componentDidMount -> err", err)
            })
    }

    async loadCombobox() {
        await axios.get('http://localhost:3000/v1/destination')
            .then((res) => {
                const data = res.data.data
                const destinationOption = []
                data.map(x => {
                    destinationOption.push({
                        value: x._id,
                        label: x.name
                    })
                })
                this.setState({
                    destinationOption: destinationOption
                })
            }).catch((error) => {

            })
    }

    handleChange(value) {
        const me = this
        axios.get('http://localhost:3000/v1/trip/destination/' + value)
            .then((res) => {
                if (res.data.success) {
                    this.setState({
                        data: res.data.result
                    })
                }
            }).catch((err) => {
                console.log("TCL: Trip -> handleChange -> err", err)
            })
    }

    onClick(id, dataEmail) {
        const email = localStorage.getItem('email')
        if (email == dataEmail) {
            window.location.href = "http://localhost:3006/trip-detail-self/" + id
        } else {
            window.location.href = "http://localhost:3006/trip-detail/" + id
        }
    }

    randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    render() {
        const { data, destinationOption } = this.state
        return (
            <div>
                <div className="container destination">
                    <div className="row justify-content-center">
                        <div className="col-md-12 heading-section text-center mb-2">
                            <span className="subheading">Đề xuất</span>
                            <h2 className="mb-2">Lịch trình tạo gần đây</h2>
                        </div>
                    </div>
                    <div className='row'>
                        <div className='col-md-3' style={{ paddingBottom: 30 }}>
                            <Select
                                onChange={(val) => this.handleChange(val)}
                                placeholder={'Địa điểm'}
                                style={{ width: 250 }}
                                readOnly={this.props.readOnly}
                            >
                                {destinationOption && destinationOption.map((x, index) => {
                                    return <Option key={index} value={x.value}>{x.label}</Option>
                                })}
                            </Select>
                        </div>
                        <div className='col-md-9'></div>
                        {(_.isEmpty(data) || data) ? arr.map((x, index) => {
                            if (data[x]) {
                                const number = this.randomIntFromInterval(0, _.size(data[x].images) - 1)
                                console.log("TCL: Trip -> render -> number", x)
                                return (
                                    <div className='col-md-3' style={{
                                        height: '330px',
                                        paddingRight: (index + 1) % 4 == 0 ? '15px' : '0px',
                                        marginBottom: '15px'

                                    }}>
                                        <div className='property-wrap' style={{ backgroundImage: 'no-repeat' }}>
                                            <img className="img" src={"http://localhost:3000/" + data[x].images[number]} style={{
                                                borderRadius: '5px 5px 0px 0px', height: 200, cursor: 'pointer'
                                            }}
                                                onClick={() => this.onClick(data[x]['_id'], data[x].email)} />
                                            <div style={{
                                                height: '100px',
                                                borderRadius: '0px 0px 5px 5px',
                                                border: `solid 1px #d9d9d9 `
                                            }}>
                                                <div className='content destination-card-name' style={{ cursor: 'pointer', fontSize: '15px' }}
                                                    onClick={() => this.onClick(data[x]['_id'], data[x].email)} >
                                                    {data[x].name.split('Lịch trình')[1]}
                                                </div>
                                                <span><Rate style={{
                                                    fontSize: '15px',
                                                    marginLeft: '10px'
                                                }} allowHalf disabled value={data[x].rate} />
                                                </span>
                                                <span className='rate-total'>
                                                    {data[x].count ? data[x].count : 0} người đánh giá
                                            </span>
                                                <Tooltip placement="top" title={'Được tạo bởi ' + data[x].userName}>
                                                    <span className='avatar' style={{
                                                        position: 'absolute',
                                                        right: '15px'
                                                    }}>
                                                        <img style={{ width: '38px', borderRadius: '50%' }} src={data[x].avatar ? 'http://localhost:3000/' + data[x].avatar : '../../images/user.png'} />
                                                    </span>
                                                </Tooltip>
                                                {/* <div style={{ fontSize: '13px', marginLeft: '10px' }}>
                                            {_.truncate(x.location, {
                                                'length': 40,
                                                'separator': " "
                                            })}
                                        </div> */}
                                            </div>
                                        </div>
                                    </div>
                                )
                            }
                        }) : <div style={{ textAlign: 'center' }}>Hiện chưa có lịch trình nào</div>}
                    </div>
                </div>
            </div>
        )
    }
}
