import { useNavigate } from "react-router-dom"
import { auth } from "../utils/firebase";
import { onAuthStateChanged, signOut } from "@firebase/auth";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { addUser, removeUser } from "../utils/userSlice";
import { logo, supported_languages, userImage } from "../utils/constants";
import { toggleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";

const Header=()=>{
    const user = useSelector(store => store.user);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const showGptSearch = useSelector((store)=> store.gpt.showGptSearch)
    const handleSighOut= () => {
        signOut(auth)
        .then(() => {
          }).catch((error) => {
            navigate("/error")
          });
    }
    useEffect(()=>{
        onAuthStateChanged(auth, (user) => {
            if (user) {
          
              const {uid,email,displayName,photoURL} = user;
              dispatch(
                addUser(
                    {uid:uid,
                    email:email,
                    displayName:displayName,
                    photoURL:photoURL}))
              navigate("/browse")
            } else {

              dispatch(removeUser())
              navigate("/")
              
            }
          });
    },[])

    const handleGptSearchClick=()=>{
        dispatch(toggleGptSearchView());
    }
    const handleLanguageChange=(e)=>{
        dispatch(changeLanguage(e.target.value))
    }
    return( 
    <div className=" absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex justify-between">
        <img className="w-44 h-20 " src={logo}
        alt="logo"
        />
        {user && (
        <div className="flex p-2">
            {showGptSearch &&
              (  <select className="bg-gray-700 text-white p-2 m-2 rounded-lg" onChange={handleLanguageChange}>
                {supported_languages.map((lang)=>(
                    <option key={lang.identifier} value={lang.identifier}>{lang.name}</option>
                ))}
            </select>)}
            <button className="py-2 px-4 m-2 bg-purple-800 text-white rounded-lg hover:bg-purple-900"
            onClick={handleGptSearchClick}> {showGptSearch? "HomePage":"GPT Search"}</button>
            <img className="w-12 h-12" src={userImage}/>
            <button onClick={handleSighOut} className=" font-bold text-red-700 hover:text-red-800">Sign out</button>
        </div>
        )}
    </div>
    )
}

export default Header