import React from 'react'
import { useContext } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext'
import { AiOutlineClose} from 'react-icons/ai';

function Subtasks(props) {
    const {showTaskForm } = useContext(boardsContext)
    let NewTask = props.NewTask ;
    let markasComplete = props.markasComplete
    let updateSubtask = props.updateSubtask
    let deleteSubtask = props.deleteSubtask
    
    return (
        <div className='subtaskslist'>
            {/* <h1>hello</h1>
            {console.log(NewTask)} */}
            {
                NewTask.subtasks.map((subtask , index)=> {
                    return <div  key={index} className={ showTaskForm.order == 'view' ? 'input-viewtasks':'input-subtasks'}>
                                {showTaskForm.order == 'view' && <input 
                                type='checkbox' 
                                checked={subtask.isCompleted}
                                onChange={ (e)=>  markasComplete(e , index )  }/>}
                                <input 
                                className={ (subtask.isCompleted && showTaskForm.order == 'view') ? "completed": "" } 
                                disabled={showTaskForm.order == 'view' ? true:false} 
                                type="text"
                                value={subtask.title} 
                                onChange={(e)=>{updateSubtask(e , index)}} />
                                {showTaskForm.order != 'view' && <AiOutlineClose 
                                onClick={()=>{deleteSubtask(index)}} 
                                className='closebutton' />}
                            </div>
                        })
            }
        </div>
    )
}

export default Subtasks;
