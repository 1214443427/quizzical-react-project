import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Cover from './assets/components/Cover'
import Trivias from './assets/components/Trivias'
import {nanoid} from "nanoid"

function App() {
  const [trivias, setTravias] = useState([])
  const [quizStarted, setQuizStarted] = useState(false)
  const [scoreBoard, setScoreBoard] = useState({round:0, score:0})
  const [options, setOptions] = useState(
    {
      category: 0,
      type: "multiple",
      difficulty: "",
      amount: 5
    })
  const [category, setCategory] = useState([{id:9, name:"General knowledge"}])
  const [token, setToken] = useState({token:"", tokenEmpty:false, tokenReset:0})
  const [API_KEY, setAPI_KEY] = useState("https://opentdb.com/api.php?amount=5&category=22&type=multiple")
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function getCategory(){
      const res = await fetch("https://opentdb.com/api_category.php")
      const key = await res.json()
      setCategory([{id:0, name:"Any Category"},...key.trivia_categories])
    }
    getCategory()
  }, [])

  useEffect(()=> {
    async function apiToken(){ 
      const res = await fetch("https://opentdb.com/api_token.php?command=request")
      const key = await res.json()
      setToken(prevToken => ({...prevToken, token: key.token, tokenEmpty: false}))
    }
    apiToken()
  },[token.tokenReset])

  function startQuiz(){
    setAPI_KEY(`https://opentdb.com/api.php?amount=${options.amount}&category=${options.category}&
    difficulty=${options.difficulty}&type=${options.type}&token=${token.token}`)
    console.log("API_KEY:",`https://opentdb.com/api.php?
      amount=${options.amount}&
      category=${options.category}&
      difficulty=${options.difficulty}&
      type=${options.type}&token=${token.token}`)
    setScoreBoard(scoreboard=>(
      {...scoreboard, 
        round: scoreboard.round+1}))
    setQuizStarted(true);
    setToken(prevToken => ({...prevToken, tokenEmpty: false}))
  }

  function playAgian(){
    setScoreBoard(scoreboard=>(
      {...scoreboard, 
        round: scoreboard.round+1}))
    console.log("current score:", scoreBoard.score)
  }

  useEffect(()=> {
      async function pullTravia(){
        console.log("fetching")
        setLoading(true)
        const res = await fetch(API_KEY)
        const data = await res.json()
        if(data.response_code==0){
        setLoading(false)
        setTravias(data.results.map(trivia=>({
          id:nanoid(),
          question: trivia.question,
          correct_answer: trivia.correct_answer,
          incorrect_answers: trivia.incorrect_answers,
          selected_answer: ""
      })))
    }else{
      console.error(data.response_code);
      setLoading(false)
      setToken(prevToken => ({...prevToken, tokenEmpty: true}))
    }
    }
    pullTravia()
  }, [scoreBoard.round]);

  function selectOptions(event){
    const index = event.target.selectedIndex
    setOptions(prev=>
        ({
          ...prev,
          [event.target.name]:[event.target.name]=="category"? 
          category[index].id: event.target.value
        })
      )
  }

  function selectAnswer(event){
    const {name, value} = event.target
    setTravias(prevTrivias=>
        prevTrivias.map(prevTrivia=>prevTrivia.id==name?
            {
                ...prevTrivia,
                selected_answer: value
            }:prevTrivia
            )
        )
    event.target.classList.add("selected")
}

  function homepageOnClick(reset){
    setQuizStarted(false);
    if(reset==true){
      setToken(prevToken => ({...prevToken, tokenReset: prevToken.tokenReset+1}))
    }
  }

  return (
    <>
      {loading &&
        <div className='loader-container'>
          <div className='spinner'></div>
        </div>}
      {!quizStarted && 
        <Cover 
          start={startQuiz} 
          options={options} 
          categories={category} 
          selectOptions={selectOptions}
          /> }
      {quizStarted &&
       < Trivias 
        trivias={trivias}
        playAgian={playAgian} 
        selectAnswer={selectAnswer}
        homepageOnClick = {homepageOnClick}
        scoreSetter = {setScoreBoard}
        trueFalse = {options.type=="boolean"}
        tokenEmpty = {token.tokenEmpty}
        />}
    </>
  )
}

export default App
