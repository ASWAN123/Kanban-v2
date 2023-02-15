import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import { useContext } from 'react';
import { boardsContext } from '../../boardsContexts/boardsContext';
import { DragDropContext, Droppable , Draggable } from 'react-beautiful-dnd';



function Tasks({ columnid }) {
    let { defaultboard ,setDefaultboard, setShowTaskForm , boards  , setboards} = useContext(boardsContext)
    const [NewTask , setNewTask] = useState({})

    const handleTaskView = (task)=> {
        setShowTaskForm({mytask:task ,show:true , order:'view' , title:task.title})
    }








    return (
        <DragDropContext >
            <Droppable droppableId='tasks' >
                {(provided , snapshot)=> (
                    <div className='tasks' 
                    {...provided.droppableProps} 
                    ref={provided.innerRef}
                    style={{...provided.droppableProps.style , border:snapshot.isDraggingOver ? `1px dashed gray` : ''}}
                    >
                        {
                            [...defaultboard.columns].find((column)=> column.id == columnid).tasks.map((task , index)=> {
                                let id = task.id
                                return (<Draggable key={id} draggableId={id} index={index}>
                                            {(provided , snapshot)=> (
                                                <div 
                                                    key={task.id}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='task' 
                                                    // style={taskStyling(provided , snapshot)}
                                                    style = {{ ...provided.draggableProps.style , minWidth:snapshot.isDragging ? '250px' : '' , maxWidth:snapshot.isDragging ? '250px' : ''}}
                                                    onClick={()=>{setShowTaskForm({mytask:task ,show:true , order:'view' , title:task.title})}}
                                                    >
                                                    <h3 className='task-title'>{task.title}</h3>
                                                    <div className='details'>{task.subtasks.filter((subtask)=> subtask.isCompleted == true).length} of {task.subtasks.length} subtasks</div>
                                                </div>
                                            )}
                                        </Draggable>)

                            })
                        }
                        {provided.placeholder}
                    </div>
                )}
                
            </Droppable>
           
        </DragDropContext>
        
    )
}

export default Tasks ;
