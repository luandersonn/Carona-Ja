import React, { Component } from 'react'
import { Redirect } from 'react-router'
import axios from 'axios'
import './DashboardPage.css'
import RidesList from './RidesList'
import Loader from 'react-loader-spinner'

export default class Dashboard extends Component {
    constructor(props) {
        super(props)
        this.state = {
            addRideClicked: false,
            user: null,
            isLoading: true
        }
        this.addRideClicked = this.addRideClicked.bind(this)
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
                isLoading: false
            })
        }
    }

    render() {
        const { user, isLoading, addRideCliked } = this.state


        if (isLoading) {
            return (<Loader className="centered"
                type="Oval"
                color="#6c63ff"
                height={100}
                width={100}

            />)
        }
        else if (addRideCliked == true) {
            return (<Redirect
                to={{
                    pathname: "/add_ride",
                    state: { user: user }
                }} />)
        }
        else if (user == null)
            return <Redirect to="/" />
        else if (user.type == "passenger")
            return (
                <div>
                    <h1 className="page_title">Passageiro</h1>
                    <h3 className="page_title">Bem-vindo, {user.name}</h3>
                    <RidesList user={user} type="accepted_rides_passenger" />
                    <RidesList type="all_rides" user={user} />
                </div>
            )
        else
            return (
                <div>
                    <h1 className="page_title">Motorista</h1>
                    <h3 className="page_title">Bem-vindo, {user.name}</h3>
                    <button className="add_ride_button" onClick={this.addRideClicked}>Ofertar nova carona</button>
                    <RidesList user={user} type="pending_rides" />
                    <RidesList type="accepted_rides_driver" user={user} />
                </div>
            )
    }

    addRideClicked() {
        this.setState({ addRideCliked: true })
    }
}