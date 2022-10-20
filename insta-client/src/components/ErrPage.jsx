import React from 'react';
import { Link } from "react-router-dom";

function ErrPage() {
    return (
        <div className='errPage'>
            <Link to="/" className='errPageLink' style={{ textDecoration: 'none' }} >Click here to login</Link>
            <h1> ERROR 404 </h1>
            <h3>Page not found</h3>
        </div>
    )
}

export default ErrPage;