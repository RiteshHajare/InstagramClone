import React, { useState } from 'react'
import Login from './Login'
import Register from './Register'
import UserHomePage from './UserHomePage';

function Home() {

    const [isLoggedIn, setLoggedIn] = useState(false);


    if (!isLoggedIn) {
        return (
            <div>
                <Login />

            </div>
        )

    } else {
        return (
            <div>
                <UserHomePage />
            </div>
        )
    }

}

export default Home