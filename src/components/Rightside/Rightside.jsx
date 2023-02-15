import React, { useContext, useEffect } from 'react'
import { boardsContext } from '../boardsContexts/boardsContext'
import Columns from './columns/Columns'
import './Rightside.css'


function Rightside() {
    const {defaultboard,setboards ,boards , setShowBoardForm} = useContext(boardsContext)

    const editBoard = ()=> {
        setShowBoardForm({title:'Add New Column' , show:true, order:"update"})
    }


    useEffect(()=> {
        let Newboards = boards.map((board)=> board.id  == defaultboard.id ? defaultboard  : board )
        setboards(Newboards)
    } , [defaultboard])

    return (
        <div className='rightside'>
            <Columns  />
            {/* <div className='column extra' onClick={()=>{editBoard()}}>
                <div className="tasks">
                    <button className='addNewBoardbutton' onClick={()=>{editBoard()}} >+ Add New Column</button>
                </div>
            </div> */}
        </div>
    )
}

export default Rightside
