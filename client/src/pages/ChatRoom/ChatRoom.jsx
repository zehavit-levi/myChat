import { Container, Row ,Col, Button} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import Picker from 'emoji-picker-react';
import './ChatRoom.css'
import { useState } from 'react';
function ChatRoom(props){
 
    return(
        <Container className='chatRoomContainer'>
            <Row className="usersandchatrow">
                <Col sm='3' className="chatUsersList">
                    {props.usersList.map((val,key)=>{
                        return(
                         <div>{val}</div>
                      )
                  })}
                </Col>
                <Col sm='9' className="chatContainer">
                    <Scrollbars ><Row className="messages">
                    {props.messageList.map((val,key)=>{
                    return (
                      <Col className="messageContainer" id={val.author === props.userName ? "You" : "Other"}>
                          <Row className="messageIndividual flex-shrink-1">
                       {val.author === props.userName ? "You":val.author}: {val.message}
                           </Row>
                       </Col>
                     )})}
                     </Row>
                    </Scrollbars>
                </Col>
            </Row>
            <Row className="controllers">
                <Col sm='5'>
                    <input className="messageInputs"  type='text' placeholder='Message...' onChange={(e)=>{props.setMessage(e.target.value);}} />
                </Col>
                <Col sm='2'>
                    <Button  onClick={props.sendMessage}>Send</Button >
                </Col>
                <Col sm='2'>
                    <Button  onClick={props.saveConversation}>Save</Button >
                </Col>
                <Col sm='2'>
                    <Button  onClick={props.openConversation}>Open</Button >
                </Col>
            </Row>
      </Container>
    )
}

export default ChatRoom;