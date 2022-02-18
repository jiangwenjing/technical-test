import React, { useState, useEffect } from 'react';
import './App.css';
import axios from "axios"
import { Link } from 'react-router-dom';
import { Descriptions, Row, Col } from 'antd'
// const {  Descriptions  } = antd;
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
            // console.log(response.data)
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
            {coins.map((coin) => {
                const { id, name, image, symbol, market_data } = coin;

                const current_price = Object.keys(market_data['current_price']).map(key=>{
                    return <span key={key}> {key}:{market_data['current_price'][key]} </span>
                })
                const high_24h_price = Object.keys(market_data['high_24h']).map(key=>{
                    return <span key={key}> {key}:{market_data['high_24h'][key]} </span>
                })
                const low_24h_price = Object.keys(market_data['low_24h']).map(key=>{
                    return <span key={key}> {key}:{market_data['low_24h'][key]} </span>
                })
                return (

                    <div key={id}>
                        <Row>
                            <Col span={24}>
                                <img src={image.small}/><br/>
                                <Descriptions
                                    title="   "
                                    bordered
                                    column={{ xxl: 4, xl: 3, lg: 3, md: 3, sm: 2, xs: 1 }}
                                >
                                    <Descriptions.Item label="ID"><Link to={`/${id}`}>{id}</Link></Descriptions.Item>
                                    <Descriptions.Item label="Name">{name}</Descriptions.Item>
                                    <Descriptions.Item label="Symbol">{symbol}</Descriptions.Item>
                                    <Descriptions.Item label="Price">
                                        <p>Current Price: {current_price}</p>
                                        <p>High 24 hour Price: {high_24h_price}</p>
                                        <p>Low 24 hour Price: {low_24h_price}</p>
                                    </Descriptions.Item>
                                </Descriptions>
                                <br/>
                                <br/>
                            </Col>
                        </Row>

                    </div>

                );
            })}


        </>
    );
};

export default Home;