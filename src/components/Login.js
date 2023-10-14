import { useRef, useState } from "react";
import Header from "./Header"
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile} from "firebase/auth"
import { auth } from "../utils/firebase";
import { backgroundImage, userDefaultImg } from "../utils/constants";
import { useNavigate } from "react-router-dom";

const Login=()=>{
    
    const [isSignInForm,setIsSignInForm] = useState(true);
    const name=useRef(null)
    const email=useRef(null);
    const password = useRef(null);
    const navigate = useNavigate();

    const[errorMessage,setErrorMessage] = useState(null)

    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm)
    }
    const toggleNeedHelp=()=>{
        navigate("/help")
    }
    const handleButtonClick=()=>{
        const message=checkValidData(email.current.value,password.current.value)
        setErrorMessage(message);
        if(message) return;

        if(!isSignInForm){
            createUserWithEmailAndPassword(auth,
                email.current.value,
                password.current.value
                )
                .then((userCredential) => {
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, 
                        photoURL: userDefaultImg
                      })
                      .then(() => {
                        
                      }).catch((error) => {
                        setErrorMessage(error.message)
                      });
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    // ..
                    setErrorMessage(errorCode +" "+errorMessage);
                });
        }else{
            signInWithEmailAndPassword(auth,
                email.current.value,
                password.current.value
                )
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode +" "+errorMessage);
                });

            }
    }
    return (
    <div> 
        <Header/> 
        <div className="absolute">
        <img 
        src={backgroundImage}
        alt="logo"
        />
        </div>
        <form onSubmit={(e)=> e.preventDefault()} className="w-3/12 mx-30 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">
                {isSignInForm?"Sign In":"Sign Up"}
            </h1>

            { !isSignInForm && 
            (<input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>)}
            <input ref = {email} type="text" placeholder="Email or phone number" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
            <input ref = {password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700 rounded-lg"/>
            <p className="text-red-500">
                {errorMessage}
            </p>

            <button className="p-4 my-4 bg-red-700 w-full rounded-lg hover:bg-red-900" onClick={handleButtonClick}>
            {isSignInForm?"Sign In":"Get Started"}
            </button>

            <div className="flex justify-between">
                <div>
                    <input type="checkbox" value="true" id="Remember me" />
                    <label for="Remember me" className="text-gray-500">Remember me</label>
                </div>
            
                <button className="text-gray-500 hover:underline" onClick={toggleNeedHelp}>Need help?</button>
                
            </div>

            <p className="py-4 cursor-pointer pt-[25%]" onClick={toggleSignInForm}>
            {isSignInForm?
                <div className="flex">
                    <p className="text-gray-500">New to Netflix?  </p>
                    <p className="hover:underline">Sign Up Now</p>
                </div>:
                <div className="flex">
                <p className="text-gray-500">Already Registered?  </p>
                <p className="hover:underline">Sign In Now</p>
                </div>
            }
            </p>
            
        </form>
    </div>
    );
}

export default Login