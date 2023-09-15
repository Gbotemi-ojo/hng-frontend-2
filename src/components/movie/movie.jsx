import React, { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import './movie.css';
function Movie() {
    const { id } = useParams();
    const [loading, setloading] = useState(true);
    const endpoint = `https://api.themoviedb.org/3/movie/${id}?api_key=7813ea178ab186b18f082b0f93d1169e`;
    const IMG_PATH = "http://image.tmdb.org/t/p/w1280";
    const [movieData, setmovieData] = useState('');
    const convertDate = (date) => {
        const inputDate = new Date(date);
        const utcMilliseconds = inputDate.getTime();
        const utcDate = new Date(utcMilliseconds);
        return utcDate.toISOString();
    }
    const fetchData = async () => {
        const data = await fetch(endpoint);
        const json_data = await data.json();
        json_data.release_date = convertDate(json_data.release_date)
        setmovieData(json_data);
        setloading(false);
    }
    useEffect(() => {
        fetchData();
    }, []);
    if (loading) {
        return <div>loading</div>
    }
    return (
        <section className='movie-details-page'>
            <div className='movie-detail-img'>
                <img src={IMG_PATH + movieData.poster_path} alt="poster" className='movie-detail-img' />
            </div>
            <div className='movie-details-container'>
                <div>
                    <div data-testid="movie-title">{movieData.original_title}</div>
                    <div data-testid="movie-release-date">{movieData.release_date}</div>
                    <div><div data-testid="movie-runtime">{movieData.runtime}</div><span>minutes</span></div>
                </div>
                <div className='movie-overview' data-testid="movie-overview">{movieData.overview}</div>
            </div>
        </section>
    )
}

export default Movie