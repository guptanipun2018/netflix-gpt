import { backgroundImage } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = ()=>{
    return (
    <div className=" absolute -z-10">
        <div>
            <img src={backgroundImage} alt="Background Image"/>
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>)
}
export default GptSearch;