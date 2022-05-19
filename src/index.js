import React from 'react'
import ReactDom from 'react-dom'
import {BrowserRouter, Route, Routes as Switch} from 'react-router-dom'
import {Detail, Header, List, NotFound} from './components';
import './index.css'


const App = () =>{
  return (
    <BrowserRouter>
        <div>
          <Header/>
          <Switch>
            <Route  path='/' element={<List/>} />
            <Route  path='/currency/:id' element={<Detail/>}/>
            <Route  path='*' element = {<NotFound/>} />
          </Switch>
      </div> 
      </BrowserRouter>
  )
};

ReactDom.render(
  <App/>,
  document.getElementById('root')
)