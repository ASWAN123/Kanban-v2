import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import Logo from './logo/logo'
import { FiMoreVertical } from "react-icons/fi" 
import { boardsContext } from '../boardsContexts/boardsContext'
import Settingbuttons from '../popups/settingbuttons/Settingbuttons'

function Header() {
    const [controlmenu , setControlMenu] = useState(false) ;
    const { setShowTaskForm , setshowWarning , showBoardForm , setShowBoardForm , defaultboard , setDefaultboard , boards , setboards  }  = useContext(boardsContext) ;
    

    const editMethod = ()=> {
        setShowBoardForm({title:'Edit Board' , show:true, order:"edit"})
        setControlMenu(!controlmenu)
    }

    const deleteMethod = ()=>{
        setshowWarning({show:true ,title:defaultboard.name , order:"Delete this board?"}) ;
        setControlMenu(!controlmenu) ;
    }

    return (
        <div className='header'>
            <Logo />
            <div className='header-menu'>
                <div className='board-title'>{defaultboard.name}</div>
                <button className='button-add-task'onClick={()=>{setShowTaskForm({show:true , title:'Add New Task' , order:'add'})}}> + Add New Task</button>
                <FiMoreVertical className='mysettingIcon' onClick={()=> {setControlMenu(!controlmenu)}} />
                { controlmenu && <Settingbuttons editMethod={editMethod} deleteMethod={deleteMethod } title={"Board"}/> }
            </div>
        </div>
    )
}

export default Header
