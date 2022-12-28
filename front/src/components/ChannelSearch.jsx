import React, {useEffect, useState} from 'react';
import {getChannel, useChatContext} from "stream-chat-react";

import {SearchIcon} from "../assets";
import {ResultsDropdown} from "./index";
const ChannelSearch = ({setToggleContainer}) => {
    const {client, setActiveChannel} = useChatContext();

    const [query, setQuery] = useState('');
    const [loading, setLoading] = useState(false);
    const [teamChannels, setTeamChannels] = useState([]);
    const [directChannels, setDirectChannels] = useState([]);

    useEffect(() => {
        if(!query) {
            setTeamChannels([]);
            setDirectChannels([]);
        }
    }, [query])
    const getChannels = async (text) => {
        try {
            const channelResponse = client.queryChannels({
                type: 'team',
                name: {$autocomplete: text},
                members: {$in: [client.userID]}
            })

            const userResponse = client.queryUsers({
                id: {$ne: client.userID},
                name: {$autocomplete: text}
            })

            const [channels, {users}] = await Promise.all([channelResponse, userResponse])

            if(channels.length) setTeamChannels(channels)
            if(users.length) setDirectChannels(users)
        } catch (e) {
            setQuery('')
        }
    }
    const onSearch = async (e) => {
        e.preventDefault()
        setLoading(true)
        setQuery(e.target.value)
        await getChannels(e.target.value)
    }

    const setChannel = (channel) => {
        setQuery('')
        setActiveChannel(channel)
    }

    return (
        <div className='channel-search__container'>
            <div className="channel-search__input__wrapper">
                <div className="channel-search__input__icon">
                    <SearchIcon />
                </div>
                <input className="channel-search__input__text" placeholder="Search" type='text' value={query} onChange={onSearch} />
            </div>
            {query && (
                <ResultsDropdown
                    teamChannels={teamChannels}
                    directChannels={directChannels}
                    loading={loading}
                    setChannel={setChannel}
                    setQuery={setQuery}
                    setToggleContainer={setToggleContainer}
                />
            )}
        </div>
    );
};

export default ChannelSearch;
