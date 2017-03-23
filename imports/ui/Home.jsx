import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import {Grid, Row, Navbar, Col, Container, NavItem, Nav, Carousel} from 'react-bootstrap';
export default class Home extends React.Component {


    render() {
        return (
            /*<div className="container">
                <div>
                <a href="/" className="col-md-1"><img src="logo.png"/></a>
                </div>
                <div className="row">
                    <nav className="navbar">
                        <ul className="navbar-nav">
                            <il className="nav-item"><a href="login">Se connecter</a></il>
                        </ul>
                    </nav>
                </div>
            </div>*/
            <div>
                <Col md={1}>
                    <a href="/"><img src="logo.png"/></a>
                </Col>
                <Row>
                    <Navbar>
                        <Nav pullRight>
                            <NavItem href="/login">Se connecter</NavItem>
                        </Nav>
                    </Navbar>
                </Row>
                <Row>
                    <Carousel>
                        <Carousel.Item>
                            <img width={568} height={354} alt="900x500" src="https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcRH2hIdidIYAkZL5uDqKvgESF8Tfjhz00Ctp6jG118pSSpV4xqTIg"/>
                            <Carousel.Caption>
                                <h3>First slide label</h3>
                                <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="assets/test2.jpeg"/>
                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img width={900} height={500} alt="900x500" src="assets/test3.png"/>
                            <Carousel.Caption>
                                <h3>Third slide label</h3>
                                <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </Row>
            </div>
        );
    }
}


