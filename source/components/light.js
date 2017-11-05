import { bridge } from '../config'

import React from 'react'
import { connect } from 'react-redux'
import axios from 'axios'

import { toggleLight, updateLightBrightness } from '../actions'

import Color from './color'

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

    handleColor(red, green, blue) {
        axios.put(bridge.address + '/api/' + bridge.key + '/lights/' + this.props.id + '/state', {
            xy: convertColor(red, green, blue)
        })
    }

    render() {
        return (
            <li>
                <div className="row">
                    <div className="column align-middle">
                        <h1>{this.props.name}</h1>
                    </div>
                    <div className="column align-middle align-right">
                        <button className={"toggle " + (this.props.on ? 'checked' : '' )} onClick={this.handleToggle.bind(this)}>
                            <div className="button"></div>
                        </button>
                    </div>
                </div>
                <input type="range" value={this.props.brightness} min="0" max="255" onChange={this.handlePlaceholder.bind(this)} />
                <div className="colors">
                    <Color handleColor={this.handleColor.bind(this)} red="255" green="105" blue="0" />
                    <Color handleColor={this.handleColor.bind(this)} red="252" green="185" blue="0" />
                    <Color handleColor={this.handleColor.bind(this)} red="0" green="208" blue="132" />
                    <Color handleColor={this.handleColor.bind(this)} red="6" green="147" blue="227" />
                    <Color handleColor={this.handleColor.bind(this)} red="235" green="20" blue="76" />
                    <Color handleColor={this.handleColor.bind(this)} red="247" green="141" blue="167" />
                    <Color handleColor={this.handleColor.bind(this)} red="153" green="0" blue="239" />
                </div>
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
