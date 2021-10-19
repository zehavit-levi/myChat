import { Container, Row ,Col, Form} from 'react-bootstrap';
import './Login.css'
function Login(props){
    return(
        <Container>
            <Col className="form-control">
                <Row className="row nickname">
                    <label for="nickname" className="col-2 col-form-label">Nickname</label>
                    <Col lg="7" >      
                        <input id="nickname" type="text" className="form-control-plaintext" placeholder="Nickname..." onChange={(e)=>props.setUserName(e.target.value)}/>
                    </Col>
                </Row>
                <Row className="row selectroom">
                    <label for="selectroom" className="col-2 col-form-label">Room</label>
                    <Col lg="5" >      
                        <input id="selectroom" type="text" className="form-control-plaintext" placeholder="Enter new Room name..." onChange={(e)=>props.setRoom(e.target.value)}/>
                    </Col>
                    <Col lg="5">
                    <Form.Control as="select"  className="roomList list-group" id="room" placeholder="Chouse room from the list..."  onChange={(e)=>props.setRoom(e.target.value)}>
                    <option className="list-group-item">Select Room from list</option>
                    {props.roomList.map((val,key)=>
                        <option className="list-group-item" value={val} key={key}>{val}</option>
                     )}
                    </Form.Control>
                    </Col>
                </Row>
                <Row className="d-grid gap-2 col-4 mx-auto">
                    <button className="btn btn-primary" type="submit" onClick={props.connectToRoom}>Enter Chat</button>
                </Row>
            </Col>
      </Container>
    )
}

export default Login;