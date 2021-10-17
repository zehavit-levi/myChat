import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  useLocation
} from "react-router-dom";
import Login from './pages/Login/Login';
import RoomList from './pages/RoomList/RoomList';
import AddRoom from './pages/AddRoom/AddRoom';
import ChatRoom from './pages/ChatRoom/ChatRoom';


function App() {

 
  // const [data, setData] = React.useState(null);

  // React.useEffect(() => {
  //   fetch("/api")
  //     .then((res) => res.json())
  //     .then((data) => setData(data.message));
  // }, []);
  
  let location = useLocation();
  
  function SecureRoute({ children, ...rest }) {
    return (
      <Route
        {...rest}
        render={({ location }) =>
          localStorage.getItem('nickname') ? (
            children
          ) : (
            <Redirect
              to={{
                pathname: "/login",
                state: { from: location }
              }}
            />
          )
        }
      />
    );
  }
  return (
    <Router>
      <div>
        <Redirect
          to={{
            pathname: "/roomlist",
            state: { from: location }
          }}
        />
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <SecureRoute path="/roomlist">
            <RoomList />
          </SecureRoute>
          <SecureRoute path="/addroom">
            <AddRoom />
          </SecureRoute>
          <SecureRoute path="/chatroom/:room">
            <ChatRoom />
          </SecureRoute>
        </Switch>
      </div>
    </Router>
  );
}

export default App;
