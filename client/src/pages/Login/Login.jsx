import { Container, Row ,Col, Form} from 'react-bootstrap';
import './Login.css'
function Login(props){
    return(
        <Container className="formContainer">
            <Form className="form-control">
                <Form.Group className="row nickname">
                    <Form.Label for="nickname" className="col-2 col-form-label">Nickname</Form.Label>
                    <Col lg="7" >      
                        <Form.Control id="nickname" type="text" className="form-control-plaintext" placeholder="Nickname..." onChange={(e)=>props.setUserName(e.target.value)}/>
                    </Col>
                </Form.Group>
                <Form.Group className="row selectroom">
                    <Form.Label for="selectroom" className="col-2 col-form-label">Room</Form.Label>
                    <Col lg="5" >      
                        <Form.Control id="selectroom" type="text" className="form-control-plaintext" placeholder="Enter new Room name..." onChange={(e)=>props.setRoom(e.target.value)}/>
                    </Col>
                    <Col lg="5">
                    <Form.Control as="select"  className="roomList list-group" id="room" placeholder="Chouse room from the list..."  onChange={(e)=>props.setRoom(e.target.value)}>
                    <option className="list-group-item">Select Room from list</option>
                    {props.roomList.map((val,key)=>
                        <option className="list-group-item" value={val} key={key}>{val}</option>
                     )}
                    </Form.Control>
                    </Col>
                </Form.Group>
                <Row className="d-grid gap-2 col-4 mx-auto">
                    <button className="btn btn-primary" type="submit" onClick={props.connectToRoom}>Enter Chat</button>
                </Row>
            </Form>
      </Container>
    )
}

export default Login;