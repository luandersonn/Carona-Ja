import React from 'react';
import { BrowserRouter } from 'react-router-dom'
import Routes from './Routers'
import './App.css'

export default _ =>
    <BrowserRouter>
        <React.Fragment>
            <Routes />
        </React.Fragment>
    </BrowserRouter>