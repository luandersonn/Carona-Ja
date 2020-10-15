import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

import './LoginPage.css'
import login_illustration from '../assets/login_illustration.png'

const login_base_url = "http://localhost:3001/users/{id}"

export default class Login extends Component {
    constructor(props) {
        super(props)
        this.login = this.login.bind(this)
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
                            <img src={login_illustration} />
                            <p> Novo por aqui? <a href="/signup">Crie uma conta</a></p>
                        </div>
                    </div>

                    <div className="split right">
                        <div className="centered">
                            <h2>Log In</h2>
                            <input id="login_username" placeholder="Usuário" type="text" /><br /><br />
                            <input id="login_password" placeholder="Senha" type="password" /><br /><br />
                            <button id="login_button" onClick={this.login}>Login</button><br />
                        </div>
                    </div>

                </div>
            )
        }
        else
            return (<Redirect
                to={{
                    pathname: "/dashboard",
                    state: { user: user }
                }} />)
    }
    login() {
        let username = document.getElementById("login_username").value
        let password = document.getElementById("login_password").value
        let url = login_base_url.replace("{id}", username)
        axios.get(url)
            .then(response => {
                if (response.data.password == password) {
                    this.setState({
                        user: response.data
                    })
                }
                else
                    alert("Usuário ou senha inválidos")
            }, (err) => {
                alert("Erro ao autenticar: " + err)
            })
    }
}