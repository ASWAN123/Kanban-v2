import React, { useContext } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext'
import './Columns.css'
import Tasks from './Tasks'

function Columns(props) {
    let columns = props.columns
    const { setShowBoardForm} = useContext(boardsContext)

    const editBoard = ()=> {
        setShowBoardForm({title:'Add New Column' , show:true, order:"update"})
    }

    return (
        <div className='columns'>
            {
                columns.map((column)=> {
                    return <div key={column.id} className='column'>
                        <p key ={column.id} className='column-title'>{column.name} ({column.tasks.length})</p>
                        <Tasks tasks = {column.tasks}/>
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
