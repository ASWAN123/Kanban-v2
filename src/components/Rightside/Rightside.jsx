import React, { useContext } from 'react'
import { boardsContext } from '../boardsContexts/boardsContext'
import Columns from './columns/Columns'
import './Rightside.css'


function Rightside() {

    return (
        <div className='rightside'>
            <Columns  />
        </div>
    )
}

export default Rightside
