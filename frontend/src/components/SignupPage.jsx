import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

import './SignupPage.css'
import app_logo from '../assets/logo.png'
import signup_illustration from '../assets/signup_illustration.png'


const users_base_url = "http://localhost:3001/users"

export default class Signup extends Component {
    constructor(props) {
        super(props)
        this.createAccount = this.createAccount.bind(this)
        this.state = {
            user: null
        }
    }

    render() {
        const { user } = this.state
        if (user == null) {
            return (
                <div>
                    <div className="split left">
                        <div className="centered">
                            <h2>Criar nova conta</h2>
                            <input id="signup_name" placeholder="Nome" type="text" /><br /><br />
                            <input id="signup_username" placeholder="Usuário" type="text" /><br /><br />
                            <input id="signup_password" placeholder="Senha" type="password" /><br /><br />
                            <form className="signup_form_container">
                                <div className="signup_form_item">
                                    <input id="signup_driver_radio" name="Nome" type="radio" checked="true" />
                                    <label> Motorista</label>
                                </div>
                                <div className="signup_form_item">
                                    <input name="Nome" type="radio" />
                                    <label> Passageiro</label>
                                </div>
                            </form>
                            <button id="signup_button" onClick={this.createAccount}>Criar conta</button><br />
                        </div>
                    </div>

                    <div className="split right">
                        <div className="centered">
                            <img src={signup_illustration} />
                            <p> Já tem uma conta? <a href="/login">Faça login</a></p>
                        </div>
                    </div>
                </div>)
        }
        else {
            return (<Redirect
                to={{
                    pathname: "/dashboard",
                    state: { user: user }
                }} />)
        }
    }

    createAccount() {
        let name = document.getElementById("signup_name").value
        let username = document.getElementById("signup_username").value
        let password = document.getElementById("signup_password").value
        let isDriver = document.getElementById("signup_driver_radio").checked

        // Não permita campos em branco
        if (this.isEmptyOrSpaces(name)) {
            alert("Campo 'Nome' está em branco");
            return;
        }
        if (this.isEmptyOrSpaces(username)) {
            alert("Campo 'Usuário' está em branco");
            return
        }
        if (this.isEmptyOrSpaces(password)) {
            alert("Campo 'senha' está em branco");
            return;
        }

        const user = {
            name: name,
            id: username,
            password: password,
            type: isDriver ? "driver" : "passenger"
        }
        const options = {
            headers: { 'Content-Type': 'application/json' }
        };
        axios.post(users_base_url, user, options)
            .then(response => {
                this.setState({ user: response.data })
            }, (err) => {
                alert("Este usuário já existe, tente escolher outro")
            })
    }

    isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }
}