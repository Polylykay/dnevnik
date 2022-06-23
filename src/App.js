import './App.css';
import {Route, Routes} from "react-router";
import {Lessons} from "./lessons/lessons";
import React from "react";
import { BrowserRouter } from 'react-router-dom';
import {Lesson} from "./lesson/lesson";
import {AddNewLesson} from "./lessons/addNewLesson";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Lessons />} />
                <Route path="/lesson/:id" element={<Lesson />} />
                <Route path="/add-new-lesson" element={<AddNewLesson />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
