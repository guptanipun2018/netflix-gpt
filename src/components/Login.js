import { useRef, useState } from "react";
import Header from "./Header"
import { checkValidData } from "../utils/validate";
import {createUserWithEmailAndPassword,signInWithEmailAndPassword, updateProfile} from "firebase/auth"
import { auth } from "../utils/firebase";
import { backgroundImage, userDefaultImg } from "../utils/constants";

const Login=()=>{
    
    const [isSignInForm,setIsSignInForm] = useState(true);

    const name=useRef(null)
    const email=useRef(null);
    const password = useRef(null);

    const[errorMessage,setErrorMessage] = useState(null)

    const toggleSignInForm=()=>{
        setIsSignInForm(!isSignInForm)
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
        <form onSubmit={(e)=> e.preventDefault()} className="w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white bg-opacity-80">
            <h1 className="font-bold text-3xl py-4">
                {isSignInForm?"Sign In":"Sign Up"}
            </h1>
            { !isSignInForm && 
            (<input type="text" placeholder="Full Name" className="p-4 my-4 w-full bg-gray-700"/>)}
            <input ref = {email} type="text" placeholder="Email Address" className="p-4 my-4 w-full bg-gray-700"/>
            <input ref = {password} type="password" placeholder="Password" className="p-4 my-4 w-full bg-gray-700"/>
            <p className="text-red-500">
                {errorMessage}
            </p>
            <button className="p-4 my-4 bg-red-700 w-full rounded-lg" onClick={handleButtonClick}>
            {isSignInForm?"Sign In":"Sign Up"}
            </button>
            <p className="py-4 cursor-pointer " onClick={toggleSignInForm}>
            {isSignInForm?"New to Netflix? Sign Up Now":"Already Registered? Sign In Now"}
                
            </p>
        </form>
    </div>
    );
}

export default Login