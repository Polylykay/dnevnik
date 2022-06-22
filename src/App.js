import './App.css';
import {Route, Routes} from "react-router";
import {Lessons} from "./lessons/lessons";
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import {Lesson} from "./lesson/lesson";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Lessons />} />
                <Route path="/lesson/:id" element={<Lesson />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
