import Axios from 'axios'
import { useEffect, useState } from 'react'

const defaultWord = 'MUNDO'

export const useWord = (length: number = 5) => {
    const [word, setWord] = useState('')

    useEffect(() => {
        Axios.get<GetWordResponse>(`https://random-word-api.herokuapp.com/word?lang=es&length=${length}`)
            .then(({ data: [word] }) => setWord(word.toUpperCase()))
            .catch(() => setWord(defaultWord))
    }, [length])

    return [word]
}

type GetWordResponse = string[]
