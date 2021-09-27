
//import { CalculatorFilled } from "@ant-design/icons";
import React, {useRef, useEffect, useState} from "react";
import { useHistory } from "react-router-dom";
import { auth } from '../firebase';
import {ChatEngine} from "react-chat-engine";

import { useAuth } from "../contexts/AuthContext";
import axios from "axios";

const Chats = ()=> {
    const history = useHistory();
    const {user} = useAuth();
    const {loading, setLoading} = useState(true);

    console.log(user);
    const handleLogout = async ()=>{
        await auth.signOut;
        history.push('/')
    }
    
    const getFile = async(url) =>{
        const response = await fetch(url);
        const data = await response.blob();

        return new File([data], "userPhoto.jpg", {type: 'image/jpeg'})
    }
    useEffect(()=>{
        if(!user)
        {
            history.push('/');
            return;
        }
        axios.get('https://api.chatengine.io/users/me',{
            headers:{
                "project-id" : "0f2c4a70-7c8e-4723-90da-125b61367adb",
                "user-name" : user.email,
                "user-secret" : user.uid,
            }
        })
        .then(()=>{
            setLoading(false);
        })
        .catch(()=>{
            let formdata = new FormData();
            formdata.append('email', user.email);
            formdata.append('username', user.email);
            formdata.append('secret', user.uid);

            getFile(user.photoURL)
                .then((avatar) => {
                    formdata.append('avatar',avatar, avatar.name)

                    axios.post('https://api.chatengine.io/users',
                        formdata,
                        { headers : {
                            "private-key": "a7b8c145-ff72-4eb7-8df7-98127026f05b"
                        }}
                    )
                    .then(()=> setLoading(false))
                    .catch((error) => console.log(error))
        
                })
        })
    },[user, history]);

    if(!user || loading)
        return 'Loading...'
    return (
        <div className = "chats-page">
            <div className = "nav-bar">
                <div className = "logo-tab">
                    Unichat
                </div>
                <div onClick = {handleLogout} className = "logout-tab">
                    Logout
                </div>
            </div>

            <ChatEngine
                height = "calc(100vh - 66px)"
                projectID = "0f2c4a70-7c8e-4723-90da-125b61367adb"
                userName = {user.email}
                userSecret = {user.uid}
            />
        </div>
    )
}

export default Chats;