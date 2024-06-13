import React from "react";
import { Outlet, Link, useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate()

    function handleClick(e) {
        e.preventDefault()
        localStorage.removeItem("access_token")
        localStorage.removeItem("id")
        localStorage.removeItem("gender")
        
        navigate("/login")
    }

    return (
    <>
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <Link className="navbar-brand" to={`/my-harmony`}>My Harmony</Link>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div className="navbar-nav w-100">
                <Link className="nav-link" to="/home">Edit Profile</Link>
                <Link className="nav-link" to={`/my-profile/${localStorage.id}`}>My Profile</Link>
                <Link className="nav-link" to="/harmony">Find Your Harmony</Link>
                <Link className="nav-link" to="/my-harmony">My Harmony</Link>
                <div className="ms-auto">
                    <Link className="nav-link" to="/login" onClick={handleClick}>Logout</Link>
                </div>
            </div>
            </div>
        </div>
        </nav>

        <Outlet />
    </>
    )
}

export default Home