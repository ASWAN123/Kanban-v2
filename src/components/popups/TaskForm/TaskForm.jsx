import React, { useContext, useState } from 'react'
import { useEffect } from 'react';
import { AiOutlineClose} from 'react-icons/ai';
import { boardsContext } from '../../boardsContexts/boardsContext'
import Settingbuttons from '../settingbuttons/Settingbuttons';
import { FiMoreVertical } from "react-icons/fi"
import './TaskForm.css'
import Subtasks from './Subtasks';
import { Dropdown } from './Dropdown';

function TaskForm(){

    const { setshowWarning  , hide  , setHide , defaultboard , showTaskForm ,setDefaultboard , boards , setboards , setShowTaskForm } = useContext(boardsContext)
    let obj = {id:Date.now() , title:'' , description:'' ,status:defaultboard.columns[0].name ,statusId:defaultboard.columns[0].id ,subtasks:[{title:'',isCompleted:false}]}
    let Task = showTaskForm.order == 'add'  ? obj : showTaskForm.mytask ; 
    const [NewTask , setNewTask] = useState({...Task}) ; 
    const [ sumbitchanges , setsubmitchanges ] = useState(false) ; 
    const [controlmenu , setControlMenu] = useState(false) ;
    

    const AddSubtaskColumn =(e)=> {
        e.preventDefault()
        let NewSubtasks = [...NewTask.subtasks , {title:'',isCompleted:false}]
        setNewTask({...NewTask , subtasks:NewSubtasks})
    }

    const updateSubtask = (e , x)=> {
        let NewSubtasks = [...NewTask.subtasks].map((subtask , index)=> index == x ? {...subtask , title:e.target.value} : subtask)
        setNewTask({...NewTask , subtasks:NewSubtasks})
    }

    const deleteSubtask = (x)=> {
        let NewSubtasks = [...NewTask.subtasks].filter((subtask , index)=> index != x)
        setNewTask({...NewTask , subtasks:NewSubtasks})
    }

    const pushmyTask = (e)=> {
        e.preventDefault()
        if(showTaskForm.order  == 'add'){
            let NewColumns = [...defaultboard.columns].map((column)=> column.id == NewTask.statusId ? {...column , tasks:[NewTask , ...column.tasks ]} : column)
            setDefaultboard({...defaultboard , columns:NewColumns})
            setShowTaskForm({...showTaskForm , show:false})
        }else{
            let NewColumns = [...defaultboard.columns].map((column)=> column.id == NewTask.statusId ? {...column , tasks:column.tasks.map((task)=> task.id == NewTask.id ? NewTask : task)} : column)
            setDefaultboard({...defaultboard , columns:NewColumns})
            setShowTaskForm({...showTaskForm , show:false})
        }

        

    }

    const changeColumn = (e)=> {
        e.preventDefault()
        if(showTaskForm.order == 'view' || showTaskForm.order == 'edit'){
            let NewColumns = defaultboard.columns.map((column)=> {
                if(column.name  == NewTask.status){
                    let NewTasks = [...column.tasks].filter((task)=> task.id != NewTask.id)
                    console.log(NewTasks)
                    return {...column , tasks:NewTasks}
                }
                return column
            })
    
            let updatetask = {...NewTask , status:e.target.value}
            let updateColumns = NewColumns.map((column)=> {
                if(column.name == updatetask.status){
                    let NewTasks = [...column.tasks]
                    NewTasks.unshift({...updatetask, status:column.name , statusId:column.id})
                    setNewTask({...updatetask, status:column.name , statusId:column.id})
                    return {...column , tasks:NewTasks}
                }
                return column
            })
            // setNewTask(updatetask)
            console.log(updatetask , 'attention')
            setsubmitchanges(!sumbitchanges)
            setDefaultboard({...defaultboard , columns:updateColumns})

        }else{
            let name  = e.target.value
            setNewTask({...NewTask , status:name , statusId:defaultboard.columns.find((column)=> column.name == name).id})
        }

        
        
    }

    // complete this  one  and  set  the  newtask  and  everything  will be  okay 
    const markasComplete = (e , x)=> {
        e.preventDefault()
        let checker = e.target.checked
        let NewSubtasks = [...NewTask.subtasks].map((subtask , index)=> index == x ? {...subtask , isCompleted:checker } : subtask )
        // console.log(NewSubtasks)
        setNewTask({...NewTask , subtasks:NewSubtasks})
        setsubmitchanges(!sumbitchanges)
    }


    

    // because NewTask has been updated we show update the default as well // here you have to make  another  expception
    useEffect(()=>{
        if(showTaskForm.order == 'view'){
            let Newcolumns = defaultboard.columns.map((column)=> {
                if(column.name == NewTask.status){
                    let newTasks = column.tasks.map((task)=> task.id == NewTask.id ? NewTask : task)
                    return {...column , tasks:newTasks}
                }
                return column
            })
            let updatedefaultboard ={...defaultboard , columns:Newcolumns}
            setDefaultboard(updatedefaultboard)
        }

    } , [sumbitchanges])

    // once the setdefaultboard  updated  change  the  the  default board
    useEffect(()=> {
        let Newboards = boards.map((board)=> board.id  == defaultboard.id ? defaultboard  : board )
        setboards(Newboards)
    } , [defaultboard])
    
    const editMethod= ()=> {
        setControlMenu(!controlmenu) ;
        // setShowTaskForm({...showTaskForm , show:false})
        setShowTaskForm({...showTaskForm , show:true , title:'Edit Task' ,order:"edit"})
    }

    const deleteMethod = ()=>{
        setControlMenu(!controlmenu) ;
        setshowWarning({show:true ,title:NewTask.title , order:"Delete this Task?" , task:NewTask}) ;
        setShowTaskForm({...showTaskForm , show:false})
    }

    return (
        <div className='effects'  >
            <form className='taskform' onSubmit={(e)=> {pushmyTask(e)}}>
                <p className='form-title'  >{showTaskForm.title}</p>

                <FiMoreVertical className='mysettingIcon' onClick={()=> {setControlMenu(!controlmenu)}} />
                { controlmenu && < Settingbuttons deleteMethod={deleteMethod } editMethod={editMethod} title={"Task"} /> }

                <div className={(showTaskForm.order == 'add' || showTaskForm.order=="edit" )? 'group':'group viewmode'}>
                    <label htmlFor="title" >Title</label>
                    <input 
                        value={NewTask.title} 
                        type="text"
                        name="title"
                        onChange={(e)=> {setNewTask({...NewTask , title:e.target.value})}}
                    />
                </div>
                
                {showTaskForm.order == 'view' && <p> {NewTask.description==undefined ? 'No description' : NewTask.description }</p> }
                
                <div className={(showTaskForm.order == 'add' || showTaskForm.order=="edit" )? 'group':'group viewmode'}>
                    <label htmlFor="description">Description</label>
                    <textarea
                        value={NewTask.description} 
                        name="description" cols="2" rows="4"
                        onChange={(e)=> {setNewTask({...NewTask , description:e.target.value})}}
                    ></textarea>
                </div>

                <div className='group'>
                    <label htmlFor="Subtasks">Subtasks</label>
                    <Subtasks NewTask={NewTask} markasComplete = {markasComplete} updateSubtask={updateSubtask} deleteSubtask={deleteSubtask} />
                </div>

                { NewTask.subtasks.length < 6 && showTaskForm.order != 'view' && <button type='button' className='addnewcolumn' onClick={(e)=>{ showTaskForm.order != 'view' ? AddSubtaskColumn(e) : setNewTask({...NewTask , statusId:e.target.value })}} >+Add New Subtasks</button>}
                <div className='group'>
                    <label htmlFor="column-dropdown">Status</label>   
                    <Dropdown NewTask={NewTask} changeColumn={changeColumn} />
                </div>
                { showTaskForm.order != 'view' && <button type='submit' className='savebutton'>{showTaskForm.order == "edit" ?'save changes' :'Create Task'}</button> }
            </form>
        </div>
    )
}

export default TaskForm ;
