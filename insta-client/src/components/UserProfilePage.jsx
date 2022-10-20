import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Post from './Post';

function UserProfilePage(props) {

    const [postsFromDB, setPostsFromDB] = useState([]);
    const [followers, setFollowers] = useState(0);
    const [following, setFollowing] = useState(0);
    const [posts, setPosts] = useState(0);

    const [userImg, setUserImg] = useState("");

    const location = useLocation()
    const { data } = location.state;

    console.log(data.username);
    // console.log(props.postData);



    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = (e) => {
        const [file] = e.target.files;

        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                const profileDetails = {
                    userImage: e.target.result,
                    username: data.username
                }
                axios.post("http://localhost:4500/profiledata", profileDetails);
                props.getImgForHomePg(e.target.result);

                // console.log(e.target.result);
                current.src = e.target.result;

            };
            reader.readAsDataURL(file);

        }



    };

    function spread(singlePostData) {
        return (
            <Post userImg={userImg} postTitle={singlePostData.title} postDetails={singlePostData.details} postImg={singlePostData.postImage} />
        );
    }

    useEffect(() => {
        setPostsFromDB(props.postData);
        axios
            .get(`http://localhost:4500/createpost/${data.username}`, {
                responseType: "json",
            })
            .then(function (res) {
                console.log(res.data);
                setFollowers(res.data.followers);
                setFollowing(res.data.followingto.length);
                setPosts(res.data.posts.length);
                setPostsFromDB(res.data.posts);
                setUserImg(res.data.userImage);
            });



    }, [])

    return (
        <div className='UserProfilePage'>
            <h2 className='myPosts'> My Posts</h2>
            <div className='userProfileCard'>

                <div
                    className='profileCardDiv1'
                    style={{
                        display: "flex",
                        flexDirection: "column",

                    }}
                >
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        ref={imageUploader}
                        style={{
                            display: "none"
                        }}
                    />
                    <div
                        style={{
                            borderRadius: "50%",
                            height: "20vw",
                            width: "20vw",
                            position: "absolute",
                            top: "0"
                        }}
                        onClick={() => imageUploader.current.click()}
                    >
                        <img
                            ref={uploadedImage}
                            style={{
                                borderRadius: "50%",
                                height: "20vw",
                                width: "20vw",
                                position: "absolute",
                                top: "0"

                            }}
                            src={userImg ? userImg : " "}
                            onError={({ currentTarget }) => {
                                currentTarget.onerror = null; // prevents looping
                                currentTarget.src =
                                    "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
                            }}
                        ></img>


                    </div>

                </div>
                <div className='profileCardDiv2'>
                    <div className='alignUsername'>
                        <h1 className='name'>{data.username}</h1>
                    </div>
                    <h3 className='followers'>Following:{following}</h3>
                    <h3 className='following'>Followers:{followers ? followers : 0}</h3>
                    <h3 className='posts'>Posts:{posts}</h3>
                </div>

            </div>
            <div className='userPosts'>{postsFromDB.map(spread)}</div>
        </div>
    )
}

export default UserProfilePage