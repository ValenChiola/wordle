import { Board, Cell } from "../interfaces/board"

export const getNewBoard = () => {
    const board: Board = []

    for (let i = 0; i < 5; i++) {
        const row: Cell[] = []
        for (let j = 0; j < 5; j++) {
            row.push({
                letter: ''
            })
        }
        board.push(row)
    }

    return board
}
