import React, { useContext, useState } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext'
import './BoardForm.css' ;
import { AiOutlineClose} from 'react-icons/ai' ;
import { useEffect } from 'react' ;

function BoardForm() {
    const  {showBoardForm , boards , setboards ,setShowBoardForm ,defaultboard , setDefaultboard} = useContext(boardsContext) 
    let { title ,  order  } = showBoardForm
    let board = order == 'create' ? {id:'B'+Date.now() , name:'' , columns:[{id:'C'+1 , name:'' , tasks:[]}]} : defaultboard
    let [Newboard , setNewboard] = useState({...board})
    let [validation  ,  setValidation] = useState(false)
    let [columnvalidate , setColumnValidate] = useState(99)
    const updateColumnName =(e , x)=> {
        let Newcolumns = Newboard.columns.map((column)=> column.id == x ? {...column , name:e.target.value} : column) ;
        setNewboard({...Newboard , columns:Newcolumns});
    }

    const addNewColumn = (e)=> {
        e.preventDefault()
        let NewColumns = [...Newboard.columns , {id:'C'+Date.now() , name:'' , tasks:[]}]
        setNewboard({...Newboard , columns:NewColumns})
    }

    const removeColumn = (x)=> {
        let NewColumns = Newboard.columns.filter((column)=> column.id != x)
        setNewboard({ ...Newboard , columns:NewColumns })
    }

    const insertNewBoard = (e)=> {
        e.preventDefault()
        if(Newboard.name.trim()=== ""){
            setTimeout(()=> {
                setValidation(false)
            } , 4000)
            setValidation(true)
            
            return ;
        }
        let checker  = Newboard.columns.filter((column)=> column.name.trim() == '')
        if (checker.length > 0){
            setColumnValidate(checker[0].id)
            setTimeout(()=> {
                setColumnValidate(99)
            } , 4000)
            return ;
        }

        let Newboards = [] ;
        if(order == 'create'){
            Newboards = [...boards , Newboard]
        }else{
            Newboards = boards.map((board)=> board.id == Newboard.id ? Newboard : board)
        }
        setboards(Newboards)
        setDefaultboard(Newboard)
        setShowBoardForm({...showBoardForm , show:false})
    }

    const closemenu =(e)=> {
        if(e.target.className == 'effects'){
            console.log(e.target.className)
            setShowBoardForm({...showBoardForm , show:false})
        }
    }

    return (
        <div className='effects' onClick={(e)=>{closemenu(e)}}>
            <form action='#' className='boardform' onSubmit={insertNewBoard} >
                <p className='form-title'>{title}</p>
                <div className='group'>
                    <label htmlFor="Name">Name {validation && <span className='validation'>*Required </span>}</label>
                    <input type="text" disabled={(order == 'create' ||order == 'edit' ) ? false:true } value={Newboard.name} onChange = {(e)=> {setNewboard({...Newboard , name:e.target.value})}} />
                </div>
                <div className='group'>
                    <label htmlFor="Columns">Column</label>
                    {
                        Newboard.columns.map((column , index)=> {
                            return <div className='input-columns' key={column.id}>
                                {/* {  columnvalidate == index && <span className='validation-column'>*Input field must be filled out!</span>} */}
                                <input  disabled={(order == 'create' ||order == 'edit' || column.tasks.length < 1 ) ? false:true}  type="text" onChange={(e)=>{updateColumnName(e , column.id)}} value={column.name} placeholder={  columnvalidate == column.id ? '*Input field must be filled out!': '' } />
                                {Newboard.columns.length > 1 && <AiOutlineClose disabled className={column.tasks.length > 1 ? 'closebutton withTasks':'closebutton' } onClick={()=>{removeColumn(column.id)}}  /> }
                            </div>
                        })
                    }
                </div>

                <div className='group'>
                    {Newboard.columns.length< 8 && <button className='addnewcolumn'  onClick={(e)=>{addNewColumn(e)}} >Insert New Column</button>}
                    <button type="submit" className='savebutton' >{order == 'create' ? 'Create New Board' : 'Save Changes'}</button>
                </div>


            </form>
        </div>
    )
}

export default BoardForm
