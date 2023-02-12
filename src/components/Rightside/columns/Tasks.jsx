import React from 'react'

function Tasks(props) {
    let tasks = props.tasks ;

    return (
        <div className='tasks'>
            {
                tasks.map((task)=> {
                    return <div key={task.id}  className='task'>
                                <h3 className='task-title'>{task.title}</h3>
                                <div className='details'>2 of 6 subtasks</div>
                            </div>
                })
            }

            
        </div>
    )
}

export default Tasks ;
