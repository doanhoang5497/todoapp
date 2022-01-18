import { Input, Checkbox } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState, useCallback, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { data } from './redux/data';
import { addTodo, searchTodo, tabStatus, updateChecked } from './redux/actions'
import 'antd/dist/antd.css';
import './App.css';



function App() {
  const dataListAll = useSelector(data)
  const dataListActive = dataListAll.filter(dataActive => dataActive.done === true)
  const dataListComplete = dataListAll.filter(dataComplete => dataComplete.done === false)
  const dispatch = useDispatch()
  const [inputAdd, setInputAdd] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [showInputAdd, setShowInputAdd] = useState(false)
  const [showInputSearch, setShowInputSearch] = useState(false)
  const [type, setType] = useState('All')
  const [checked, setChecked] = useState(dataListComplete.map(e => e.id))
  const inputAddRef = useRef();
  const inputSearchRef = useRef();
  
  const handleAdd = () => {
    if (showInputSearch) {
      setShowInputAdd(!showInputAdd)
      setShowInputSearch(!showInputSearch)
    } else {
      setShowInputAdd(!showInputAdd)
    }
  }
  const handleSearch = () => {
    if (showInputAdd) {
      setShowInputAdd(!showInputAdd)
      setShowInputSearch(!showInputSearch)

    } else {
      setShowInputSearch(!showInputSearch)
    }
  }
  useEffect(()=>{
    if (showInputAdd){inputAddRef.current.focus();}
    if (showInputSearch){inputSearchRef.current.focus();}
  })
  const escFunction = useCallback((event) => {
    if (event.keyCode === 27) {
      setShowInputAdd(false);
      setShowInputSearch(false)
    }
  }, []);
  useEffect(() => {
    document.addEventListener("keydown", escFunction, false);

    return () => {
      document.removeEventListener("keydown", escFunction, false);
    };
  }, []);

  useEffect(() => {
    const listener = event => {
      if (event.keyCode === 70 && event.ctrlKey) {
        setShowInputAdd(false);
        setShowInputSearch(true)
        //inputSearchRef.current.focus();
        event.preventDefault();
        // callMyFunction();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  const handleInputAdd = e => {
    if (e.which === 13) {
      dispatch(addTodo({
        id: uuidv4(),
        name: inputAdd,
        done: false
      }));
      setInputAdd('')
    }
  };
  useEffect(() => {
    document.addEventListener("pressenter", handleInputAdd);
    return () => {
      document.removeEventListener("pressenter", handleInputAdd);
    };
  }, []);
  const handleInputSearch = e => {
    setInputSearch(e.target.value)
    dispatch(searchTodo(e.target.value))
  };
  const handleSetTypeAll = () => {
    setType('All')
    dispatch(tabStatus(type))
  }
  const handleSetTypeActive = () => {
    setType(true)
    dispatch(tabStatus(type))
  }
  const handleSetTypeComplete = () => {
    setType(false)
    dispatch(tabStatus(type))
  }
  const handleChecked = (idChecked)=>{
    setChecked(prev=>{
      if (checked.includes(idChecked)){
        return checked.filter(item=>item !==idChecked)
      }else{
        return [...prev,idChecked]
      }
    })
    dispatch(updateChecked(idChecked))
  }
  return (
    <div className='todolist'>
      <h1>THINGS TO DO</h1>
      {showInputAdd && <Input placeholder="Add new"
        value={inputAdd}
        onChange={e => setInputAdd(e.target.value)}
        onKeyPress={handleInputAdd}
        ref={inputAddRef}
      />}

      {showInputSearch && <Input placeholder="Search"
        value={inputSearch}
        onChange={handleInputSearch}
        ref={inputSearchRef}
      />}
      <ul className='ulItem'>
        {type === true
          ?
          (dataListActive.map(item =>
            <li
              key={item.id}
              style={( checked.includes(item.id) ? { opacity: 0.5, textDecoration:'line-through' } : {  })}
            >
              <Checkbox
               checked={checked.includes(item.id)}
               onChange={()=>handleChecked(item.id)}
               >
                {item.name}
              </Checkbox>
            </li>))
          :
          (
            type === false
              ?
              (dataListComplete.map(item =>
                <li
                  key={item.id}
                  style={( checked.includes(item.id) ? { opacity: 0.5, textDecoration:'line-through' } : {  })}
                >
                  <Checkbox
                     checked={checked.includes(item.id)}
                     onChange={()=>handleChecked(item.id)}
                  >
                    {item.name}
                  </Checkbox>
                </li>))
              :
              (
                (dataListAll.map(item =>
                  <li
                    key={item.id}
                    style={( checked.includes(item.id) ? { opacity: 0.5, textDecoration:'line-through' } : {  })}
                  >
                    <Checkbox
                    checked={checked.includes(item.id)}
                    onChange={()=>handleChecked(item.id)}
                    >
                      {item.name}
                    </Checkbox>
                  </li>))
              )
          )}
      </ul>
      <footer>
        <div className='btnAS'>
          <PlusOutlined className='addButton' onClick={handleAdd} />
          <SearchOutlined className='searchButton' onClick={handleSearch} />
        </div>
        <div className='sumItem'>{dataListAll.length}  items left</div>
        <ul className='ulStatus'>
          <li><a onClick={handleSetTypeAll}
            style={(type === 'All' ? { color: 'red' } : { color: '#555' })}
          >
            All
          </a></li>
          <li><a onClick={handleSetTypeActive}
            style={(type === true ? { color: 'red' } : { color: '#555' })}
          >
            Active
          </a></li>
          <li><a onClick={handleSetTypeComplete}
            style={(type === false ? { color: 'red' } : { color: '#555' })}
          >
            Complete
          </a></li>
        </ul>
      </footer>
      <p className='info'>Press `Esc` to cancel.</p>
    </div>
  )
}

export default App;
