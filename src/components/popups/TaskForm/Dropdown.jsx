import React from 'react'
import { useContext } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext'

export const Dropdown = (props) => {
    const {defaultboard } = useContext(boardsContext)
    let NewTask = props.NewTask
    let changeColumn = props.changeColumn

    return (
        <select value={NewTask.status}  className='column-dropdown' name="column-dropdown" onChange={(e)=>{changeColumn(e)}} >
        {
            defaultboard.columns.map((column)=> {
                return <option
                    key={column.id}
                    value={column.name}
                    >{column.name}</option>
            })
        }
    </select>
    )
}
