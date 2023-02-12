import React, { useContext } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext';
import './ShowWarning.css'

function ShowWarning() {
    const {showwarning , setshowWarning , boards , setboards , setDefaultboard , defaultboard } = useContext(boardsContext)

    const deleteBoard = ()=> {
        let Newboards = boards.filter((board)=> board.id != defaultboard.id)
        setboards(Newboards)
        setDefaultboard(Newboards[0])
        setshowWarning({show:false , title:''})
    }

    return (
        <div className='warning'>
            <h3 className='myorder'>{showwarning.order}</h3>
            <p>Are you sure you want to delete the '{showwarning.title}' board? This action will remove all columns and tasks and cannot be reversed.
            </p>
            <div className='buttons'>
                <button className='Delete' onClick={deleteBoard}>Delete</button>
                <button className='Cancel' onClick={()=>{setshowWarning({show:false , title:''})}}>Cancel</button>
            </div>
        </div>
    )
}

export default ShowWarning ;
