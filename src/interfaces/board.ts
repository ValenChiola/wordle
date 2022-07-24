export interface Cell {
    status?: 'correct' | 'almost' | 'error'
    letter: string
}

export type Board = Cell[][]