import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from "axios"

const Coin = () => {
    const [coins, setCoins] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name, symbol, hashing_algorithm, description={}, market_cap={}, links={}, genesis_date } = coins;
    console.log(id)
    // console.log(links['homepage'])
    const getCoins = async () => {
        try {
            const response = await axios.get(
                `/api/v3/coins/${id}`,
                {header: "Set-Cookie: cross-site-cookie=whatever; SameSite=None; Secure"}

            );
            console.log(response.data)
            setCoins(response?.data||{});
            setError(null);
        } catch (err) {
            setError(err.message);
            setCoins({});
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        getCoins()
    }, []);

    return (
        <ul>
            <li>Name: {name}</li>
            <li>Symbol: {symbol}</li>
            <li>Hashing algorithm: {hashing_algorithm}</li>
            <li>Description:<span dangerouslySetInnerHTML={{_html:description.en}}></span> </li>
            {/*<li>Description: {description.en}</li>*/}
            {/*<li>Market cap in Euro: {market_cap.eur}</li>*/}
            {/*<li>Homepage: {links.homepage}</li>*/}
            <li>Genesis Date: {genesis_date}</li>
        </ul>
        );

};

export default Coin;
