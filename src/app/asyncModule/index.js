import React, { Component } from 'react'
import './style.css'

class Module extends Component {
    componentDidMount() {
        console.log('module component did mount')
    }

    render() {
        return (
            <div className="async-module">
                this is a async Module
            </div>
        )
    }
}

export default Module