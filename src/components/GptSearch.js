import { backgroundImage } from "../utils/constants";
import GptMovieSuggestions from "./GptMovieSuggestions";
import GptSearchBar from "./GptSearchBar";

const GptSearch = ()=>{
    return (
    <div >
        <div className="absolute -z-50">
            <img src={backgroundImage} alt="Background Image"/>
        </div>
        <GptSearchBar/>
        <GptMovieSuggestions/>
    </div>)
}
export default GptSearch;