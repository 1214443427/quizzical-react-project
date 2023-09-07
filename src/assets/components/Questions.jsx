import React, { useState } from "react";
import {nanoid} from "nanoid";
import Choices from "./Choices";
import {decode} from "html-entities"
import checkMark from "../imgs/check.svg"
import cross from  "../imgs/cross.svg"

export default function Questions({trivia, selectAnswer, check, trueFalse}){
    return(
        <div key = {trivia.id} className="questions">
            <div>
                <p>{decode(trivia.question)}</p>
                <div className="choices-div">
                    <Choices id={trivia.id} 
                    correct_answer={trivia.correct_answer} 
                    incorrect_answers={trivia.incorrect_answers} 
                    selected_answer={trivia.selected_answer}
                    selectAnswer={selectAnswer}
                    check = {check}
                    trueFalse = {trueFalse}
                    />
                </div>
            </div>
            <img 
                src={trivia.selected_answer==trivia.correct_answer? checkMark: cross}
                className={check? "notify check":"notify"}
            ></img>
        </div>
    )
}