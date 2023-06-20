import React from 'react'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import BillForm from './BillForm'
import Confirmation from './Confirmation'
import Home from './Home'
import EditBill from './EditBill'

const App = props => (
  <div className="App">
        <Router>
            <main className="App-main">
                <Routes>
                    {/* a route for the home page */}
                    <Route path="/form" element={<BillForm />} />
                    <Route path="/confirmation" element={<Confirmation />} />
                    <Route path="/" element={<Home />} />
                    <Route path="/edit/:billId" element={<EditBill />} />
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