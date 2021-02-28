import React, { useState, useEffect } from 'react';
import { Avatar, IconButton } from '@material-ui/core';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import { AttachFile, MoreVert, SearchOutlined } from '@material-ui/icons';
import MicIcon from '@material-ui/icons/Mic';
import axios from '../axios';
import { useParams } from 'react-router-dom';
import db from '../firebase';

import './Chat.css';
const Chat = ({ messages }) => {
    const [input, setInput] = useState("");
    const [seed, setSeed] = useState('');
    const { roomId } = useParams();
    const [roomName, setRoomName] = useState('');
    

    useEffect(() => {
        if (roomId) {
            db.collection('rooms').doc(roomId).onSnapshot(snapshot => (
                setRoomName(snapshot.data().name)
            ))
        }
        
    }, [roomId]);

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, [roomId]);

const sendMessage = async (e) => {
    e.preventDefault();

    await axios.post('/messages/new', {
        message: input,
        name: "Jigar Rathod",
        timestamp: "Just Now",
        received: true

    });
    setInput("");
}

    return (
        <div className='chat'>
            <div className='chat_header'>
                <Avatar className='avatar1' src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
                <div className='chat_headerInfo'>
                    <h3>{roomName}</h3>
                    <p>Last seen at...</p>
                </div>

                <div className='chat_headerRight'>
                <IconButton>
                  <SearchOutlined />
                </IconButton>
                <IconButton>
                  <AttachFile />
                </IconButton>
                <IconButton>
                  <MoreVert />
                </IconButton>
                </div>
            </div>

            <div className='chat_body'>
                {messages.map((message) => (
                    
                    <p className={`chat_message ${message.received && "chat_receiver"}`}>
                    <span className='chat_name'>{message.name}</span>                
                    {  message.message }
                    <span className='chat_timestamp'>
                        { message.timestamp }
                    </span>
                </p>
                ))}
               
            </div>

            <div className='chat_footer'>
                <IconButton>
                <InsertEmoticonIcon />
                </IconButton>
                
                <form>
                    <input value={input} 
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Type a message' type='text' />
                    <button onClick={sendMessage} type='submit'>Send a message</button>
                </form>

                <IconButton>
                <MicIcon />
                </IconButton>
                
            </div>
        </div>
    );
}

export default Chat;
