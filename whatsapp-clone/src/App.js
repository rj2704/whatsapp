import React, { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Chat from './components/Chat';
import { login, logout, selectUser } from './userSlice';
import Login from './components/Login';
import Pusher from 'pusher-js';
import axios from './axios';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import { auth } from './firebase';



function App() {
  const [messages, setMessages] = useState([]);
 /* const [{ user }, dispatch] = useStateValue(); */
  const user = useSelector(selectUser);
  const dispatch = useDispatch();

  useEffect(() => {
    axios.get('/messages/sync')
    .then(response => {
        setMessages(response.data);
    })
  }, []);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((userAuth) => {
      if (userAuth) {
        
        dispatch(login({
          uid: userAuth.uid,
          email: userAuth.email
        }))
      }else {
        dispatch(logout());
      }
    });
    return unsubscribe;
  }, [dispatch]);

  useEffect(() => {
    const pusher = new Pusher('0ef03955a8ed83790b62', {
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      
      setMessages([...messages, newMessage])
    });

    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    };
  }, [messages]);

  console.log(messages);

  return (
    <div className="app">
    <BrowserRouter>
    {
      !user ? ( <Login /> )
      : (
        <div className='app_body'>   
        <Sidebar />
          <Switch>
            <Route path='/rooms/:roomId'>
              <Chat messages={messages} />
            </Route>
            <Route path='/'>
              
            </Route>
          </Switch>
        </div>
      )
    }
    </BrowserRouter>
    
    </div>
  );
}

export default App;
