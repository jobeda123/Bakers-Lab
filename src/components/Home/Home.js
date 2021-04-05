import React, { useEffect, useState } from 'react';
import Header from '../Header/Header';
import Card from '../Card/Card';
import './Home.css';
import loadPic from '../../icons/spinner.gif';
import { Row, Container } from 'react-bootstrap';


const Home = () => {

    const [cakes, setCakes] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://shielded-wildwood-39102.herokuapp.com/cakes')
            .then(res => res.json())
            .then(data => {
                setCakes(data);
                setLoading(false);
            })
    }, [])

    return (
        <div>
            <Header></Header>
            { loading ? <img style={{ paddingTop: "100px" }} src={loadPic} alt="/"></img>

                : <Container>
                    <Row>
                        <div className="cardArea">
                            {
                                cakes.map(cake => <Card key={cake._id} singleCake={cake}></Card>)
                            }
                        </div>
                    </Row>
                </Container>
            }
        </div>
    );
};

export default Home;