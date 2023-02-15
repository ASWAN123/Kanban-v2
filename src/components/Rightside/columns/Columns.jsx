import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext'
import './Columns.css'
import Tasks from './Tasks'
import { DragDropContext, Droppable , Draggable } from 'react-beautiful-dnd';

function Columns() {
    const {setDefaultboard , boards  , setboards ,defaultboard  ,  setShowBoardForm , setShowTaskForm} = useContext(boardsContext)
    const [NewTask , setNewTask] = useState({})






    return (
        <div className='columns'  >
            {
                defaultboard.columns.map((column)=> {
                    return <div 
                        key={column.id} className='column'>
                        <p key ={column.id} className='column-title'>{column.name} ({column.tasks.length})</p>
                        <Tasks setNewTask={setNewTask} columnid = { column.id }  />
                    </div>
                })
            }
        </div>
    )
}

export default Columns
