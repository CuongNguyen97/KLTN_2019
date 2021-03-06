import { Card, Tooltip, Form, Input } from 'antd';
import _ from 'lodash';
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import styled from 'styled-components';
import './style.scss';
import { red } from 'ansi-colors';

const TaskList = styled.div`
  padding: 8px;
  transition: background-color 0.2s ease;
  background-color: ${props =>
        props.isDraggingOver ? 'lightgrey' : 'white'}
  flex-grow: 1;
  min-height: 100px;
`

const Container = styled.div`
  transition: background-color 0.2s ease;
  background-color: ${props =>
        props.isDragDisabled
            ? 'lightgrey'
            : props.isDragging
                ? 'white'
                : 'white'};
`

const format = 'HH:mm';
export default class CardSwap extends React.Component {

    onBlur() {
        const { index, listSpot } = this.props
        // const data = this.props.getDatafromInput()
        const dataInput = this.inputRef.state.value
        if (!_.isEmpty(dataInput)) {
            const hourAndMinute = listSpot[index].startTime
            let newTime = hourAndMinute.split(':')
            let hour = parseInt(newTime[0]) * 60
            let minute = parseInt(newTime[1])
            let _newTime = hour + minute
            if (index != listSpot.length - 1) {
                let timeReverse = _newTime + parseInt(dataInput) + listSpot[index].spotTime
                let hourReverse = Math.floor(timeReverse / 60)
                let minuteReverse = timeReverse % 60;
                if (minuteReverse < 10) {
                    minuteReverse = "0" + minuteReverse
                }
                listSpot[index + 1].startTime = hourReverse + ':' + minuteReverse
            }
            this.props.renderData()
        }

    }

    render() {
        const {
            text,
            isBottomItem = false,
            stayTime,
            spotTime,
            length,
            startTime,
            image,
            indexParent,
            formItemLayout,
            getFieldDecorator,
            dataRemain
        } = this.props;
        let hoursStay = null
        let hoursSpot = null
        let minutesStay = null
        let minutesSpot = null
        if (stayTime) {
            hoursStay = Math.floor(stayTime / 60);
            minutesStay = stayTime % 60;
        }
        if (spotTime) {
            hoursSpot = Math.floor(spotTime / 60);
            minutesSpot = spotTime % 60;
        }

        if (!dataRemain) {
            return (
                <Draggable
                    draggableId={this.props.id}
                    index={this.props.index}
                >
                    {(provided, snapshot) => (
                        <Container
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                        >
                            <div className='trip'>
                                <div className='card-swap'>
                                    <Card
                                        ref={c => this.cardRef = c}
                                        style={{ height: 105, borderRadius: '5px', boxShadow: '0 3px 6px 0 rgba(0,0,0,0.16)' }}>
                                        <span>
                                            <img alt="picture"
                                                style={{ width: 100, height: 105 }} src={image ? ("http://localhost:3000/" + image) : ''} />
                                        </span>

                                        <span >
                                            <Tooltip placement="top" title={text}>
                                                <div style={{ marginTop: -10, fontSize: 19, fontWeight: 'bold', paddingBottom: 5, position: 'absolute', top: 30, left: 115, }}>
                                                    {_.truncate(text, {
                                                        'length': 20,
                                                        'separator': " "
                                                    })}
                                                </div>
                                            </Tooltip>
                                            <span className='spot-time' style={{ color: 'red', paddingLeft: 'unset', position: 'absolute', top: 0, right: 5, fontSize: 14 }}>{startTime}</span>
                                            {!isBottomItem ?
                                                <div className='spot-time' style={{
                                                    position: 'absolute',
                                                    top: 50,
                                                    right: -88
                                                }}>
                                                    <Form.Item  {...formItemLayout} label='Thời gian lưu trú'>
                                                        {getFieldDecorator(indexParent + '_' + this.props.index)(<Input ref={c => this.inputRef = c} readOnly={this.props.readOnly} onBlur={() => this.onBlur()} />)}
                                                    </Form.Item>
                                                    <div style={{
                                                        position: 'absolute',
                                                        top: '8px',
                                                        right: '100px'
                                                    }}>phút</div>
                                                </div> : ''}
                                        </span>
                                    </Card>
                                    {!isBottomItem ? <div className='to-next-item'>
                                        <div className='travel-info'>
                                            <img src={"../../images/car.svg"} />
                                            <div>{length} km | {hoursSpot != 0 && (hoursSpot + ' giờ ')}{minutesSpot + " phút"}</div>
                                        </div>
                                    </div> : ''}
                                </div>
                            </div>
                        </Container>
                    )}
                </Draggable>
            )
        } else {
            return (
                <Draggable
                    draggableId={this.props.id}
                    index={this.props.index}
                >
                    {(provided, snapshot) => (
                        <Container
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            ref={provided.innerRef}
                            isDragging={snapshot.isDragging}
                        >
                            <div className='card-swap'>
                                <Card
                                    ref={c => this.cardRef = c}
                                    style={{ height: 105, borderRadius: '5px', boxShadow: '0 3px 6px 0 rgba(0,0,0,0.16)', marginBottom: 15 }}>
                                    <span>
                                        <img alt="picture"
                                            style={{ width: 100, height: 105 }} src={image ? ("http://localhost:3000/" + image) : ''} />
                                    </span>
                                    <span >
                                        <Tooltip placement="top" title={text}>
                                            <div style={{ marginTop: -10, fontSize: 19, fontWeight: 'bold', paddingBottom: 5, position: 'absolute', top: 20, left: 115, }}>
                                                {_.truncate(text, {
                                                    'length': 20,
                                                    'separator': " "
                                                })}
                                            </div>
                                        </Tooltip>
                                    </span>
                                </Card>
                            </div>
                        </Container>
                    )}
                </Draggable>
            )
        }
    }
}


