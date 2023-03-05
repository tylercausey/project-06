import React from "react";
import { Link, useNavigate } from "react-router-dom";


const Header = (props) => {
    const { isLoggedIn } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem('token');
        props.setIsLoggedIn(false);
        navigate('./');
      }

    return(
        <header>
            <h1>Stranger's things</h1>
            <div id='headerButtons'>
                {
                    !isLoggedIn ? <Link to='/'> Login </Link> : 
                    <div>
                        <Link to='/posts'> Posts </Link> 
                        <Link to='/profile'> &nbsp; Profile &nbsp; </Link>
                        <button onClick={handleLogout}> Logout </button>
                    </div>
                }
            </div>
        </header> 
   )
}

export default Header