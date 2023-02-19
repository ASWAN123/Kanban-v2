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


    const createClicked = ()=> {
        setShowBoardForm({
            title:'Add New Board' ,
            order :'create',
            show:true,
          })
    }

    return (
        <div className='rightside'>
            {boards.length > 0 &&  <Columns  /> }
            { boards.length == 0 && <div className='nothing'>
                <p>This board is empty. Create a new column to get started.</p>
                <button className='firstboard' onClick={()=> {createClicked()}} >+ Create New Board</button> 
                </div> }
        </div>
    )
}

export default Rightside
