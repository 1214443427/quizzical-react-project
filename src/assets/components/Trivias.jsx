import React, { useState } from "react";
import "./Trivias.css";
import {nanoid} from "nanoid";
import Questions from "./Questions";
import Confetti from "react-confetti"

export default function Trivias(props){
    
    const [checkAnswers, setCheckAnswers] = useState(false)
    const [score, setScore] = useState(0)
    const [confetti, setConfetti] = useState(false)
    /*
    const [selectedAnswers, setSelectedAnswers] = useState([])
    */

    function checkAnswersOnClick(){
        if(checkAnswers){
            props.playAgian();
            setCheckAnswers(false);
            setConfetti(false);
        }
        else{
            const scoreArray = props.trivias.map(answer=>answer.selected_answer==answer.correct_answer?1:0)
            const currentScore = scoreArray.reduce((sum,x)=>sum+x, 0)
            setScore(currentScore)
            props.scoreSetter(prevScoreBoard => ({...prevScoreBoard, score: prevScoreBoard.score + score}))
            setCheckAnswers(true)
            if(currentScore==5){
                console.log("confetti")
                setConfetti(true)
            }
        }
    }

    function allAnswered(){
        return props.trivias.reduce((selected, answer) => 
            selected && (answer.selected_answer != ""), true
        )
    }

    const QuestionComponents = props.trivias.map(trivia => {
        return <Questions 
            key={trivia.id} 
            trivia={trivia} 
            selectAnswer={props.selectAnswer} 
            check={checkAnswers}
            trueFalse={props.trueFalse}
            />
    })

    return(
        <div className="trivia-page">
            {confetti && <Confetti 
                width={window.innerWidth}
                height={window.innerHeight}
            />}
            {!props.tokenEmpty&&
            <div>
                {QuestionComponents}
                <div className="check-div">
                    {checkAnswers && <strong>You scored {score}/{props.trivias.length} correct answers</strong>}
                    <button 
                        className="check-button"
                        onClick={checkAnswersOnClick}
                        disabled={!allAnswered()}
                    >{checkAnswers?"Play agian":"Check answers"}
                    </button>
                    <button 
                        onClick={props.homepageOnClick}
                        >Back to homepage</button>
                </div>
            </div>}
            {props.tokenEmpty&& 
            <div>
                <p>You have exhausted all questions in this category</p>
                <button
                    onClick={props.homepageOnClick}
                    >Back to homepage</button>
                <button className="reset-bank-btn"
                    onClick={()=>props.homepageOnClick(true)}
                    >Reset question bank</button>
            </div>}
        </div>
    )
}