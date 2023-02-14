import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi"
import { boardsContext } from '../../boardsContexts/boardsContext';

function Settingbuttons(props) {
    let deleteMethod  = props.deleteMethod
    let editMethod = props.editMethod
    let title = props.title

    return (
        <>
            <div className='control-menu'>
                <button className='editboard' onClick={editMethod}  >Edit {title}</button>
                <button className='deleteboard' onClick={deleteMethod} >Delete {title}</button>
            </div>
        </>
    )
}

export default Settingbuttons ;
