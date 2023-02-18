import React, { useContext } from 'react'
import { useEffect } from 'react'
import { useState } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext'
import './Columns.css'
import { DragDropContext, Droppable , Draggable } from 'react-beautiful-dnd';
import {AiFillPlusCircle} from "react-icons/ai"
import {FaTasks} from "react-icons/fa"
// fro  tasks



function Columns() {
    let colors = ['#049624', '#FFB399', '#e2b00b', '#d81f47', '#00B3E6', 
    '#107c34', '#3366E6', '#646455'] ;
    const {setDefaultboard , boards  , setboards ,defaultboard  ,  setShowBoardForm , setShowTaskForm} = useContext(boardsContext)
    const [NewTask , setNewTask] = useState({})

    const handleTaskView = (task)=> {
        setShowTaskForm({mytask:task ,show:true , order:'view' , title:task.title})
    }
    const editBoard = ()=> {
        setShowBoardForm({title:'Add New Column' , show:true, order:"update"})
    }


    const dragend = (results) => {
        if(!results.destination) return ;
        if(results.source.droppableId === results.destination.droppableId){
            let targetColumn = [...defaultboard.columns].find( column => column.id == results.source.droppableId ) ;
            let  mytask = targetColumn.tasks.find( task => task.id == results.draggableId)
            if(results.source.index !== results.destination.index){
                let Newtasks = targetColumn.tasks.filter( task => task.id !== results.draggableId ) ;
                Newtasks.splice(results.destination.index , 0 , mytask) ;
                targetColumn['tasks'] = Newtasks ;
                let newcolumns = [...defaultboard.columns].map( column => column.id === results.source.droppableId ? targetColumn : column ) ; 
                setDefaultboard({...defaultboard , columns:newcolumns }) ;
            }

        }else{
            let  mytask = [...defaultboard.columns].find( column => column.id == results.source.droppableId ).tasks.find( task => task.id == results.draggableId)

            let removetaskfromColumns = [...defaultboard.columns].map((column)=> {
                if(column.id  == results.source.droppableId ){
                    let Newtasks = column.tasks.filter( task => task.id !== results.draggableId ) ;
                    return {...column ,  tasks:Newtasks}
                }
                return column
            })


            let addtasktoColums = removetaskfromColumns.map((column)=> {
                if (column.id  == results.destination.droppableId ){
                    let Newtasks = [...column.tasks]
                    Newtasks.splice( results.destination.index , 0 , {...mytask , status:column.name , statusId:column.id} )
                    return {...column ,  tasks:Newtasks}
                }
                return column
            })
            setDefaultboard({...defaultboard , columns:addtasktoColums }) ;
        }
    }


    useEffect(() => {
        let Newboards = boards.map((board)=> board.id  == defaultboard.id ? defaultboard  : board )
        setboards(Newboards)
    } , [defaultboard])


    return (
        <div className='columns'  >
            <DragDropContext onDragEnd={ results => dragend(results) }>
            {
                [...defaultboard.columns].map((column , index)=> {
                    return <Droppable droppableId={column.id} key={column.id}>
                        {(provided , snapshot)=> {
                            return (
                            <div 
                                {...provided.droppableProps}
                                ref={provided.innerRef}
                                key={column.id} className='column' style={{border: `3px dashed ${colors[index]}`  , borderBottom: `1px solid transparent` }} >
                                <div className='column-circle' style={{borderBottom: `3px dashed ${colors[index]}` }} > <div className='circle' style={{background: colors[index] }} ></div> <p key ={column.id} className='column-title'>{column.name} ({column.tasks.length})</p></div>
                                {
                                    column.tasks.map((task , index)=> {
                                        return <Draggable key={task.id} draggableId={task.id} index={index} >
                                            {(provided , snapshot)=> {
                                                return ( 
                                                <div 
                                                    key={task.id}
                                                    ref={provided.innerRef}
                                                    {...provided.draggableProps}
                                                    {...provided.dragHandleProps}
                                                    className='task' 
                                                    // style={taskStyling(provided , snapshot)}
                                                    style = {{ ...provided.draggableProps.style , minWidth:snapshot.isDragging ? '270px' : '' , maxWidth:snapshot.isDragging ? '270px' : '' , backgroundColor:snapshot.isDragging ? '#a9c4bb':''}}
                                                    onClick={()=>{setShowTaskForm({mytask:task ,show:true , order:'view' , title:task.title})}}
                                                    >
                                                    <h3 className='task-title'>{task.title}</h3>
                                                    <div className='details'> <FaTasks />{task.subtasks.filter((subtask)=> subtask.isCompleted == true).length} of {task.subtasks.length} subtasks</div>
                                                </div>)
                                            }}
                                        </Draggable>
                                    })
                                    
                                }
                                {/* {provided.placeholder} */}
                                {provided.placeholder && <div style={{ display: 'none' }}>{provided.placeholder}</div>}
                                    
                            </div>)
                        }}
                    </Droppable>

                })
            }
            </DragDropContext>
            <div className='column extra'>
                    <AiFillPlusCircle onClick={()=>{editBoard()}} className='plusbutton'/>
            </div>
        </div>
    )
}

export default Columns
