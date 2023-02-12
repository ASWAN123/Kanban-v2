import { useState , useContext } from 'react';
import { BsController } from 'react-icons/bs';

import './App.css'
import { boardsContext } from './components/boardsContexts/boardsContext'
import Header from "./components/Header/Header";
import Leftside from "./components/Leftside/Leftside";
import BoardForm from './components/popups/BordForm/BoardForm';
import ShowWarning from './components/popups/ShowWarning/showWarning';
import Rightside from "./components/Rightside/Rightside";
import { getboards } from './data/data'


function App() {

  const [boards , setboards] = useState(getboards())
  const [defaultboard , setDefaultboard ] = useState(boards[0])
  const [showBoardForm , setShowBoardForm] = useState({
    title:'' ,
    order :'',
    show:false,
  })
  const [showwarning , setshowWarning ] = useState({show:false , title:'' , order:''})

  // shwoTaskForm  will be  diffirnet because it need to column and  tasks ids  for the  default board
  // ADD useeffect to update local storage with boards 

  return (
    <div className="App">
      <boardsContext.Provider value={{showwarning , setshowWarning , showBoardForm , setShowBoardForm ,  defaultboard  , setDefaultboard, boards , setboards  }}>
        <Header /> 
        <Leftside /> 
        <Rightside />
        { showBoardForm.show && <BoardForm  /> }
        { showwarning.show && <ShowWarning  /> }
         
        
        {/* <TaskForm /> */}
      </boardsContext.Provider>
    </div>
  );
}

export default App;
