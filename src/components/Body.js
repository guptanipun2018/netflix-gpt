import { RouterProvider, createBrowserRouter} from "react-router-dom"
import Login from "./Login"
import Browse from "./Browse"
import NeedHelpRenderPage from "./NeedHelpRenderPage"
import VerifyOTP from "./VerifyOTP"
const Body=()=>{
  
    
    const approuter = createBrowserRouter([
        {
            path: "/",
            element: <Login/>
        },
        {
            path: "/browse",
            element:<Browse/>
        },
        {
            path: "/help",
            element:<NeedHelpRenderPage/>
        },
        {
            path:"/help/verify_otp",
            element:<VerifyOTP/>
        }
    ])

   
    return (
    <div> <RouterProvider router={approuter}/>
    </div>
    )
}

export default Body
