import React, { Component } from 'react'
import axios from 'axios'

import './RideListItem.css'

const rides_base_url = "http://localhost:3001/rides/{id}"

export default class RideListItem extends Component {

    constructor(props) {
        super(props)
        this.acceptRide = this.acceptRide.bind(this)
        this.cancelRide = this.cancelRide.bind(this)
    }

    render() {
        // Se o usuário for motorista
        if (this.props.user.type == "driver") {
            // Se não houver nenhum passageiro confirmado para esta carona, exibe como "carona disponivel"
            if (this.props.ride.passenger == null)
                return (<li className="rideItemCard"> {this.renderAsAvailable_driver(this.props.ride)} </li>)
            else
                return (<li className="rideItemCard"> {this.renderAsNotAvailable(this.props.ride)} </li>)
        }
        else {
            // Se não houver nenhum passageiro confirmado para esta carona, exibe como "carona disponivel"
            if (this.props.ride.passenger == null)
                return (<li className="rideItemCard"> {this.renderAsAvailable_passenger(this.props.ride)} </li>)
            else
                return (<li className="rideItemCard"> {this.renderAsNotAvailable(this.props.ride)} </li>)
        }
    }

    // Exibe a carona como disponível para ser aceite (com o botão "Aceitar carona")
    // (Exibido para usuários que são passageiros)
    renderAsAvailable_passenger(ride) {
        return (
            <div>
                <div>
                    Carona para <b>{ride.destination}</b> ofericido pelo usuário <b>{ride.driver}</b>
                </div>
                <div>
                    Data da viagem: <b>{ride.date}</b>
                </div>
                <button onClick={this.acceptRide} className="accept_ride_button">Aceitar carona</button>
            </div>
        )
    }

    // Exibe a carona já aceita por algum passageiro
    // (Exibido tanto para motoristas e passageiros)
    renderAsNotAvailable(ride) {
        return (
            <div>
                Carona para <b>{ride.destination}</b> ofericido pelo usuário <b>{ride.driver}</b>
                <br />
                Carona aceita pelo usuário <b>{ride.passenger}</b>
                <br />
                Data da viagem: <b>{ride.date}</b>
            </div>
        )
    }

    // Exibe a carona como disponível para ser aceite (com o botão "Cancelar carona")
    // (Exibido para usuários que são motoristas)
    renderAsAvailable_driver(ride) {
        return (
            <div>
                <div>
                    Carona para <b>{ride.destination}</b> ofericido por você, ninguém aceitou a viagem ainda
                </div>
                <div>
                    Data da viagem: <b>{ride.date}</b>
                </div>
                <button onClick={this.cancelRide} className="cancel_ride_button">Cancelar oferta de carona</button>
            </div>
        )
    }

    acceptRide() {
        let url = rides_base_url.replace("{id}", this.props.ride.id)
        let ride = this.props.ride;
        ride.passenger = this.props.user.id
        axios.put(url, ride)
            .then(_ => {
                alert("Carona aceita")
                window.location.reload()
            })
            .catch(err => {
                alert("Erro ao aceitar carona " + err)
            })
    }
    cancelRide() {
        let url = rides_base_url.replace("{id}", this.props.ride.id)
        let ride = this.props.ride;
        axios.delete(url, ride)
            .then(_ => {
                alert("Carona deletada")
                window.location.reload()
            })
            .catch(err => {
                alert("Erro ao deletar carona " + err)
            })
    }
}