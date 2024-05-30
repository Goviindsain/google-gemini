import { createContext } from "react";
import { useState } from "react";
import run from "../config/gemini";
import { flushSync } from "react-dom";

export const Context = createContext();

const ContextProvider = (props) => {

    const [input, setinput] = useState("");
    const [recentPrompt, setrecentPrompt] = useState("");
    const [prevPrompts, setprevPrompts] = useState([]);
    const [showResult, setshowResult] = useState(false);
    const [loading, setloading] = useState(false);
    const [result, setresult] = useState("");

    const delayPara = (index, nextWord) => {
        setTimeout(() => {
            setresult(prev => prev + nextWord);
        }, 75 * index);
    }

    const newChat = () => {
      setloading(false)
      setshowResult(false)
    }
    

    const onSent = async (prompt) => {

        setresult("") 
        setloading(true)
        setshowResult(true)
        let response;
        if(prompt !== undefined)
            {
                response = await run(prompt);
                setrecentPrompt(prompt)
            }
            else{
                setprevPrompts(prev=>[...prev, input])
                setrecentPrompt(input)
                response = await run(input)
            }

        
        let responseArr = response.split("**");
        let newResponse = "";
        for (let i = 0; i < responseArr.length; i++) {
            if (i == 0 || i % 2 !== 1) {
                newResponse += responseArr[i];
            }
            else {
                newResponse += "<b>" + responseArr[i] + "</b>";
            }
        }

        let newResponse2 = newResponse.split("*").join("</br>")
        let newresarr = newResponse2.split(" ");
        for (let i = 0; i < newresarr.length; i++) {
            const nextWord = newresarr[i];
            delayPara(i, nextWord + " ")
            
        }
        setloading(false)
        setinput("")
    }



    const contextValue = {
        prevPrompts,
        setprevPrompts,
        onSent,
        setrecentPrompt,
        recentPrompt,
        showResult,
        loading,
        result,
        input,
        setinput, 
        newChat
    }


    return (
        <Context.Provider value={contextValue}>
            {props.children}
        </Context.Provider>

    )
}

export default ContextProvider