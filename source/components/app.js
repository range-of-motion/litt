import { bridge } from '../config'

import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'

import Light from './light'

export default class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lights: []
        }

        this.populate()
    }

    populate() {
        axios.get(bridge.address + '/api/' + bridge.key + '/lights').then(response => {
            const json = response.data

            for (const key in json) {
                if (json[key].state.reachable) {
                    this.setState({
                        lights: [...this.state.lights, {
                            id: key,
                            name: json[key].name,
                            on: json[key].state.on,
                            brightness: json[key].state.bri
                        }]
                    })
                }
            }
        })
    }

    flipOn(id) {
        const lights = this.state.lights

        lights.forEach(light => {
            if (light.id === id) {
                light.on = !light.on
            }
        })

        this.setState({
            lights: lights
        })
    }

    render() {
        const lights = this.state.lights.map(light => {
            return <Light key={light.id} id={light.id} name={light.name} on={light.on} brightness={light.brightness} flipOn={this.flipOn.bind(this)} />
        })

        return (
            <ul>
                {lights}
            </ul>
        )
    }
}
