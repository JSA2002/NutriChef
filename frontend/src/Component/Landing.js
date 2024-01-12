import React, { useState, useEffect, useMemo, useCallback } from 'react';
import "./Landing.css";
import nutrichefLogo from "../Imgs/logo-nutrichef.png";
import { Link } from "react-router-dom";
import img1 from "../Imgs/eiliv-aceron-mAQZ3X_8_l0-unsplash.jpg"
import img2 from "../Imgs/eiliv-aceron-ZuIDLSz3XLg-unsplash.jpg"
import img3 from "../Imgs/emiliano-vittoriosi-OFismyezPnY-unsplash.jpg";
//import Webcam from "react-webcam";

const Landing = () => {
    const headings = useMemo(() => [
        "AI-Powered Nutrition Analysis"
        , "Culinary Adventure Awaits"
        , "Eat Smarter, Live Healthier"
        , "Nourish Your Body, Your Way"
        , "Empowering Healthy Choices"
        , "Explore Culinary Creativity"
        , "Discover Nutritional Insights"
        , "Elevate Your Nutrition Knowledge"], [])

    const [currentIndex, setCurrentIndex] = useState(0);
    const [isSignUpActive, setIsSignUpActive] = useState(false);
    const [activeSignIn, setActiveSignIn] = useState(false);



    const changeHeadingText = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % headings.length);
    }, [headings]);

    useEffect(() => {
        const interval = setInterval(changeHeadingText, 5000);
        return () => {
            clearInterval(interval);
        };
    }, [changeHeadingText]);

    //sign In sign up JS
    const toggleForm = () => {
        setIsSignUpActive(!isSignUpActive);
    };

    //active sign in sign up
    const activeSign = () => {
        setActiveSignIn(!activeSignIn);
    }


    return (
        <div>
            <div className='banner'></div>
            <div className='landing'>
                <div className='landing-nav'>
                    <img src={nutrichefLogo} alt="logo" />
                    <button onClick={activeSign}>Sign In</button>
                </div>
                <div className='landing-body'>
                    <div className='landing-content-img'>
                        <div className='landing-res'>
                            <div>
                                <h5>Welcome, Healthnut !</h5>
                                <h1 id="landing-heading">{headings[currentIndex]}</h1>
                            </div>
                            <div className='button-group'>
                                <Link to="/name"><button>Search By Name</button></Link>
                                <Link to="/camera"><button>Open Camera</button></Link>
                                <Link to="/upload"><button>Upload Photo</button></Link>
                                <Link to="/ingredient"><button>Search By Incredients</button></Link>
                            </div>
                        </div>
                        <div className='imgs'>
                            <img src={img1} alt="1" className='img1' />
                            <img src={img2} alt="2" className='img2' />
                            <img src={img3} alt="3" className='img3' />
                        </div>
                    </div>
                </div>
            </div>
            <div className='sign' style={{ display: `${activeSignIn ? "flex" : "none"}` }}>
                <div className="sign-box">
                    <div className={`container ${isSignUpActive ? "right-panel-active" : ""}`} id="container">
                        <div className={`form-container ${isSignUpActive ? 'sign-up-container' : 'sign-in-container'}`}>
                            {isSignUpActive ? (
                                <form>
                                    <h1>Create Account</h1>
                                    <span>or use your email for registration</span>
                                    <input type="text" name="name" placeholder="Name" />
                                    <input type="email" name="email" placeholder="Email" />
                                    <input type="password" name="password" placeholder="Password" />
                                    <button>Sign Up</button>
                                    <button type="button" style={{ marginTop: "10px", backgroundColor: "transparent", color: "#269635" }} className='mobilebutton' onClick={toggleForm}>Sign In</button>
                                </form>
                            ) : (
                                <form>
                                    <h1>Sign In</h1>
                                    <span>or use your account</span>
                                    <input type="email" name="email" placeholder="Email" />
                                    <input type="password" name="password" placeholder="Password" />
                                    <Link to="" id='fpassword'>Forgot Your Password</Link>
                                    <button>Sign In</button>
                                    <button type="button" style={{ marginTop: "8px", backgroundColor: "transparent", color: "#269635" }} className='mobilebutton' onClick={toggleForm}>Sign Up</button>
                                </form>
                            )}
                        </div>
                        <div className="overlay-container">
                            <div className="overlay">
                                <div className="overlay-panel overlay-left">
                                    <h1>Welcome Back!</h1>
                                    <p>To keep connected with us please login with your personal info</p>
                                    <button className="ghost" onClick={toggleForm}>Sign In</button>
                                </div>
                                <div className="overlay-panel overlay-right">
                                    <h1>Hello, Friend!</h1>
                                    <p>Enter your details and start the journey with us</p>
                                    <button className="ghost" onClick={toggleForm}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Landing;