import {useState} from "react";
import {StreamChat} from 'stream-chat';
import {Chat} from 'stream-chat-react';
import Cookies from 'universal-cookie';

import {ChannelListContainer, ChannelContainer, Auth} from './components'

import './App.css'
import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();
const API_KEY = 'f85fpas9kqbv'
const token = cookies.get('chat_token');
const client = StreamChat.getInstance(API_KEY);

if (token) {
    client.connectUser({
        id: cookies.get('userId'),
        name: cookies.get('username'),
        fullName: cookies.get('fullName'),
        image: cookies.get('avatarURL'),
        hashedPassword: cookies.get('hashedPassword'),
        phoneNumber: cookies.get('phoneNumber'),
    }, token)
}

function App() {
    const [createType, setCreateType] = useState('');
    const [isCreating, setIsCreating] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    if (!token) return <Auth/>

    return (
        <div className="app__wrapper">
            <Chat client={client} theme='team light'>
                <ChannelListContainer
                    setCreateType={setCreateType}
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                />
                <ChannelContainer
                    setCreateType={setCreateType}
                    isCreating={isCreating}
                    isEditing={isEditing}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    createType={createType}
                />
            </Chat>
        </div>
    );
}

export default App;
