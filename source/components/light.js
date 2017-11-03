import { bridge } from '../config'

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

export default class Light extends React.Component {
    constructor(props) {
        super(props)

        this.state = {
            brightness: this.props.brightness
        }
    }

    handleSwitchClick() {
        axios.put(bridge.address + '/api/' + bridge.key + '/lights/' + this.props.id + '/state', {
            on: !this.props.on
        })

        this.props.flipOn(this.props.id)
    }

    handleColorChange(color, event) {
        axios.put(bridge.address + '/api/' + bridge.key + '/lights/' + this.props.id + '/state', {
            xy: convertColor(color.rgb.r, color.rgb.g, color.rgb.b)
        })
    }

    handleBrightnessChange(event) {
        axios.put(bridge.address + '/api/' + bridge.key + '/lights/' + this.props.id + '/state', {
            bri: Number(event.target.value)
        })

        this.setState({ brightness: event.target.value })
    }

    render() {
        return (
            <li>
                <p>{this.props.name}</p>
                <button onClick={this.handleSwitchClick.bind(this)}>Switch</button>
                <p>{this.props.on ? 'On' : 'Off' }</p>
                <TwitterPicker onChange={this.handleColorChange.bind(this)} />
                <input type="range" min="0" max="255" step="1" value={this.state.brightness} onChange={this.handleBrightnessChange.bind(this)} />
            </li>
        )
    }
}
