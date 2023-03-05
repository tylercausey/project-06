import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Header, Posts, Login, Profile, CreateNewPost, SinglePost } from "./components";

const appElement = document.getElementById("app")

const App = () => { 
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [postList, setPostList] = useState([]);
    useEffect(() => {
        const postListFetcher = async () => {
            try {
                const response = await fetch(`https://strangers-things.herokuapp.com/api/2301-FTB-MT-WEB-FT/posts`);
                const translatedData = await response.json();
                const desiredData = translatedData.data.posts
                setPostList(desiredData);
            } catch (error){
                console.log(error);
            }
        }
        postListFetcher();
    }, [])

    return ( 
    <BrowserRouter>
    <div> 
        <Header isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>
        <Routes>
            <Route path='/' element={<Login isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/posts' element={<Posts postListProps={postList} isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/profile' element={<Profile isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />} />
            <Route path='/createnewpost' element={<CreateNewPost />} />   
            <Route path='/:id' element={<SinglePost postListProps={postList}/>} > </Route> 
        </Routes> 
    </div>
    </BrowserRouter> 
    ) 
}

const root = createRoot(appElement)
root.render(<App />)