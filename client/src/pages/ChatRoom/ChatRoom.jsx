import './ChatRoom.css'
function ChatRoom(props){
    return(
        <div className="chatRoomContainer">
            <div className="chatUsersList">
                {props.usersList.map((val,key)=>{
                    return(
                        <div>{val}</div>
                    )
                })}
            </div>
            <div className="chatContainer">
            <div className="messages">
             {props.messageList.map((val,key)=>{
              return (
               <div className="messageContainer" id={val.author === props.userName ? "You" : "Other"}>
                 <div className="messageIndividual">
                   {val.author === props.userName ? "You":val.author}: {val.message}
               </div>
              </div>
              )})}
          </div>
          <div className="messageInputs">
              <input type='text' placeholder='Message...' onChange={(e)=>{props.setMessage(e.target.value);}} />
              <button onClick={props.sendMessage}>Send</button>
         </div>
         </div>
      </div>
    )
}

export default ChatRoom;