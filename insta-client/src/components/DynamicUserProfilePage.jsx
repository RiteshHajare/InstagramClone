import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation } from 'react-router-dom';

function DynamicUserProfilePage() {
    const isInitialMount = useRef(true);

    const [followersNum, setFollowersNum] = useState({
        number: 0,
        followed: false
    });
    const [posts, setPosts] = useState(0);
    const [following, setFollowing] = useState(0);


    const location = useLocation()
    const { data } = location.state;
    console.log(data.userCredd);

    function handleClick() {
        if (followersNum.followed) {
            setFollowersNum((prev) => {
                return ({
                    number: prev.number - 1, followed: false
                });
            });


        } else {
            setFollowersNum((prev) => {
                return ({
                    number: prev.number + 1, followed: true
                });
            });



        }

    }
    useEffect(() => {
        if (isInitialMount.current) {
            console.log("This is first or refresh render");
            isInitialMount.current = false;
        } else {
            console.log("happened");
            const updatebool = { userImgg: data.userImgg, bool: followersNum.followed, userCred: data.userCredd.username, number: followersNum.number }
            axios.post("http://localhost:4500/followed", updatebool);
        }
    }, [followersNum.followed]);





    useEffect(() => {
        const getData = { userImgg: data.userImgg, userCred: data.userCredd.username };
        axios.post("http://localhost:4500/getinguser", getData)
            .then(function (res) {
                console.log(res.data);
                setFollowersNum((prev) => {
                    return ({
                        followed: res.data.bool, number: res.data.number
                    });
                });
                console.log(res.data.followingto);
                setFollowing(res.data.following ? res.data.following : 0);
                setPosts(res.data.posts ? res.data.posts : res.data.posts);

            });



    }, []);









    return (
        <div className='UserProfilePage'>

            <div className='userProfileCard forDynamicProfile'>

                <div
                    className='profileCardDiv1'
                    style={{
                        display: "flex",
                        flexDirection: "column",

                    }}
                >
                    <img

                        style={{
                            borderRadius: "50%",
                            height: "20vw",
                            width: "20vw",
                            position: "absolute",
                            top: "4rem"

                        }}
                        src={data.userImgg ? data.userImgg : " "}
                        onError={({ currentTarget }) => {
                            currentTarget.onerror = null; // prevents looping
                            currentTarget.src =
                                "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
                        }}
                    ></img>
                </div>
                <div className='profileCardDiv2'>
                    <div className='alignUsername'>
                        <h1 className='name'>{data.username}</h1>
                    </div>
                    <h3 className='followers'>Following:{following}</h3>
                    <h3 className='following'>Followers:{followersNum.number}</h3>
                    <h3 className='posts'>Posts:{posts}</h3>
                </div>
                <button type="button" onClick={handleClick} className="followBtn"><strong>{followersNum.followed ? "Unfollow" : "Follow"}</strong></button>

            </div>

        </div>
    )
}

export default DynamicUserProfilePage;