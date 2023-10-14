import { logo, needHelpBackground } from "../utils/constants";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import 'react-phone-number-input/style.css'
import PhoneInput from "react-phone-number-input";
import { isClickableInput } from "@testing-library/user-event/dist/utils";
import { auth } from "../utils/firebase"; 
import {RecaptchaVerifier} from 'firebase/auth'
import OtpInput from "otp-input-react"


const NeedHelpRenderPage = ()=>{
    const [otp,setOtp] = useState();
    const navigate = useNavigate();
    const [value, setValue] = useState()
    const toggleSignIn=()=>{
        navigate("/");
    }
    const toggleVerifyOTP=()=>{
        if(!click){
            navigate("/help/verify_otp")
        }
    }
    const [click,setClick] = useState(true);
    const toggleEmailClick=()=>{
        setClick(true);
    }
    const toggleTextClick=()=>{
        setClick(false);
    }
    const [show,setShow] = useState(false);
    const toggleCantRemember =()=>{
        setShow(!show);
    }

    // function onCaptchaVerify(){
    //     if(!window.recaptchaVerifier){
    //         window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
    //             'size': 'invisible',
    //             'callback': (response) => {},
    //             'expired-callback': () => {}
    //           },
    //           auth
    //           );
              
    // }
    // const onSignInSubmit=(event)=>{
    //     event.preventDefault();
    //     const phoneNumber = getPhoneNumberFromUserInput();
    //     const appVerifier = window.recaptchaVerifier;

    //     const auth = getAuth();
    //     signInWithPhoneNumber(auth, phoneNumber, appVerifier)
    //         .then((confirmationResult) => {
    //         // SMS sent. Prompt user to type the code from the message, then sign the
    //         // user in with confirmationResult.confirm(code).
    //         window.confirmationResult = confirmationResult;
    //         // ...
    //         }).catch((error) => {
    //         // Error; SMS not sent
    //         // ...
    // });
    // }
    
    return(
        <div >
            <div className=" absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
            <img className="w-45 h-20 " src={logo}
             alt="logo"
            />
            <button className="text-red-600 text-xl hover:underline " onClick={toggleSignIn}> Sign In</button>
            </div>
            
             <img src={needHelpBackground} alt="Background Image" className="w-screen absolute"/>
            <form className="w-4/12 bg-gray-100 text-black absolute mx-30 p-12 my-28 align-center mx-auto right-0 left-0">
               
                <h1 className=" text-3xl">Frogot Email/Password</h1>
                <h4 className="my-4 text-gray-700">How would you like to reset your password?</h4>
                <div className="m-2 " >
                <input  type="radio" value="" id="Email" className="rounded-full shadow" name="default-radio" onClick={toggleEmailClick}/>
                    <label for="Email" className="p-2 text-gray-700">Email</label>
                </div>
                <div className="m-2">
                    <input type="radio" value="" id="text" className="shadow" name="default-radio" onClick={toggleTextClick}/>
                    <label for="text" className="p-2 text-gray-700">Text Message (SMS)</label>
                </div>

                <h4 className="my-4 text-gray-700">
                    {click?"We will send you an email with instructions on how to reset your password.":"We will text you a verification code to reset your password. Message and data rates may apply."}
                </h4>
                {click?<input type="text" placeholder="name@email.com" className="p-4 my-4 w-full bg-white border border-gray-400 onClick:border-gray-500"/> :
                <PhoneInput
                className="p-4 my-4 w-full bg-white border border-gray-400 onClick:border-gray-500"
                    placeholder="Enter phone number"
                    value={value}
                    onChange={setValue}/>
                    }
                    
                <button className="bg-blue-500 w-full text-white h-10 hover:bg-blue-400 my-2" onClick={toggleVerifyOTP}>{click?"Email Me":"Text Me"}</button>

                <a className="text-blue-500 hover:underline" onClick={toggleCantRemember}>I can't remember my email address or phone number.</a>
                <h2 className="my-4">
                    {show &&  <div className="flex ">
                        <h4 className="text-gray-700">Please Create New Account:</h4> 
                        <a className="text-blue-500 hover:underline mx-2" href="http://localhost:3001/"> Sign In</a>
                    </div>  }
                </h2>
            </form>
        </div>
        
    )
}
export default NeedHelpRenderPage;