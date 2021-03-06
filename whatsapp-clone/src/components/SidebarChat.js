import { Avatar } from '@material-ui/core';
import React, { useEffect, useState } from 'react'
import db from '../firebase';
import './SidebarChat.css';
import { Link } from 'react-router-dom';
const SidebarChat = ({ id, name, addNewChat }) => {
    const [seed, setSeed] = useState('');

    useEffect(() => {
        setSeed(Math.floor(Math.random() * 5000));
    }, []);

    const createChat = () => {
        const roomName = prompt("Please enter name for chat room");

        if (roomName) {
            db.collection('rooms').add({
                name: roomName,
            })
        }
    }

    return  !addNewChat ? (
        <Link to={`/rooms/${id}`} className='link'>
        <div className='sidebarChat'>
        <Avatar className='avatar' src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className='sidebarChat_info'>
            <h2>{name}</h2>
            <p>This is a last message</p>
        </div>
        </div>
        
        </Link>
        
    ) : (
        <div onClick={createChat} className='sidebarChat'>
            <h2>Add New Chat</h2>
        </div>
    )
}

export default SidebarChat;
