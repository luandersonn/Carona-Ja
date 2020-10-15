import React, { Component } from 'react'
import axios from 'axios'
import RideListItem from './RideListItem'
import Loader from 'react-loader-spinner'

import './RidesList.css'

const rides_list_base_url = "http://localhost:3001/rides"

export default class RidesList extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isLoading: true,
            rides: []
        }
    }

    componentDidMount() {
        this.loadData()
    }

    render() {
        var list_type = this.props.type
        const { isLoading, rides } = this.state
        if (isLoading) {
            return (<Loader className="centered"
                type="Oval"
                color="#6c63ff"
                height={100}
                width={100}

            />)
        }

        switch (list_type) {
            case "all_rides":
                return this.renderAllRidesAvailable(rides, this.props.user)
            case "accepted_rides_passenger":
                return this.renderMyAcceptedRides_passenger(rides, this.props.user)
            case "accepted_rides_driver":
                return this.renderMyAcceptedRides_driver(rides, this.props.user)
            case "pending_rides":
                return this.renderMyPendingRides(rides, this.props.user)
            default:
                return (<div>Tipo de lista inválido</div>)
        }
    }

    loadData() {
        axios.get(rides_list_base_url)
            .then(response => {
                this.setState({
                    isLoading: false,
                    rides: response.data
                })
            }, () => {
                alert("Erro ao carregar corridas")
            })
    }

    // Exibe todas as caronas que foram aceitas pelo usuário (como passageiro)
    renderMyAcceptedRides_passenger(rides, user) {
        return (
            <div>
                <h3 className="rides_title">Caronas que eu aceitei</h3>
                <ul className="ListWithoutDot rides_list">
                    {rides.filter(item => item.passenger == user.id).map(item => <RideListItem ride={item} user={user} />)}
                </ul>
            </div >
        )
    }

    // Exibe todas as caronas disponíveis (em que não há passageiro confirmado)
    renderAllRidesAvailable(rides, user) {
        return (
            <div>
                <h3 className="rides_title">Caronas disponíveis</h3>
                <ul className="ListWithoutDot rides_list">
                    {rides.filter(item => item.passenger == null).map(item => <RideListItem ride={item} user={user} />)}
                </ul>
            </div >
        )
    }

    // Exibe todas as caronas oferecidas pelo usuário (como motorista) que ainda não foram aceitas por nenhum passageiro
    renderMyPendingRides(rides, user) {
        return (
            <div>
                <h3 className="rides_title">Minhas caronas pendentes</h3>
                <ul className="ListWithoutDot rides_list">
                    {rides.filter(item => item.driver == user.id && item.passenger == null).map(item => <RideListItem ride={item} user={user} />)}
                </ul>
            </div >
        )
    }

    // Exibe todas as caronas oferecidas pelo usuário (como motorista) que foram aceitas por algum passageiro
    renderMyAcceptedRides_driver(rides, user) {
        return (
            <div>
                <h3 className="rides_title">Minhas caronas aceitas</h3>
                <ul className="ListWithoutDot rides_list">
                    {rides.filter(item => item.driver == user.id && item.passenger != null).map(item => <RideListItem ride={item} user={user} />)}
                </ul>
            </div >
        )
    }
}