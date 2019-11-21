import React, { Component } from 'react'
import './style.css'

class Module extends Component {
    componentDidMount() {
        console.log('module component did mount')
    }

    render() {
        return (
            <div className="module">
                this is a Module
            </div>
        )
    }
}

export default Module