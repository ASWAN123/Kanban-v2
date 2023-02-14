import { useState , useContext, useEffect } from 'react';
import { BsController } from 'react-icons/bs';

import './App.css'
import { boardsContext } from './components/boardsContexts/boardsContext'
import Header from "./components/Header/Header";
import Leftside from "./components/Leftside/Leftside";
import BoardForm from './components/popups/BordForm/BoardForm';
import ShowWarning from './components/popups/ShowWarning/showWarning';
import TaskForm from './components/popups/TaskForm/TaskForm';
import Rightside from "./components/Rightside/Rightside";
import { getboards } from './data/data'


function App() {

  const [boards , setboards] = useState(getboards())
  const [defaultboard , setDefaultboard ] = useState(boards[0])
  let [hide  , setHide] = useState(false)
  
  const [showBoardForm , setShowBoardForm] = useState({
    title:'' ,
    order :'',
    show:false,
  })

  const [showTaskForm , setShowTaskForm] = useState({
    title:'Add New Task' ,
    order :'add',
    show:false,
  })

  useEffect(()=> {
    console.log(defaultboard  , 'updated')
  } , [defaultboard])

  // useEffect(()=> {
  //   setShowTaskForm({...showTaskForm , show:false})
  //   setShowBoardForm({...showBoardForm , show:false})
  // } , [hide])

  const [showwarning , setshowWarning ] = useState({show:false , title:'' , order:''})

  // shwoTaskForm  will be  diffirnet because it need to column and  tasks ids  for the  default board
  // ADD useeffect to update local storage with boards 

  return (
    <div className="App">
      <boardsContext.Provider value={{   showTaskForm , setShowTaskForm, showwarning , setshowWarning , showBoardForm , setShowBoardForm ,  defaultboard  , setDefaultboard, boards , setboards  }}>
        <Header /> 
        <Leftside /> 
        <Rightside />
        { showBoardForm.show && <BoardForm   /> }
        { showwarning.show && <ShowWarning  /> }
        { showTaskForm.show && <TaskForm   />}
      </boardsContext.Provider>
    </div>
  );
}

export default App;
