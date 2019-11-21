import React, { Component } from 'react'
import { join } from 'lodash-es'

import './style.css'

class DynamicModule extends Component {
    render() {
        return (
            <div className="dynamic-module">
                {
                    join(['this', 'is', 'a', 'dynamic', 'module'], ' ')
                }
            </div>
        )
    }
}

export default DynamicModule