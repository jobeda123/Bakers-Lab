import React from 'react';
import './Card.css';
import { Link } from "react-router-dom";
import { Col } from 'react-bootstrap';

const Card = (props) => {
    //console.log(props.singleCake.name);
    const { name, imageURL, price, _id } = props.singleCake;
    //console.log(name, imageURL, price, _id);


    return (
        <Col lg={4} sm={12}>
            <div className="card">
                <img src={imageURL} alt="..." />
                <div>
                    <h2>{name}</h2>
                    <div className="priceBtn">
                        <h2 style={{ margin: "30px" }}>$ {price}</h2>
                        <Link to={`/checkout/${_id}`}>
                            <button onClick={() => console.log(_id)} type="button">Buy Now</button>
                        </Link>
                    </div>
                </div>
            </div>
        </Col>
    );
};

export default Card;