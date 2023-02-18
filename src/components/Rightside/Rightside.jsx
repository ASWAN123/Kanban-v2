import React, { useContext, useEffect } from 'react'
import { boardsContext } from '../boardsContexts/boardsContext'
import Columns from './columns/Columns'
import './Rightside.css'


function Rightside() {
    const {defaultboard,setboards ,boards , setShowBoardForm} = useContext(boardsContext)


    useEffect(()=> {
        let Newboards = boards.map((board)=> board.id  == defaultboard.id ? defaultboard  : board )
        setboards(Newboards)
    } , [defaultboard])

    return (
        <div className='rightside'>
            <Columns  />
        </div>
    )
}

export default Rightside
