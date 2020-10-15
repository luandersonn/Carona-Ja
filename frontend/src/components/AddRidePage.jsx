import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router'

import './AddRidePage.css'
import Loader from 'react-loader-spinner'

const rides_base_url = "http://localhost:3001/rides"

export default class AddRide extends Component {
    constructor(props) {
        super(props)
        this.state = {
            user: null,
            isLoading: true,
            back: false
        }
        this.add = this.add.bind(this)
    }

    componentDidMount() {
        var user
        try {
            var { user } = this.props.location.state
        }
        catch (err) { }
        finally {
            this.setState({
                user: user,
                isLoading: false,
                back: false
            })
        }
    }

    render() {
        const { user, isLoading, back } = this.state;
        if (isLoading)
            return (<Loader className="centered"
                type="Oval"
                color="#6c63ff"
                height={100}
                width={100}

            />)
        if (back == true || user == null || user.type != "driver")
            return (
                <Redirect
                    to={{
                        pathname: "/dashboard",
                        state: { user: user }
                    }} />
            )        
        else {
            return (
                <div className="add_ride_root">
                    <h2 className="page_title">Ofertar nova carona</h2>
                    <input id="ride_destination" type="text" placeholder="Destino" />
                    <input id="ride_date" type="date" value="2020-10-20" />
                    <button className="new_ride_button" onClick={this.add}>Adicionar</button>
                </div>
            )
        }
    }

    isEmptyOrSpaces(str) {
        return str === null || str.match(/^ *$/) !== null;
    }

    add() {
        const { user } = this.props.location.state
        let destinaton = document.getElementById("ride_destination").value
        let date = document.getElementById("ride_date").value

        let ride = {
            id: null,
            driver: user.id,
            passenger: null,
            date: date,
            destination: destinaton
        }

        // Não permita campos em branco
        if (this.isEmptyOrSpaces(destinaton)) {
            alert("Campo 'Destino' está em branco");
            return;
        }
        axios.post(rides_base_url, ride)
            .then(response => {
                alert("Adicionado com sucesso")
                this.setState({ back: true })
            }, (err) => {
                alert("Erro ao adicionar " + err)
            })

    }
}