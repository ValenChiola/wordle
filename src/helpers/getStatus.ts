import { Cell } from "../interfaces/board"

export const getStatus = (word: string, letter: string, letterIndex: number): Cell['status'] => {

    const wordSplitted = word.split('')
    const index = wordSplitted.indexOf(letter)
    const letters = wordSplitted.filter(item => item === letter)

    if (letters.length === 0) return 'error'

    if (letters.length === 1) {
        if (index !== letterIndex) return "almost"
        return 'correct'
    }

    return wordSplitted
        .map((item, i) => (item === letter ? i : false))
        .filter(Boolean)
        .some((index) => index === letterIndex)
        ? "correct"
        : "almost";
}
