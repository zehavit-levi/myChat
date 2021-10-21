import { Container, Row ,Col, Button, Modal} from 'react-bootstrap';
import { Scrollbars } from 'react-custom-scrollbars';
import {MdSend, MdSave, MdOpenInBrowser, MdOutlineInsertEmoticon} from 'react-icons/md';
import Picker from 'emoji-picker-react';
import './ChatRoom.css';
import { useState } from 'react';
function ChatRoom(props){
 
    const [showEmojiiModal, setShowEmojiiModal] = useState(false);
    const handleClose = () => setShowEmojiiModal(false);
  const handleShow = () => setShowEmojiiModal(true);

  const onEmojiClick = (event, emojiObject) => {
      console.log(props.message + emojiObject.emoji)
    props.setMessage(props.message + emojiObject.emoji);
    handleClose();
  };
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
                    <Scrollbars ><div className="messages">
                    {props.messageList.map((val,key)=>{
                    return (
                      <div className="messageContainer" id={val.author === props.userName ? "You" : "Other"}>
                          <div className="messageIndividual">
                       {val.author === props.userName ? "You":val.author}: {val.message}
                           </div>
                       </div>
                     )})}
                     </div>
                    </Scrollbars>
                </Col>
            </Row>
            <Row className="controllers">
                <Col sm='8'>
                    <input className="messageInputs" value={props.message}  type='text' placeholder='Message...' onChange={(e)=>{props.setMessage(e.target.value);}}/>
                </Col>
                <Col sm='1'>
                    <a type="button" onClick={handleShow} className='emojii'><MdOutlineInsertEmoticon type="icon"/></a>
                </Col>
                <Modal show={showEmojiiModal} onHide={handleClose}>
                     <Modal.Body><Picker show={showEmojiiModal} onHide={handleClose} onEmojiClick={onEmojiClick} /></Modal.Body>
                </Modal>
                <Col sm='1'>
                    <a type="button" className='send' onClick={props.sendMessage}><MdSend type="icon"/></a >
                </Col>
                <Col sm='1'>
                    <a type="button" className='save' onClick={props.saveConversation}><MdSave type="icon"/></a >
                </Col>
                <Col sm='1'>
                    <a type="button" className='open' onClick={props.openConversation}><MdOpenInBrowser type="icon"/></a >
                </Col>
            </Row>
      </Container>
    )
}

export default ChatRoom;