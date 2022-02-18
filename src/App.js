import React from 'react';
import './App.css';
import Home from "./Home";
import Coin from "./Coin"
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

function App() {
    return (
        <div className={"container"}>
            <Router>
                <div>
                    <h1>Coin Market</h1>

                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/:id" element={<Coin />} />
                    </Routes>

                </div>
            </Router>
        </div>
    );

}

export default App;
