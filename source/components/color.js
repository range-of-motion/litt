import React from 'react'

export default class Color extends React.Component {
    handleClick(e) {
        e.preventDefault()

        this.props.handleColor(this.props.red, this.props.green, this.props.blue)
    }

    render() {
        return (
            <button className="color" style={{ background: 'rgb(' + this.props.red + ', ' + this.props.green + ', ' + this.props.blue + ')' }} onClick={this.handleClick.bind(this)}></button>
        )
    }
}
