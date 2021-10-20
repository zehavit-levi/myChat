import { Container, Row ,Col} from 'react-bootstrap';
import './ChatRoom.css'
function ChatRoom(props){
    return(
        <Container className='chatRoomContainer'>
            <Row>
                <Col className="chatUsersList">
                    {props.usersList.map((val,key)=>{
                        return(
                         <div>{val}</div>
                      )
                  })}
                </Col>
                <Col className="chatContainer">
                    <Row className="messages">
                    {props.messageList.map((val,key)=>{
                    return (
                      <Col className="messageContainer" id={val.author === props.userName ? "You" : "Other"}>
                          <Row className="messageIndividual">
                       {val.author === props.userName ? "You":val.author}: {val.message}
                           </Row>
                       </Col>
                     )})}
                    </Row>
                </Col>
            </Row>
            <Row className="controllers">
                <Col sm='6'>
                    <input className="messageInputs"  type='text' placeholder='Message...' onChange={(e)=>{props.setMessage(e.target.value);}} />
                </Col>
                <Col sm='2'>
                    <button onClick={props.sendMessage}>Send</button>
                </Col>
                <Col sm='2'>
                    <button onClick={props.saveConversation}>Save</button>
                </Col>
                <Col sm='2'>
                    <button onClick={props.openConversation}>Open</button>
                </Col>
            </Row>
      </Container>
    )
}

export default ChatRoom;