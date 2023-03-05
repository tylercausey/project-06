import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
    const [newUsername, setNewUsername] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    async function sendLoginRequest(e) {
        e.preventDefault();
        try {
            const response = await fetch(
                "https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                    },
                    body: JSON.stringify({
                        user: {
                            username: username,
                            password: password
                        }
                    })
                }
            )

            const translatedData = await response.json();

            if (!translatedData.success) {
                alert('Login failed.');
            } else {
                const myJWT = translatedData.data.token;
                localStorage.setItem("token", myJWT);
                navigate('./posts');
            }
            
        } catch (error) {
            console.log(error);
        }
    }

    async function sendRegisterNewAccountReq(e){
        e.preventDefault();
        try {

            if (newPassword.length < 8) {
                alert('Password is too short. Must be 8 characters.');
                return;
            } else if (newUsername.length < 8) {
                alert('Username is too short. Must be 8 characters.');
                return;
            }

            const response = await fetch('https://strangers-things.herokuapp.com/api/2301-ftb-mt-web-ft/users/register',
                { 
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Access-Control-Allow-Origin': '*',
                        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
                        'Access-Control-Allow-Headers': 'Content-Type, Authorization, X-Requested-With'
                    },
                    body: JSON.stringify({
                        user: {
                            username: newUsername,
                            password: newPassword
                        }
                    })
                }
            )

            const translatedData = await response.json();

            if (!translatedData.success) {
                alert('Account was not successfully created. Please try again.')
            } else {
                const myJWT = translatedData.data.token;
                
                localStorage.setItem('token', myJWT);

                navigate('/posts');
            }

        } catch (error) {
            console.log(error);
        }
    }

    return(
        <div>
            <form>
                <input type='text' placeholder="Please enter your Username" value={username} onChange={(event) => setUsername(event.target.value)} />
                <input type='text' placeholder="Please enter your Password" value={password} onChange={(event) => setPassword(event.target.value)} />
                <button onClick={sendLoginRequest}>Existing User Login</button>
            </form>
            <form>
                <input type='text' placeholder="New Username" value={newUsername} onChange={(event) => setNewUsername(event.target.value)} />
                <input type='text' placeholder="New Password" value={newPassword} onChange={(event) => setNewPassword(event.target.value)} />
                <button onClick={sendRegisterNewAccountReq}>Create Account</button>
            </form>
        </div>
    )
}

export default Login

