import { bridge } from '../config'

import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { addLight } from '../actions'

import Light from './light'

class App extends React.Component {
    constructor(props) {
        super(props)

        this.populate()
    }

    populate() {
        axios.get(bridge.address + '/api/' + bridge.key + '/lights').then(response => {
            const json = response.data

            for (const key in json) {
                const light = json[key]

                if (light.state.reachable) {
                    this.props.addLight(key, light.uniqueid, light.name, light.state.on, light.state.bri)
                }
            }
        })
    }

    render() {
        const lights = this.props.lights.map(light => {
            return <Light key={light.id} id={light.id} name={light.name} on={light.on} brightness={light.brightness} />
        })

        return (
            <ul>
                {lights}
            </ul>
        )
    }
}

function mapStateToProps(state) {
    return {
        lights: state.lights
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        addLight: (id, uid, name, on, brightness) => {
            dispatch(addLight(id, uid, name, on, brightness))
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(App)
