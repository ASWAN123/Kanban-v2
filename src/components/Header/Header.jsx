import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import Logo from './logo/logo'
import { FiMoreVertical } from "react-icons/fi" 
import { boardsContext } from '../boardsContexts/boardsContext'

function Header() {
    const {setshowWarning , showBoardForm , setShowBoardForm , defaultboard , setDefaultboard , boards , setboards  }  = useContext(boardsContext) ;
    const [controlmenu , setControlMenu] = useState(false) ;


    const editBoard = ()=> {
        setShowBoardForm({title:'Edit Board' , show:true, order:"edit"})
        setControlMenu(!controlmenu)
    }

    const showdeleteStuff = ()=>{
        setshowWarning({show:true ,title:defaultboard.name , order:"Delete this board?"}) ;
        setControlMenu(!controlmenu) ;
    }
    return (
        <div className='header'>
            <Logo />
            <div className='header-menu'>
                <div className='board-title'>{defaultboard.name}</div>
                <button className='button-add-task'> + Add New Task</button>
                <FiMoreVertical className='mysettingIcon' onClick={()=> {setControlMenu(!controlmenu)}} />
                {
                    controlmenu && 
                    <div className='control-menu'>
                        <button className='editboard' onClick={editBoard} >Edit Board</button>
                        <button className='deleteboard'onClick={showdeleteStuff} >Delete Board</button>
                    </div>
                }
            </div>
        </div>
    )
}

export default Header
