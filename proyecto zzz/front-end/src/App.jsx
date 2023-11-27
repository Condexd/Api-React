import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css'
import Users from './assets/Users'
import UpdateUser from './assets/UpdateUser'
import CreateUser from './assets/CreateUser'
import Teams from './assets/Teams'
import UpdateTeam from './assets/UpdateTeam'
import CreateTeam from './assets/CreateTeam'
import Stadiums from './assets/Stadiums'
import UpdateStadium from './assets/UpdateStadium'
import CreateStadium from './assets/CreateStadium'


function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Users />}></Route>
            <Route path='/create' element={<CreateUser />}></Route>
            <Route path='/update/:id' element={<UpdateUser />}></Route>
            <Route path='/teams' element={<Teams/>}></Route>
            <Route path='/createteam' element={<CreateTeam />}></Route>
            <Route path='/updateteam/:id' element={<UpdateTeam/>}></Route>
            <Route path='/stadiums' element={<Stadiums/>}></Route>
            <Route path='/createstadium' element={<CreateStadium />}></Route>
            <Route path='/updatestadium/:id' element={<UpdateStadium/>}></Route>
          </Routes>
        </BrowserRouter>
      </div>
    </>
  )
}

export default App
