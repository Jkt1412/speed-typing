import React , {useState , useEffect , useRef} from "react"

function App(){

    const START_TIME = 5

    const [words , setWords] = useState("")
    const [timeRemaining , settimeRemaining] = useState(START_TIME)
    const [runGame , setrunGame] = useState(false)
    const [wordCount, setwordCount] = useState(0)
    const inputRef = useRef(null)

    function countWords(text){
        const wordsArray = text.trim().split(" ")
        return wordsArray.filter(word => word !== "").length
    }

    function startGame(){
        setrunGame(true)
        settimeRemaining(START_TIME)
        setWords("")
        setwordCount(0)
        inputRef.current.disabled = false
        inputRef.current.focus()
    }

    function endGame(){
        setrunGame(false)
        const numWords = countWords(words)
        setwordCount(numWords)
    }

    useEffect(() => {
        if(timeRemaining > 0 && runGame){
            setTimeout(() => {
                settimeRemaining(prevTime => prevTime - 1)
            } , 1000)
    }else if (timeRemaining === 0){
        endGame()
    }
    } , [timeRemaining , runGame])


    return (
        <div>
            <h1> Speed Typing Game </h1>
            <textarea ref={inputRef} disabled={!runGame} value={words} onChange={(event) => {setWords(event.target.value)}} />
            <h1>Time Remaining : {timeRemaining} </h1>
            <button disabled={runGame} onClick={()=> startGame()}> Start Game </button>
            <h1> Word Count :  {wordCount}</h1>
        </div>
    )
}

export default App