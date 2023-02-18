import React from 'react'
import { useContext } from 'react';
import { useState } from 'react';
import { FiMoreVertical } from "react-icons/fi"
import { boardsContext } from '../../boardsContexts/boardsContext';
import './SettingButtons.css'

function Settingbuttons(props) {
    const  { setshowWarning} = useContext(boardsContext)
    let deleteMethod  = props.deleteMethod
    let editMethod = props.editMethod
    let title = props.title
    let setControlMenu = props.setControlMenu
    let controlmenu = props.controlmenu
    let myclass = props.myclass

    const closemenu =(e)=> {
        console.log(e.target.className)
        if( e.target.className == 'effects-setting' || e.target.className == 'effects-setting-task'){
            console.log(e.target.className)
            setControlMenu(false)
        }
    }

    return (
        < div className={myclass} onClick={(e)=> {closemenu(e)}}  >
            <div className={`${myclass}-ele`}>
                <button className='editboard' onClick={editMethod}  >Edit {title}</button>
                <button className='deleteboard' onClick={deleteMethod} >Delete {title}</button>
            </div>
        </div>
    )
}

export default Settingbuttons ;
