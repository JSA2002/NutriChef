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
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [signUpEmail, setSignUpEmail] = useState('')
    const [signUpPassword, setSignUpPassword] = useState('')
    const [signUpName, setSignUpName] = useState('');
    const [pop, setPop] = useState(false);
    const [popIncorrect, setPopIncorrect] = useState(false);
    const [emailPop, setEmailPop] = useState(false);
    const [popSignIn, setPopSignIn] = useState(false);

    async function SubmitSignIn(e) {
        e.preventDefault();
        try {
            await fetch("https://nutrichef-backend.vercel.app/signin", {
            //await fetch("http://localhost:5000/signin", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ email, password })
            })
                .then(async (response) => await response.json())
                .then((data) => {
                    if (data === "Authentication Successful") {
                        localStorage.setItem('authToken', true);
                        setActiveSignIn(false);
                        setPop(true);
                        setTimeout(() => {
                            setPop(false);
                        }, 2000);
                    } else {
                        setPopIncorrect(true);
                        setTimeout(() => {
                            setPopIncorrect(false);
                        }, 2000);
                    }
                })
        } catch (e) {

        }
    }

    async function SubmitSignUp(e) {
        e.preventDefault();
        if (!signUpName || !signUpEmail || !signUpPassword) {
            alert('Please fill in all three values');
            return;
        }
        const requestBody = {
            signUpPassword: signUpPassword,
            signUpEmail: signUpEmail,
            signUpName: signUpName,
        };
        try {
            await fetch("https://nutrichef-backend.vercel.app/signup", {
            //await fetch("http://localhost:5000/signup", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(requestBody)
            })
                .then(async (response) => await response.json())
                .then((data) => {
                    if (data === "createdUser") {
                        localStorage.setItem('authToken', true);
                        setActiveSignIn(false);
                        setPopSignIn(true);
                        setTimeout(() => {
                            setPopSignIn(false);
                        }, 2000);
                    } else {
                        setEmailPop(true)
                        setTimeout(() => {
                            setEmailPop(false);
                        }, 2000);
                    }
                })
        } catch (e) {
        }
    }


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

    useEffect(() => {
        const storedToken = localStorage.getItem('authToken');
        if (storedToken) {
            setActiveSignIn(false);
        } else {
            setTimeout(() => {
                setActiveSignIn(true);
            }, 1500);
        }
    }, [])

    return (
        <div>
            <div className='banner'></div>
            <div className='landing'>
                <div className='landing-nav'>
                    <img src={nutrichefLogo} alt="logo" />
                    <p className='singleword'><span>{email[0] || signUpEmail[0]}</span></p>
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
                                <form action='POST'>
                                    <h1>Create Account</h1>
                                    <span>or use your email for registration</span>
                                    <input type="text" name="name" placeholder="Name" required onChange={(e) => { setSignUpName(e.target.value) }} />
                                    <input type="email" name="email" placeholder="Email" required onChange={(e) => { setSignUpEmail(e.target.value) }} />
                                    <input type="password" name="password" placeholder="Password" required onChange={(e) => { setSignUpPassword(e.target.value) }} />
                                    <button onClick={SubmitSignUp}>Sign Up</button>
                                    <button type="button" style={{ marginTop: "10px", backgroundColor: "transparent", color: "#269635" }} className='mobilebutton' onClick={toggleForm}>Sign In</button>
                                </form>
                            ) : (
                                <form action='POST'>
                                    <h1>Sign In</h1>
                                    <span>or use your account</span>
                                    <input type="email" name="email" placeholder="Email" required onChange={(e) => { setEmail(e.target.value) }} />
                                    <input type="password" name="password" placeholder="Password" required onChange={(e) => { setPassword(e.target.value) }} />
                                    <Link to="" id='fpassword'>Forgot Your Password</Link>
                                    <button onClick={SubmitSignIn}>Sign In</button>
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
                                    <h1>Hello, HealthNut!</h1>
                                    <p>Enter your details and start the journey with us</p>
                                    <button className="ghost" onClick={toggleForm}>Sign Up</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {pop && <div className='notice'>
                <div className='notice_2'>
                    <h4 className='notice_value'>Logged In</h4>
                </div>
            </div>}
            {popSignIn && <div className='notice'>
                <div className='notice_2'>
                    <h4 className='notice_value'>Signed In</h4>
                </div>
            </div>}
            {emailPop && <div className='notice'>
                <div className='notice_2'>
                    <h4 className='notice_value'>Email exists</h4>
                </div>
            </div>}
            {popIncorrect && <div className='notice'>
                <div className='notice_2'>
                    <h4 className='notice_value'>Invalid Credentials</h4>
                </div>
            </div>}
        </div>
    )
}

export default Landing;