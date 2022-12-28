import React, {useState} from 'react';

import HospitalIcon from '../assets/hospital.png';
import LogoutIcon from '../assets/logout.png';
import {ChannelList, useChatContext} from "stream-chat-react";
import {ChannelSearch, TeamChannelList, TeamChannelPreview} from "./index";
import Cookies from "universal-cookie";

const cookies = new Cookies();
const SideBar = ({logout}) => {
    return (<div className="channel-list__sidebar">
        <div className="channel-list__sidebar__icon1">
            <div className="icon1__inner">
                <img src={HospitalIcon} alt="hospital" width='30'/>
            </div>
        </div>
        <div className="channel-list__sidebar__icon2">
            <div className="icon1__inner" onClick={logout}>
                <img src={LogoutIcon} alt="Logout" width='30'/>
            </div>
        </div>
    </div>)
}

const CompanyHeader = () => (<div className='channel-list__header'>
    <p className='channel-list__header__text'>Medical Pager</p>
</div>)

const CustomChannelTeamFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'team')
}

const CustomChannelMessagingFilter = (channels) => {
    return channels.filter((channel) => channel.type === 'messaging')
}
const ChannelListContent = ({setCreateType, isCreating, setIsCreating, setIsEditing, setToggleContainer}) => {
    const {client} = useChatContext();
    const logout = () => {
        cookies.remove('chat_token');
        cookies.remove('userId')
        cookies.remove('username')
        cookies.remove('fullName')
        cookies.remove('avatarURL')
        cookies.remove('hashedPassword')
        cookies.remove('phoneNumber')

        window.location.reload()
    }

    const filters = {members: {$in: [client.userID]}}

    return (<>
        <SideBar logout={logout}/>
        <div className="channel-list__list__wrapper">
            <CompanyHeader/>
            <ChannelSearch setToggleContainer={setToggleContainer}/>
            <ChannelList
                style={{background: '#005fff'}}
                filters={filters}
                channelRenderFilterFn={CustomChannelTeamFilter}
                List={(listProps) => <TeamChannelList
                    setCreateType={setCreateType}
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    {...listProps}
                    type='team'
                />}

                Preview={(previewProps) => (
                    <TeamChannelPreview {...previewProps} type='team'
                                        setToggleContainer={setToggleContainer}
                                        setToggleContainer={setToggleContainer}
                                        setIsCreating={setIsCreating}
                                        setIsEditing={setIsEditing}/>)}
            />
            <ChannelList
                filters={filters}
                channelRenderFilterFn={CustomChannelMessagingFilter}
                List={(listProps) => <TeamChannelList
                    setCreateType={setCreateType}
                    isCreating={isCreating}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    setToggleContainer={setToggleContainer}
                    {...listProps} c
                    type='messaging'
                />}
                Preview={(previewProps) => (<TeamChannelPreview
                    {...previewProps}
                    setToggleContainer={setToggleContainer}
                    setIsCreating={setIsCreating}
                    setIsEditing={setIsEditing}
                    type='messaging'
                />)}
            />
        </div>
    </>);
};

const ChannelListContainer = ({setCreateType, setIsCreating, setIsEditing}) => {
    const [toggleContainer, setToggleContainer] = useState(false);

    return (<>
        <div className="channel-list__container">
            <ChannelListContent
                setCreateType={setCreateType} setIsCreating={setIsCreating} setIsEditing={setIsEditing}/>
        </div>
        <div className='channel-list__container-responsive'
             style={{left: toggleContainer ? '0%' : '-89%', backgroundColor: '#005fff'}}>
            >
            <div className='channel-list__container-toggle' onClick={() => setToggleContainer(prev => !prev)}>

            </div>
            <ChannelListContent
                setCreateType={setCreateType}
                setIsCreating={setIsCreating}
                setIsEditing={setIsEditing}
                setToggleContainer={setToggleContainer}
            />
        </div>
    </>)
}

export default ChannelListContainer;
