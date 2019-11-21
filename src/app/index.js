import React, { Component } from 'react'
import { join } from 'lodash-es'
import LazyLoad from 'react-lazy-load'
import Module from './module'
import AsyncModule from './asyncModule'
import './style.css'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {
            asyncModule: null
        }
    }
    
    componentDidMount() {
        console.log('app component did mount')
    }


    render() {
        return (
            <div>
                <Module />
                <Module />
                <Module />
                <Module />
                <LazyLoad>
                    <AsyncModule />
                </LazyLoad>
            </div>
        )
    }
}

export default App