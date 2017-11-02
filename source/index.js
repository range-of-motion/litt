const config = {
    bridge: {
        address: '',
        key: ''
    }
}

import React from 'react'
import { render } from 'react-dom'
import axios from 'axios'
import { TwitterPicker } from 'react-color'

function convertColor(red, green, blue) {
    red = (red > 0.04045) ? Math.pow((red + 0.055) / (1.0 + 0.055), 2.4) : (red / 12.92)
    green = (green > 0.04045) ? Math.pow((green + 0.055) / (1.0 + 0.055), 2.4) : (green / 12.92)
    blue = (blue > 0.04045) ? Math.pow((blue + 0.055) / (1.0 + 0.055), 2.4) : (blue / 12.92)

    var X = red * 0.664511 + green * 0.154324 + blue * 0.162028
    var Y = red * 0.283881 + green * 0.668433 + blue * 0.047685
    var Z = red * 0.000088 + green * 0.072310 + blue * 0.986039

    var fx = X / (X + Y + Z)
    var fy = Y / (X + Y + Z)

    if (isNaN(fx)) {
        fx = 0.0
    }

    if (isNaN(fy)) {
        fy = 0.0
    }

    return [Number(fx.toPrecision(4)), Number(fy.toPrecision(4))];
}

class Light extends React.Component {
    handleColorChange(color, event) {
        axios.put(config.bridge.address + '/api/' + config.bridge.key + '/lights/' + this.props.id + '/state', {
            xy: convertColor(color.rgb.r, color.rgb.g, color.rgb.b)
        })
    }

    render() {
        return (
            <li>
                <p>{this.props.name}</p>
                <p>{this.props.on ? 'On' : 'Off' }</p>
                <TwitterPicker onChange={this.handleColorChange.bind(this)} />
            </li>
        )
    }
}

class App extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            lights: []
        }

        this.populate()
    }

    populate() {
        axios.get(config.bridge.address + '/api/' + config.bridge.key + '/lights').then(response => {
            const json = response.data

            for (const key in json) {
                if (json[key].state.reachable) {
                    this.setState({
                        lights: [...this.state.lights, {
                            id: key,
                            name: json[key].name,
                            on: json[key].state.on
                        }]
                    })
                }
            }
        })
    }

    render() {
        const lights = this.state.lights.map(light => {
            return <Light key={light.id} id={light.id} name={light.name} on={light.on} />
        })

        return (
            <ul>
                {lights}
            </ul>
        )
    }
}

render(<App />, document.getElementById('app'))
