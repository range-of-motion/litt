import { bridge } from '../config'

import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'
import { TwitterPicker } from 'react-color'

import { toggleLight, updateLightBrightness } from '../actions'

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
    handleToggle() {
        axios.put(bridge.address + '/api/' + bridge.key + '/lights/' + this.props.id + '/state', {
            on: !this.props.on
        })

        this.props.toggleLight(this.props.id)
    }

    handlePlaceholder(event) {
        axios.put(bridge.address + '/api/' + bridge.key + '/lights/' + this.props.id + '/state', {
            bri: Number(event.target.value)
        })

        this.props.updateLightBrightness(this.props.id, event.target.value)
    }

    render() {
        return (
            <li>
                <div className="row">
                    <div className="column align-middle">
                        <p>{this.props.name}</p>
                    </div>
                    <div className="column align-middle align-right">
                        <input type="checkbox" onChange={this.handleToggle.bind(this)} checked={this.props.on} />
                    </div>
                </div>
                <input type="range" value={this.props.brightness} min="0" max="255" onChange={this.handlePlaceholder.bind(this)} />
            </li>
        )
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        toggleLight: id => {
            dispatch(toggleLight(id))
        },

        updateLightBrightness: (id, brightness) => {
            dispatch(updateLightBrightness(id, brightness))
        }
    }
}

export default connect(null, mapDispatchToProps)(Light)
