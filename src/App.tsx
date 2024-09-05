import { useState, useEffect } from 'react'
import Die from './Die'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {
    const [dice, setDice] = useState(allNewDice())
    const [tenzies, setTenzies] = useState(false)

    useEffect(() => {
        const firstValue = dice[0].value
        const allSameValues = dice.every((die) => die.value === firstValue)
        const allHeld = dice.every((die) => die.isHeld)
        if (allSameValues && allHeld) {
            setTenzies(true)
        }
    }, [dice])

    function allNewDice() {
        const diceArray = []
        for (let i = 0; i < 10; i++) {
            diceArray[i] = {
                value: Math.ceil(6 * Math.random()),
                isHeld: false,
                id: nanoid(),
            }
        }
        return diceArray
    }

    function handleClick(_e: React.MouseEvent<HTMLButtonElement>): void {
        if (tenzies) {
            setTenzies(false)
            setDice(allNewDice)
        } else {
            setDice((prevDice) =>
                prevDice.map((die) => ({
                    ...die,
                    value: die.isHeld
                        ? die.value
                        : Math.ceil(6 * Math.random()),
                }))
            )
        }
    }

    function holdDice(id: string) {
        setDice((prevDice) =>
            prevDice.map((die) => ({
                ...die,
                isHeld: die.id === id ? !die.isHeld : die.isHeld,
            }))
        )
    }

    const diceElements = dice.map((die) => (
        <Die
            key={die.id}
            value={die.value}
            isHeld={die.isHeld}
            handleClick={() => holdDice(die.id)}
        />
    ))

    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">
                Roll until all dice are the same. Click each die to freeze it at
                its current value between rolls.
            </p>
            <div className="dice-container">{diceElements}</div>
            <button className="roll-btn" id="roll-btn" onClick={handleClick}>
                {tenzies ? 'New Game' : 'Roll'}
            </button>
        </main>
    )
}

export default App
