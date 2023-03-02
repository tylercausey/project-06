import React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const SinglePost = (props) => {
    const {id} = useParams();
    const postList = props.postListProps;
    const chosenPost = postList.filter ((post) => {
        return post._id == id
    })
    
    const truePost = chosenPost[0];
    const [message, setMessage] = useState('');

    const sendMessage = async () => {

        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts/${truePost._id}/messages`,
            {
                method: "POST",
                headers: {
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${localStorage.getItem('token')}`
                },
                body: JSON.stringify({ 
                    message : {
                        content: message
                    } 
                })
            })
        } catch (error) {
            console.log(error)
        }
    
    }

    const [myData, setMyData] = useState({});

    useEffect(() => {
        
        if (localStorage.getItem("token")) {
            fetchMyData(); 
        } else {
            props.setIsLoggedIn(false)
            console.log("No token exists!")
        }

        async function fetchMyData() {
            try {
                const response = await fetch("https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me", {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const translatedData = await response.json(); 
                
                setMyData(translatedData.data)
            } catch (error) {
                console.log(error); 
            }
        }
    }, [])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (truePost.author._id == myData._id){
            alert('You cannot send a message on your own post!');
            return;
        }
        sendMessage();
        setMessage('');
    }

    return(
        <div className="singlePost"> 
            <Link to="/posts" >Click here to return to all posts</Link>
            {
                !truePost ? <h1> &nbsp; </h1> :
                <div>
                    <p className="postTitle">Title: {truePost.title}</p>
                    <p className="postName">Name: {truePost.author.username}</p>
                    <p className="postPrice">Price: {truePost.price}</p>
                    <p className="postWillDeliver">Will Deliver? {truePost.willDeliver ? 'Yes' : 'No'}</p>
                    <p className="description">Description: {truePost.description}</p>
                    <form onSubmit={handleSubmit}>
                        <label>
                        Message this seller:
                        <input
                            type="text"
                            placeholder="Type message here"
                            value={message}
                            onChange={(event) => setMessage(event.target.value)}
                        />
                        </label>
                        <button type="submit">Send</button>
                    </form>
                </div>
            }   
        </div>
    )
}

export default SinglePost