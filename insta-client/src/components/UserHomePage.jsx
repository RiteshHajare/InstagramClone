import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import CreatePost from './CreatePost';
import Post from './Post';


function UserHomePage(props) {
    let navigate = useNavigate();
    const [userImg, setuserImg] = useState("");
    const [mapPosts, setMapPosts] = useState("");
    const [showPost, setPost] = useState(false);
    const location = useLocation();
    const { data } = location.state;
    console.log(data);

    function btnClicked() {
        setPost(!showPost);
    }

    useEffect(() => {
        axios
            .get("http://localhost:4500/profiledata", {
                responseType: "json",
            })
            .then(function (res) {
                console.log(res.data);
                setMapPosts(res.data);

            });
        axios
            .get(`http://localhost:4500/profiledata/${data.username}`, {
                responseType: "json",
            })
            .then(function (res) {
                // console.log(res.data);
                setuserImg(res.data)

            });
    }, []);

    function splitPosts(post) {
        return (
            <Post userCred={data} userImg={post.userImage} postTitle={post.title} postDetails={post.details} postImg={post.postImage} />
        );
    }

    function handleClick() {
        axios.get("http://localhost:4500/logout")
            .then(function (res) {
                console.log(res.data);
                if (res.data == "Successfully Logout") {

                    navigate("/", { replace: true });
                }
            });
    }


    return (
        <div>
            <div className='homePagenav'>
                <button type='button' className='logoutBtn' onClick={handleClick} >Logout</button>
                <Link to="/userprofilepage" state={{ data: data }} ><img
                    className='userProfile'
                    src={props.userImg ? props.userImg : userImg}
                    onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
                    }}
                />
                </Link>
            </div>
            <div className='createPostBar'>
                <button onClick={btnClicked} className='askingforpost'><h3 >Having something in mind, {data.username} </h3></button>
            </div>
            <CreatePost userDetails={data} trigger={showPost} setTrigger={setPost} getCreatedPostData={props.getCreatedPostData} />

            <div className='mapAllPosts'>
                {mapPosts ? mapPosts.map(splitPosts) : null}
            </div>
        </div>
    )
}

export default UserHomePage

