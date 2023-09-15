import React, { useEffect, useState } from 'react'
import axios from 'axios';
import searchlogo from '../../assets/Search.svg';
import logo from '../../assets/Logo.svg';
import menuLogo from '../../assets/Menu.svg';
import imdb from '../../assets/imdb.svg';
import tomato from '../../assets/tomato.svg';
import playBtn from '../../assets/Play.svg';
import favouriteBtn from '../../assets/Favorite.svg';
import facebook from '../../assets/facebook.svg';
import instagram from '../../assets/instagram.svg';
import twitter from '../../assets/twitter.svg';
import youtube from '../../assets/youtube.svg';
import './homepage.css'
import { Link } from 'react-router-dom';
function Homepage() {
    const [loading, setLoading] = useState(true);
    const [movies, setMovies] = useState([{}]);
    const API_KEY = "7813ea178ab186b18f082b0f93d1169e";
    const IMG_PATH = "http://image.tmdb.org/t/p/w1280";
    // const endpoint = "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=7813ea178ab186b18f082b0f93d1169e&page=1";
    const BASE_URL = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`;
    const toggle_favouriteBtn = () => {
        alert('added to favorite');
    }
    const fetchMovie = async () => {
        try {
            const response = await axios.get(BASE_URL);
            const movieData = response.data.results
            setMovies(movieData.slice(10,60));
            setLoading(false);
        } catch (error) {
            console.error("Error fetching movie:", error);
        }
    };
    useEffect(() => {
        fetchMovie();
    }, []);

    // useEffect(() => {
    //     console.log(movies)
    // }, [movies])

    if (loading) {
        return <div>loading</div>
    }
    return (
        <>
            {<main>
                <section className='top-half'>
                    <header>
                        <img src={logo} alt="logo" />
                        <div className='input-container'>
                            <input type="text" className='search-input' />
                            <button className='search-btn'><img src={searchlogo} alt="search-btn" /></button>
                        </div>
                        <div className='sign-in'>
                            <h4>Sign in</h4>
                            <img src={menuLogo} alt="logo" className='menu-btn' />
                        </div>
                    </header>
                    <div className='background-description'>
                        <h1 className='background-movie-name'>John Wick 3: Parabellum</h1>
                        <div className='background-ratings'>
                            <div>
                                <img src={imdb} alt="" />
                                <span>86.0/100</span>
                            </div>
                            <div>
                                <img src={tomato} alt="" />
                                <span>97%</span>
                            </div>
                        </div>
                        <div className='background-movie-description'>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit.
                            Doloribus odit accusantium assumenda alias! Dolores error
                            iusto neque sunt voluptatem, est excepturi autem non
                            tempora sit, veritatis molestias asperiores quae at!
                        </div>
                        <button className='background-watch-trailer'>
                            <img src={playBtn} alt="" />
                            <span>Watch Trailer</span>
                        </button>
                    </div>
                </section>
                <section className='bottom-half'>
                    <div>
                        <h1>Featured Movie</h1>
                    </div>
                    <div className='movie-collection-grid'>
                        {movies.map((item, index) => {
                            return <div className='movie-card' data-testid="movie-card" key={index}>
                                <img src={favouriteBtn} alt="fav button" className='favourite-btn' onClick={toggle_favouriteBtn} />
                                <img src={IMG_PATH + item.poster_path} alt="" className='movie-card-image' data-testid="movie-poster" />
                                <div className='card-movie-date' data-testid="movie-release-date">{item.release_date}</div>
                                <Link to={`movie/${item.id}`}>
                                    <div className='card-movie-name' data-testid="movie-title">{item.title}</div>
                                </Link>
                            </div>
                        })}
                    </div>
                    <footer>
                        <div className='social-media-icons'>
                            <img src={facebook} alt="facebook" />
                            <img src={instagram} alt="gram" />
                            <img src={twitter} alt="twitter" />
                            <img src={youtube} alt="youtube" />
                        </div>
                        <div className='condition-of-use'>
                            <div>Condition of use</div>
                            <div>Privacy & policy</div>
                            <div>Press room</div>
                        </div>
                        <div>
                            2023 HNGX GBOTEX_LATEX
                        </div>
                    </footer>
                </section>
            </main> }
        </>
    )
}

export default Homepage;

