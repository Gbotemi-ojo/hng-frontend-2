import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Movie from '../movie/movie.jsx';
import Homepage from '../homepage/homepage.jsx';
const RouteSwitch = () => {
    return (
        <BrowserRouter >
            <Routes>
                <Route path="/" index element={<Homepage />} />
                <Route path="/movie/:id" element={<Movie />} />
                <Route element={<div>error here</div>} path="*" />
            </Routes>
        </BrowserRouter>
    );
};
export default RouteSwitch; 