import { Input, Checkbox } from 'antd'
import { PlusOutlined, SearchOutlined } from '@ant-design/icons'
import { useState, useCallback, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { v4 as uuidv4 } from 'uuid'
import { data } from './redux/data';
import { addTodo, searchTodo, tabStatus } from './redux/actions'
import 'antd/dist/antd.css';
import './App.css';



function App() {
  const dataList = useSelector(data)
  const dispatch = useDispatch()
  const [inputAdd, setInputAdd] = useState('')
  const [inputSearch, setInputSearch] = useState('')
  const [showInputAdd, setShowInputAdd] = useState(false)
  const [showInputSearch, setShowInputSearch] = useState(false)
  const [type, setType] = useState('All')
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
  const escFunction = useCallback((event) => {
    console.log(event.keyCode);
    if(event.keyCode === 27) {
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
  const handleSetTypeAll = () =>{
    setType('All')
    dispatch(tabStatus(type))
  }
  const handleSetTypeActive = () =>{
    setType('Active')
    dispatch(tabStatus(type))
  }
  const handleSetTypeComplete = () =>{
    setType('Complete')
    dispatch(tabStatus(type))
  }
  return (
    <div className='todolist'>
      <h1>THINGS TO DO</h1>
      {showInputAdd && <Input placeholder="Add new"
        value={inputAdd}
        onChange={e => setInputAdd(e.target.value)}
        onKeyPress={handleInputAdd}
      />}

      {showInputSearch && <Input placeholder="Search"
        value={inputSearch}
        onChange={handleInputSearch}
      />}
      <ul className='ulItem'>
        {dataList.map(item =>
          <li
            key={item.id}
          >
            <Checkbox>
              {item.name}
            </Checkbox>
          </li>)}
      </ul>
      <footer>
        <div className='btnAS'>
          <PlusOutlined className='addButton' onClick={handleAdd} />
          <SearchOutlined className='searchButton' onClick={handleSearch} />
        </div>
        <div className='sumItem'>{dataList.length}  items left</div>
        <ul className='ulStatus'>
          <li><a onClick={handleSetTypeAll}
            style={(type === 'All' ? { color: 'red' } : { color: '#555' })}
          >
            All
          </a></li>
          <li><a onClick={handleSetTypeActive}
            style={(type === 'Active' ? { color: 'red' } : { color: '#555' })}
          >
            Active
          </a></li>
          <li><a onClick={handleSetTypeComplete}
            style={(type === 'Complete' ? { color: 'red' } : { color: '#555' })}
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
