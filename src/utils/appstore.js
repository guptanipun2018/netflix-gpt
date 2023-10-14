import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./userSlice";
import moviesReducer from "./moviesSlice";
import gptReducer from "./gptSlice"
import configReducer from "./configSlice"
import needhelpReducer from "./needHelpSlice"
const appstore = configureStore(
    {
        reducer:{
            user:userReducer,
            movies: moviesReducer,
            gpt : gptReducer,
            config : configReducer,
            needhelp : needhelpReducer,
        },
    }
)
export default appstore;