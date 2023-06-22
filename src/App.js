import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BillForm from './BillForm'
import Confirmation from './Confirmation'
import Home from './Home'
import EditBill from './EditBill'
import Signup from './Signup'
import Login from './Login'

const App = props => (
  <div className="App">
        <Router>
            <main className="App-main">
                <Routes>
                    {/* a route for the home page */}
                    <Route path="/form" element={<BillForm />} />
                    <Route path="/confirmation/:billId" element={<Confirmation />} />
                    <Route path="/home" element={<Home />} />
                    <Route path="/edit/:billId" element={<EditBill />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/" element={<Login />} />
                </Routes>
            </main>
        </Router>
    </div>



)
/*
import logo from './logo.svg';
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
*/
export default App