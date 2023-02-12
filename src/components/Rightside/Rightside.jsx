import React, { useContext } from 'react'
import { boardsContext } from '../boardsContexts/boardsContext'
import Columns from './columns/Columns'
import './Rightside.css'


function Rightside() {
    const {defaultboard , setDefaultboard} = useContext(boardsContext)

    return (
        <div className='rightside'>
            <Columns columns = {defaultboard.columns} />
        </div>
    )
}

export default Rightside
