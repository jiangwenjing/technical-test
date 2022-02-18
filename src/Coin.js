import React, { useState, useEffect } from 'react';
import {useParams} from 'react-router-dom';
import axios from "axios"
import { Descriptions } from 'antd'

const Coin = () => {
    const [coins, setCoins] = useState({});
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { name, symbol, hashing_algorithm, description={}, market_cap={}, links={}, genesis_date } = coins;
    console.log(id)
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
        <div>
            <Descriptions
                title={name}
                bordered
                column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
            >
                <Descriptions.Item label="Name">{name}</Descriptions.Item>
                <Descriptions.Item label="Symbol">{symbol}</Descriptions.Item>
                <Descriptions.Item label="Hashing algorithm">{hashing_algorithm}</Descriptions.Item>
                <Descriptions.Item label="Market cap in Euro:"><span dangerouslySetInnerHTML={{__html:market_cap.eur}}></span></Descriptions.Item>
                <Descriptions.Item label="Homepage:"><span dangerouslySetInnerHTML={{__html:links.homepage}}></span></Descriptions.Item>
                <Descriptions.Item label="Genesis Date:">{genesis_date}</Descriptions.Item>
                <Descriptions.Item label="Description">
                    <span dangerouslySetInnerHTML={{__html:description.en}}></span>
                </Descriptions.Item>
            </Descriptions>
            <br/>
        </div>

        );

};

export default Coin;
