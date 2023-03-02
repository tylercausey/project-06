import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = (props) => {
    const [myData, setMyData] = useState('');
    
    useEffect (() => {
        if (localStorage.getItem('token')){
            props.setIsLoggedIn(true)
            fetchMyData()
        } else{
            props.setIsLoggedIn(false)
            console.log('No token exists.')
        }

        async function fetchMyData() {
            try {
                const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/me`, {
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`
                    }
                })

                const translatedData = await response.json();
                
                setMyData(translatedData.data);
                
            } catch (error) {
                console.log(error);
            }
        }

    }, [])

    let myMessages = myData.messages;

    let myPosts = myData.posts ? myData.posts.filter((post) => {
        if (post.active == true){
            return post
        }
    }) : [];

    async function deletePost(event) {
        try {
            const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts/${event.target.value}`,
            {
                method: "DELETE",
                headers: {
                    'Content-Type' : 'application/json',
                    'Authorization' : `Bearer ${localStorage.getItem("token")}`
                }
            })

            const translatedResponse = await response.json();

            console.log(translatedResponse)

            if (translatedResponse.success) {
                let filteredMyPosts = myPosts.filter((individualPost) => {
                    if (individualPost._id != event.target.value) {
                        return individualPost
                    }
                })

                myPosts = filteredMyPosts
            }
        
        } catch (error) {
            console.log(error);
        }
    }
    
    return (
        <div>
            {
                props.isLoggedIn ? 
                    <div>
                        <h3>Welcome, {myData.username}</h3>
                        <Link to='/createnewpost'>Click here to create a new post</Link>
                    </div>
                : <h3>Please login or register for an account.</h3>
            }
            <div>   
                {    
                    !myMessages ? <h3>No messages yet.</h3> : myMessages.map((individualMessage) => {
                        return (
                            <div className="individualMessage" key={individualMessage._id}>
                                <p className="messageFromUser">From: {individualMessage.fromUser.username}</p>
                                <p className="messageContent">Message content: {individualMessage.content}</p>
                                <p className="messagePostTitle">Post Title: {individualMessage.post.title}</p>
                                <p className="messagePostAuthor">Post Author: {individualMessage.post.author.username}</p>
                            </div>
                        )
                    })
                }
            </div>
            <div>
                {  
                    !myPosts ? <h3>No posts yet.</h3> : myPosts.map((individualPost) => {
                        return (
                            <div className="singlePost" key={individualPost._id}>
                                <p className="postTitle">Title: {individualPost.title}</p>
                                <p className="postName">Name: {individualPost.author.username}</p>
                                <p className="postPrice">Price: {individualPost.price}</p>
                                <p className="postWillDeliver">Will Deliver? {individualPost.willDeliver ? 'Yes' : 'No'}</p>
                                <p className="description">Description: {individualPost.description}</p>
                                <button value={individualPost._id} onClick={deletePost} type='submit' > Delete this post</button>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}

export default Profile