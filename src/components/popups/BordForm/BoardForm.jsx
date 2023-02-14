import React, { useContext, useState } from 'react'
import { boardsContext } from '../../boardsContexts/boardsContext'
import './BoardForm.css'
import { AiOutlineClose} from 'react-icons/ai';

function BoardForm() {
    const  {showBoardForm , boards , setboards ,setShowBoardForm ,defaultboard , setDefaultboard} = useContext(boardsContext) 
    let { title ,  order  } = showBoardForm
    let board = order == 'create' ? {id:Date.now() , name:'' , columns:[{id:1 , name:'' , tasks:[]}]} : defaultboard
    let [Newboard , setNewboard] = useState({...board})

    const updateColumnName =(e , x)=> {
        let Newcolumns = Newboard.columns.map((column)=> column.id == x ? {...column , name:e.target.value} : column) ;
        setNewboard({...Newboard , columns:Newcolumns});
    }

    const addNewColumn = (e)=> {
        e.preventDefault()
        let NewColumns = [...Newboard.columns , {id:Date.now() , name:'' , tasks:[]}]
        setNewboard({...Newboard , columns:NewColumns})
    }

    const removeColumn = (x)=> {
        let NewColumns = Newboard.columns.filter((column)=> column.id != x)
        setNewboard({ ...Newboard , columns:NewColumns })
    }

    const insertNewBoard = (e)=> {
        e.preventDefault()
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



    return (
        <div className='effects'>
            <form  className='boardform' onSubmit={(e)=>{insertNewBoard(e)}} >
                <p className='form-title'>{title}</p>
                <div className='group'>
                    <label htmlFor="Name">Name</label>
                    <input type="text" disabled={(order == 'create' ||order == 'edit' ) ? false:true} value={Newboard.name} onChange = {(e)=> {setNewboard({...Newboard , name:e.target.value})}} />
                </div>
                <div className='group'>
                    <label htmlFor="Columns">Column</label>
                    {
                        Newboard.columns.map((column)=> {
                            return <div className='input-columns' key={column.id}>
                                <input disabled={column.tasks.length > 1 ? true : false}  type="text" onChange={(e)=>{updateColumnName(e , column.id)}} value={column.name} />
                                {Newboard.columns.length > 1 && <AiOutlineClose disabled className={column.tasks.length > 1 ? 'closebutton withTasks':'closebutton' } onClick={()=>{removeColumn(column.id)}} /> }
                            </div>
                        })
                    }
                </div>

                <div className='group'>
                    {Newboard.columns.length< 8 && <button className='addnewcolumn'  onClick={(e)=>{addNewColumn(e)}} >Insert New Column</button>}
                    <button className='savebutton' type='submit'>{order == 'create' ? 'Create New Board' : 'Save Changes'}</button>
                </div>


            </form>
        </div>
    )
}

export default BoardForm
