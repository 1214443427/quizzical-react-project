import React from "react";
import {nanoid} from "nanoid";
import { useState } from "react";
import "./Trivias.css";
import {decode} from "html-entities"

export default function Choices({id, correct_answer, incorrect_answers, selected_answer, selectAnswer, check, trueFalse}){

    //Fisher-Yates (aka Knuth) Shuffle from https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
    function shuffle(array) {
        if(trueFalse){
            return array[0]=="True"? array:[array[1],array[0]]
        }

        let currentIndex = array.length,  randomIndex;
    
        while (currentIndex != 0) {
    
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
    
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
    
        return array;
    }

    const [choices, setChoices] = useState(shuffle([...incorrect_answers, correct_answer]))

    
    const ChoicesComponent = choices.map(choice=>{
        return(
        <label key={nanoid()} className= {
            (check? "check ": "") +
            (selected_answer === choice? "selected choicesLabels ":"choicesLabels ") +
            (choice==correct_answer? "correct":"incorrect")
            }>
            <input 
                type = "radio"
                name={id}
                className="choices"
                checked={selected_answer === choice}
                value={choice}
                onChange={selectAnswer}
                />
            {decode(choice)}            
        </label>
        )}
        )
    return(
        ChoicesComponent
        )
}