import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import DynamicUserProfilePage from './DynamicUserProfilePage';
import ErrPage from './ErrPage';
import Login from './Login';
import Register from './Register';
import UserHomePage from './UserHomePage';
import UserProfilePage from './UserProfilePage';


function App() {
    const [postData, setPostData] = useState([]);
    const [userImg, setUserImg] = useState("");


    function getCreatedPostData(postInfo) {
        setPostData((prevArray) => {
            return ([...prevArray, postInfo])
        });
    }

    function getImgForHomePg(imgData) {
        setUserImg(imgData);
    }


    return (
        <div>
            <BrowserRouter forceRefresh={true}>
                <Routes>
                    <Route exact path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/user" element={<UserHomePage getCreatedPostData={getCreatedPostData} userImg={userImg} />} />
                    <Route path="/userprofilepage" element={<UserProfilePage postData={postData} getImgForHomePg={getImgForHomePg} />} />
                    <Route path="/dynamicuser" element={<DynamicUserProfilePage />} />
                    <Route path="/*" element={<ErrPage />} />
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App