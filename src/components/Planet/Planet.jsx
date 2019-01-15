import React, { PureComponent } from 'react';

import Sattelite from '../Sattelite/Sattelite';

import './styles.scss';

class Planet extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            title: props.title,
            radius: props.radius,
            rotation: props.rotation,
            time: props.time,
            color: props.color,
        }
    }

    render() {
        return (
            <div className="frame">
                <div className={this.props.className} style={{
                    width: this.state.radius * 2,
                    height: this.state.radius * 2,
                    left: this.state.radius,
                    top: this.state.rotation - this.state.radius,
                    backgroundColor: this.state.color
                }}>{this.state.title}</div>
            </div>
        )
    }
}

export default Planet;
