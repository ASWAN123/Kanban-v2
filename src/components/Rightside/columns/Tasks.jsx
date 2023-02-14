import React from 'react'
import { useContext } from 'react';
import { boardsContext } from '../../boardsContexts/boardsContext';

function Tasks({columnid}) {
    let { defaultboard , setShowTaskForm } = useContext(boardsContext)

    return (
        <div className='tasks'>
            {
                [...defaultboard.columns].find((column)=> column.id == columnid).tasks.map((task)=> {
                    return <div key={task.id}  className='task' onClick={()=>{setShowTaskForm({mytask:task ,show:true , order:'view' , title:task.title})}}>
                                <h3 className='task-title'>{task.title}</h3>
                                <div className='details'>{task.subtasks.filter((subtask)=> subtask.isCompleted == true).length} of {task.subtasks.length} subtasks</div>
                            </div>
                })
            }

            
        </div>
    )
}

export default Tasks ;
