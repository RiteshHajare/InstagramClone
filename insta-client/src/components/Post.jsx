import React, { useEffect } from 'react'
import { Link } from 'react-router-dom';

function Post(props) {
    const inputElement = React.useRef();
    // let str = Buffer.from(uint8arr.buffer).toString();
    // var string = new TextDecoder().decode(props.postImg);

    useEffect(() => {

        inputElement.current.src = props.userImg;
    }, [props.userImg]);

    const userImgg = props.userImg;
    const userCredd = props.userCred;
    return (
        <div className='singlePost'>
            <div className='forBorder'>
                <Link to="/dynamicuser" state={{ data: { userImgg, userCredd } }} ><img
                    style={{
                        borderRadius: "50%",
                        height: "4rem",
                        width: "4rem"
                    }}
                    ref={inputElement} className="userPic" src=" " onError={({ currentTarget }) => {
                        currentTarget.onerror = null; // prevents looping
                        currentTarget.src = "https://t4.ftcdn.net/jpg/02/15/84/43/240_F_215844325_ttX9YiIIyeaR7Ne6EaLLjMAmy4GvPC69.jpg";
                    }} /></Link> </div>
            <div className="singlePostText">
                <h1>{props.postTitle}</h1>
                <img height="200" width="300" className='postImage' src={props.postImg} />

                <p>
                    {props.postDetails}
                </p>
            </div>
        </div>
    )
}

export default Post