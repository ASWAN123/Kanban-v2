import React, { useContext } from 'react'
import './Leftside.css'
import { boardsContext } from "../boardsContexts/boardsContext"
import Boardslist from './boardsList/boardslist'


function Leftside() {
    const {setShowBoardForm ,  boards , setboards , defaultboard , myrequest , setmyrequest} = useContext(boardsContext)
    const createClicked = ()=> {
        setShowBoardForm({
            title:'Add New Board' ,
            order :'create',
            show:true,
          })
    }

    return (
        <div className='leftside'>
            <p className='boards'>All Boards ({boards.length})</p>
            <Boardslist />
            <button className='addboard' onClick={()=> {createClicked()}} >+ Create New Board</button>
        </div>
    )
}

export default Leftside
