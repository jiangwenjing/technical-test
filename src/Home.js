import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios"
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Home = () => {

    const [coins, setCoins] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    
    const queryCoins = {
        vs_currency: "eur",
        order: "market_cap_desc",
        per_page: 10,
        page: 1,
    }
    
    const getCoins = async () => {
        try {
            const response = await axios.get(
                '/api/v3/coins',
                {params: queryCoins},
                {header: "Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure"}

            );
            console.log(response.data)
            setCoins(response.data);
            setError(null);

        } catch (err) {
            setError(err.message);
            setCoins(null);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        getCoins();
    }, []);

    return (
        <>
            <h1>Coins Markets</h1>
            <ul className='coins'>
                {coins.map((coin) => {
                    const { id, name, image, symbol, market_data } = coin;
                    const current_price = JSON.stringify(market_data['current_price'])
                    const high_24h_price = JSON.stringify(market_data['high_24h'])
                    const low_24h_price = JSON.stringify(market_data['low_24h'])

                    return (

                        <li key={id}>
                            <div>
                                <ul>
                                    <li><img src={image.large}  /></li>
                                    <li><Link to={`/${id}`}>ID: {id}</Link></li>
                                    <li>Name: {name}</li>
                                    <li>Symbol: {symbol}</li>
                                    <li>Current Price: {current_price}</li>
                                    <li>High 24 hour Price: {high_24h_price}</li>
                                    <li>Low 24 hour Price: {low_24h_price}</li>
                                </ul>
                            </div>
                        </li>
                    );
                })}
            </ul>

        </>
    );
};

export default Home;