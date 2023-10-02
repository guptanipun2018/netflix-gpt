import { useSelector } from "react-redux";
import lang from "../utils/langConstants";
import { useRef } from "react";
import openAi from "../utils/openAi";

const GptSearchBar = ()=>{
    const langKey = useSelector(store=>store.config.lang)
    const searchtext = useRef(null)
    const handleGptSearchClick = async()=>{

    const gptQuery = "Act as a Movie Recommendation system and suggest some movies for the query: "+
    searchtext.current.value + 
    ". only give me names of 5 movies, comma seprated like the example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya"


    const gptResults = await openAi.chat.completions.create({
    messages: [{ role: 'user', content: 'Say this is a test' }],
    model: 'gpt-3.5-turbo',
    });
    console.log(gptResults.choices)
    }


    return (
    <div className="pt-[10%] flex justify-center">
        <form className=" w-1/2 bg-black grid grid-cols-12" onSubmit={(e)=>e.preventDefault()}> 
        <input 
            ref = {searchtext}
            type="text" 
            className="p-4 m-4 col-span-9 " 
            placeholder={lang[langKey].gptSearchPlaceholder}/>
            <button className="m-4 py-2 px-4 bg-red-700 col-span-3 text-white rounded-lg " 
            onClick={handleGptSearchClick}> 
            {lang[langKey].search}
            </button>
        </form>
    </div>
    )
}
export default GptSearchBar;