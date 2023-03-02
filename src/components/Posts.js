import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Posts=(props) =>{
    const [searchQuery, setSearchQuery] = useState('');
    const [myData, setMyData] = useState({});
   
 
    useEffect(() => {
        
        if (localStorage.getItem("token")) {
            props.setIsLoggedIn(true)
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

    const { postListProps } = props;

    let filteredList = postListProps.filter((singlePost) =>{
        let lowerCasedPostName = singlePost.author.username.toLowerCase();
        let lowerCasedPostDescription = singlePost.description.toLowerCase();
        let lowerCasedPostTitle = singlePost.title.toLowerCase();
        let lowerCasedPostPrice = singlePost.price.toLowerCase();
        return (lowerCasedPostName.includes(searchQuery.toLowerCase()) || lowerCasedPostDescription.includes(searchQuery.toLowerCase()) || lowerCasedPostPrice.includes(searchQuery.toLowerCase()) || lowerCasedPostTitle.includes(searchQuery.toLowerCase()))
    }) 

    return (
        <div>
            {props.isLoggedIn ? (
                <div>
                    <input
                        type="text"
                        placeholder="Search Name or Descr."
                        onChange={(event) => {
                        setSearchQuery(event.target.value);
                        }}
                    />
                    <Link to='/createnewpost'>Click here to create a new post</Link>
                    <section>
                        {!filteredList.length ? (
                            <h3> No data loaded </h3>
                        ) : (
                            filteredList.map((singlePost) => {
                            return (
                                <div className="singlePost" key={singlePost._id}>
                                    <p className="postTitle">Title: {singlePost.title}</p>
                                    <p className="postName">Name: {singlePost.author.username}</p>
                                    <p className="postPrice">Price: {singlePost.price}</p>
                                    <p className="postWillDeliver">Will Deliver? {singlePost.willDeliver ? 'Yes' : 'No'}</p>
                                    <p className="description">Description: {singlePost.description}</p>
                                    <Link to={'/' + singlePost._id} >Open this post</Link>
                                </div>
                            )
                            })
                        )}
                    </section>
                </div>
            ) : (
                <Link to="/">Please Login or Sign Up Here</Link>
            )}
        </div>
    )
}

export default Posts