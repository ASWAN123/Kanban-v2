import React, { useContext } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext'
import './Columns.css'
import Tasks from './Tasks'

function Columns() {
    const { defaultboard ,  setShowBoardForm , setShowTaskForm} = useContext(boardsContext)

    const editBoard = ()=> {
        setShowBoardForm({title:'Add New Column' , show:true, order:"update"})
    }

    return (
        <div className='columns'>
            {
                defaultboard.columns.map((column)=> {
                    return <div key={column.id} className='column'>
                        <p key ={column.id} className='column-title'>{column.name} ({column.tasks.length})</p>
                        <Tasks columnid = { column.id }  />
                    </div>
                })
            }

            <div className='column extra' onClick={()=>{editBoard()}}>
                <div className="tasks">
                    <button className='addNewBoardbutton' onClick={()=>{editBoard()}} >+ Add New Column</button>
                </div>
            </div>


        </div>
    )
}

export default Columns
