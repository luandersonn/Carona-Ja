import React from 'react';
import '../main/App.css'
import './Header.css'
import logo from '../assets/logo.png'


export default props =>
    <header>
        <ul className="header">
            <li>
                <div>
                    <img className="App_logo" src={logo} width="596" alt="app logo" />
                    <b className="app_title_header">{props.title}</b>
                </div>
            </li>            
        </ul>
    </header>

