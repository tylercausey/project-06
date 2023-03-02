import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";

const CreateNewPost = () => {
    const [postTitle, setPostTitle] = useState('');
    const [postDescription, setPostDescription] = useState('');
    const [postPrice, setPostPrice] = useState('');
    const [postWillDeliver, setPostWillDeliver] = useState(false);
    const navigate = useNavigate();

    async function makeNewPost(e){
        e.preventDefault();
        try {

            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/posts',
                { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                    },
                    body: JSON.stringify({
                        post: {
                            title: postTitle,
                            description: postDescription,
                            price: postPrice,
                            willDeliver: postWillDeliver
                        }
                    })
                }
            )

            const translatedData = await response.json();
            
            if (!translatedData.success) {
                alert('Post was not successfully created. Please try again.')
            } else {
                navigate('/posts');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <form>
            <input type='text' placeholder="New post Title" onChange={(event) => {setPostTitle(event.target.value)}}></input>
            <input type='text' placeholder="New post Description" onChange={(event) => {setPostDescription(event.target.value)}}></input>
            <input type='text' placeholder="New post Price" onChange={(event) => {setPostPrice(event.target.value)}}></input>
            <label> Will Deliver?
                <select type='text' placeholder="Will Deliver?" onChange={(event) => {setPostWillDeliver(event.target.value == 'true')}}>
                    <option value='true'>True</option>
                    <option value='false'>False</option>
                </select>
            </label>
            <button onClick={makeNewPost}>Submit new post</button>
        </form>

    )
}

export default CreateNewPost