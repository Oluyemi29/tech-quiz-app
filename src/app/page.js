'use client'
import Image from 'next/image'
import quizImage from '../../public/image/quiz-logo.png'
import winImage from '../../public/image/Trophypng.parspng.com-6-removebg-preview.png'
import Love from '../../public/image/72697809-handshake-heart-love-logo-vector-image-removebg-preview.png'
import loserImage from '../../public/image/try-again-text-symbol-stamp-red-rubber-stamp-sticker-icon-symbolize-trying-again-persistence-icon_896322-209-removebg-preview.png'
import {useEffect, useState }from 'react'
import Question from './question/question'

export default function Home() {
  const duration = 40 * 1000
  const [username, setUserName]=useState('')
  const [quizNotStart, setquizNotStart] = useState(true)
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [chooseAnswer, setChooseAnswer] = useState(false)
  const [selectedOption, setselectedOption] = useState('')
  const [goodAnswer,setGoodAnswer] = useState(0)
  const [badAnswer, setBadAnswer] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [loveIt, setLoveIt] = useState(false)
  const [time, setTime] = useState(duration)

  const handleRestart = () =>{
    setUserName('')
    setquizNotStart(true)
    setCurrentQuestion(0)
    setChooseAnswer(false)
    setselectedOption('')
    setGoodAnswer(0)
    setBadAnswer(0)
    setShowResult(false)
    setLoveIt(false)
    setTime(duration)
  }
  
  useEffect(()=>{
    
      const timing = setTimeout(()=>{
        setTime(time - 1000)
      },1000)
      return ()=>{
        clearTimeout(timing)
      }
  },[time])

const getTiming = (time)=>{
  const totalSeconds = time / 1000

  return (totalSeconds)
}
if(getTiming(time) === 0){
  if(chooseAnswer === false && quizNotStart === false && showResult === false){
    setBadAnswer(badAnswer + 1)
  }
  setChooseAnswer(false)
  if(Question.length === currentQuestion + 1){
    setShowResult(true)

  }
  if(quizNotStart === false && showResult === false){
    setCurrentQuestion(currentQuestion + 1)

  }
  setTime(duration)
}
  const qst = Question[currentQuestion]

  const handleChange = (e)=>{
    const {name,value} = e.target
    setUserName(value)
  }

  const handleSubmit = (e)=>{
    e.preventDefault()
    setquizNotStart(false)
    setTime(duration)
    console.log(username)
  }

  const handleOption = (options)=>{
    setChooseAnswer(true)
    setselectedOption(options) 
    if(options === qst.answer){
      setGoodAnswer(goodAnswer + 1)
    }
    if(options !== qst.answer){
      setBadAnswer(badAnswer + 1)
    }
  }

  const handleNext = ()=>{
    if(chooseAnswer === false){
      setBadAnswer(badAnswer + 1)
    }
    setChooseAnswer(false)
    if(Question.length === currentQuestion + 1){
      setShowResult(true)
    }
    setCurrentQuestion(currentQuestion + 1)
    setTime(duration)
  }

  const handleLove = ()=>{
    setLoveIt(true)
  }
  
  return (
    <div className='h-screen w-full flex flex-col text-center justify-center'>

    {quizNotStart? <>
    
      <div className='md:w-3/12 w-3/3 h-auto text-center border-2 border-white rounded-md p-5 m-auto'>
        
          <h1 className='text-white md:text-lg text-md mb-5'>Let`s get started!</h1>
          <Image 
          alt="Picture of the author"
          src={quizImage}
          className='w-[12rem] h-[12rem] rounded-full m-auto border-2 border-[#fac62a]'
          />
          <h1 className='text-white text-md font-bold'>Quiz on Technology and Gadgets</h1>
          <p className='text-sm text-white mt-1'>You can only choose answer once per question</p>
          <form onSubmit={handleSubmit}>
            <input placeholder='Enter Your Name'onChange={handleChange} value={username} className='h-10 mt-5 w-full rounded-sm px-5 border-2 border-[#fac62a]'/>
            <button disabled={!username? true : false} type='submit' className='bg-[#fac62a] text-black w-full mt-5 h-12 border-2 border-white rounded-sm font-bold'>Start Quiz</button>
          </form>
      </div>
    </> : <>
    <div className='md:w-3/12 w-3/3 h-auto text-center border-2 border-white rounded-md p-5 md:m-auto'>
    <div className='flex justify-between mb-2'>
      <div>
        <h4 className='text-sm text-white'>Right ✔️</h4>
        <h4 className='text-sm text-white'>{goodAnswer}</h4>
      </div>
      <div>
        <h4 className='text-sm text-white'>Wrong ❌</h4>
        <h4 className='text-sm text-white'>{badAnswer}</h4>
      </div>
      <div>
        <h4 className='text-sm text-white'>Score 🏆</h4>
        <h4 className='text-sm text-white'>{goodAnswer * 4}</h4>
      </div>
    </div>
          
        {showResult? <>
          <h4 className='text-white md:text-lg text-sm mb-3'>Hi {username? `${username}` : 'user'}</h4>
          <p className='text-sm text-white mb-3'>if you love the quiz, click on love it button</p>
          {loveIt? <>
          <Image 
          alt="Picture of the quiz"
          src={Love}
          className='w-[12rem] h-[12rem] bg-white rounded-full m-auto border-2 border-[#fac62a]'
          />
        <h3 className='text-white text-sm mt-5'>Contact me on adedokunoluyemi1@gmail.com</h3>
          
          </> : <>
          {goodAnswer * 4 > 70 ? <>
          <Image 
          alt="Picture of the quiz"
          src={winImage}
          className='w-[12rem] h-[12rem] bg-white rounded-full m-auto border-2 border-[#fac62a]'
          />
          <h3 className='text-white mt-5'>Congratulation, you get <span className='text-[#fac62a] text-sm'>{goodAnswer * 4}0 token</span></h3>
          
          </> : <>
          <Image 
          alt="Picture of the quiz"
          src={loserImage} 
          className='w-[12rem] h-[12rem] bg-white rounded-full m-auto border-2 border-[#fac62a]'
          />
        <h3 className='text-white mt-5'>Oppps, you get <span className='text-red-500 text-sm'>{goodAnswer * 4}0 token</span>, try again</h3>
          
          </>}
          
          </>}

        <button onClick={handleLove} className='bg-transparent text-white w-full mt-5 h-12 border-2 border-white rounded-sm font-bold'>Love It</button><br/>
        <button onClick={handleRestart} className='bg-[#fac62a] text-black w-full mt-5 h-12 border-2 border-white rounded-sm font-bold'>Retake The quiz</button>
        
        </> : <>
          <h1 className='text-white md:text-lg text-sm mb-5'>Hi {username? `${username}` : 'user'}</h1>
          <Image 
          alt="Picture of the quiz"
          src={quizImage}
          className='w-[6rem] h-[6rem] rounded-full m-auto border-2 border-[#fac62a]'
          />
            <h3 className='mb-5 mt-5 text-white'>{qst.question}</h3>
          <div className='flex justify-between'>
            <h3 className='text-white text-sm'>Question {currentQuestion + 1} of {Question.length}</h3>
            <h3 id={getTiming(time) < 11 ? 'smallTimmy' : getTiming(time) < 21 ? 'warning' : ''} className='text-white text-sm'>{getTiming(time)} seconds</h3>
          </div>
            <div className='text-center mt-2'>
              {qst?.option?.map((options)=>{
                return(
                <>
                  <button disabled={chooseAnswer? true : false} onClick={()=>handleOption(options)} id={chooseAnswer && options === qst.answer ? 'correctAnswer' : chooseAnswer && options === selectedOption ? 'wrongAnwser' : ''} className='bg-white font-bold border-2 border-[#faf9f7] text-[#814dfa] w-full h-auto rounded-md mb-2 p-1'>{options}</button>
                </>
                )
              })}
              
              <button onClick={handleNext} className='bg-white font-bold border-2 border-[#faf9f7] text-[#814dfa] w-1/4 h-auto rounded-md p-2 mt-5'>Next</button>
            </div>
        
        </>}
      </div>

    </>}
    </div>
  )
}
