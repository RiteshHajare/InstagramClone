import axios from 'axios';
import React, { useEffect, useState } from 'react'

function CreatePost(props) {
    console.log(props.userDetails);
    const [err, seterr] = useState(false);

    const [img, setImg] = useState("");

    const [post, setPost] = useState({
        userImage: "",
        title: "",
        details: "",
        postImage: "",
        username: ""
    });

    const uploadedImage = React.useRef(null);
    const imageUploader = React.useRef(null);

    const handleImageUpload = (e) => {
        const [file] = e.target.files;
        if (file) {
            const reader = new FileReader();
            const { current } = uploadedImage;
            current.file = file;
            reader.onload = (e) => {
                setPost((prevState) => {
                    return ({ ...prevState, postImage: e.target.result })
                });
                current.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    };

    useEffect(() => {
        axios
            .get(`http://localhost:4500/getimage/${props.userDetails.username}`, {
                responseType: "json",
            })
            .then(function (res) {
                // console.log( res.data);
                setImg(res.data);

            });
    }, []);



    function handleChange(event) {
        seterr(false);
        const { name, value } = event.target;
        setPost((prevState) => {
            return ({ ...prevState, [name]: value, username: props.userDetails.username, userImage: img })
        });
    }

    function handleClick() {
        if (!post.title || !post.details) {
            seterr(true);

        } else {
            props.getCreatedPostData(post);
            axios.post("http://localhost:4500/createpost", post);


            setPost({
                title: "",
                details: "",
                postImage: ""
            });
            props.setTrigger(false);
        }


    }

    return (props.trigger) ? (
        <div className="createPost">
            <button onClick={() => props.setTrigger(false)} className='closeBtn' type='button'>X</button>
            <h3 className="createPostTitle">CreatePost</h3>
            <div
                className="postPicture"
                style={{
                    display: "flex",
                    flexDirection: "column"
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
                            borderRadius: "1rem",
                            cursor: "pointer",
                            height: "15vw",
                            width: "180%",
                            position: "absolute",
                            top: "1.5em",
                            left: "55%"
                        }}
                        src="https://cdn.pizap.com/pizapfiles/images/add-text-to-photos-app01.jpg"
                    ></img>
                </div>
            </div>

            <input type="text" name='title' autoFocus autoComplete='true' value={post.title} onChange={handleChange} id="Title" placeholder="Title"></input>
            <textarea rows="3" name='details' value={post.details} onChange={handleChange} id="textarea" placeholder="Start Writing.."></textarea>
            <p className="err">{err && "please fill title and content"}</p>
            <button onClick={handleClick} className="sbtBtn">Submit</button>
        </div>
    ) : "";
}

export default CreatePost