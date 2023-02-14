import React, { useContext } from 'react'
import { useEffect } from 'react';
import { boardsContext } from '../../boardsContexts/boardsContext';
import './ShowWarning.css'

function ShowWarning() {
    const {   showwarning , setshowWarning , boards , setboards , setDefaultboard , defaultboard } = useContext(boardsContext)

    const deletejob = ()=> {
        if(showwarning.task){
            console.log(showwarning)
            let NewColumns = defaultboard.columns.map((column)=> {
                if (column.name  == showwarning.task.status || column.id  == showwarning.task.statusId ){
                    return {...column , tasks:column.tasks.filter((Task)=> Task.id != showwarning.task.id)}
                }
                return column
            })
            console.log({...defaultboard , columns:NewColumns})
            setDefaultboard({...defaultboard , columns:NewColumns})
            setshowWarning({show:false , title:''})
            

        }else{
            let Newboards = boards.filter((board)=> board.id != defaultboard.id)
            setboards(Newboards)
            setDefaultboard(Newboards[0])
            setshowWarning({show:false , title:''})
        }

    }
    
    useEffect(()=> {
        let Newboards = boards.map((board)=> board.id  == defaultboard.id ? defaultboard  : board )
        setboards(Newboards)
    } , [defaultboard])





    return (
        <div className='warning'>
            <h3 className='myorder'>{showwarning.order}</h3>
            <p>Are you sure you want to delete the '<span className = "Board-title">{showwarning.title}</span>' board? This action will remove all columns and tasks and cannot be reversed.
            </p>
            <div className='buttons'>
                <button className='Delete' onClick={deletejob}>Delete</button>
                <button className='Cancel' onClick={()=>{setshowWarning({show:false , title:''})}}>Cancel</button>
            </div>
        </div>
    )
}

export default ShowWarning ;
