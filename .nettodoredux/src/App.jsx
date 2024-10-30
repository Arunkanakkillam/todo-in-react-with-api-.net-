
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { Todo } from './todo'
import { Provider } from 'react-redux'
import { store } from './Store'

function App() {

  return (
    <>
<Provider store={store}>
  <Routes>
    <Route path='/' element={<Todo/>}/>
  </Routes>
</Provider>
    </>
  )
}

export default App
