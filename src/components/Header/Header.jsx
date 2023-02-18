import React, { useContext, useEffect, useState } from 'react'
import './Header.css'
import Logo from './logo/logo'
import { FiMoreVertical } from "react-icons/fi"
import { boardsContext } from '../boardsContexts/boardsContext'
import Settingbuttons from '../popups/settingbuttons/Settingbuttons'
import {AiOutlinePlusCircle} from "react-icons/ai"
import { BsCloudMoonFill } from 'react-icons/bs';
import { BsCloudSunFill } from 'react-icons/bs';

function Header() {
    const [controlmenu , setControlMenu] = useState(false) ;
    const { theme, setTheme , setShowTaskForm , setshowWarning , showBoardForm , setShowBoardForm , defaultboard , setDefaultboard , boards , setboards  }  = useContext(boardsContext) ;
    

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
                <button className='button-add-task'onClick={()=>{setShowTaskForm({show:true , title:'Add New Task' , order:'add'})}}>+ Add New Task</button>

                <div  className='light-dark'>
                    { (theme == 'light' ? <BsCloudMoonFill onClick={()=> setTheme( (theme == "light") ? 'dark':'light' )} className='moon' />  : <BsCloudSunFill className='sun' onClick={()=> setTheme( (theme == "light") ? 'dark':'light' )} />) }</div>
                
                <FiMoreVertical className='mysettingIcon' onClick={()=> {setControlMenu(!controlmenu)}} />
                
                { controlmenu && <Settingbuttons myclass={'effects-setting'} setControlMenu={setControlMenu} controlmenu={controlmenu} editMethod={editMethod} deleteMethod={deleteMethod } title={"Board"}/> }

            </div>
        </div>
    )
}

export default Header
