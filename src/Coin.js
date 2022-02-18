import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"

const Coin = () => {
    const [coins, setCoins] = useState('default name');
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const getCoins = async ({id}) => {
        try {
            console.log(1)
            const response = await axios.get(
                '/api/v3/coins/${id}',
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
        getCoins()
    }, []);

    return (
        <div>
            {coins.map((coin) => {
                const { id, name, symbol, hashing_algorithm, description, market_cap, links, genesis_date } = coin;
                return (
                    <ul key={id}>
                        <li>Name: {name}</li>
                        <li>Symbol: {symbol}</li>
                        <li>Hashing algorithm: {hashing_algorithm}</li>
                        <li>Description: {description}</li>
                        <li>Market cap in Euro: {market_cap['eur']}</li>
                        <li>Homepage: {links['homepage']}</li>
                        <li>Genesis Date: {genesis_date}</li>
                    </ul>
                    );
            })}
        </div>
    );
};

export default Coin;
