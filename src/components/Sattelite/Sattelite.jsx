import React, { PureComponent } from 'react';

import './styles.scss';

class Satellite extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            parentRadius: props.parentRadius,
            parentRotation: props.parentRotation,
            parentTime: props.parentTime,
            parentColor: props.parentColor,
            name: props.name,
            radius: props.radius,
            rotation: props.rotation,
            time: props.time,
        }
    }
    render() {
        return (
            <div className="frame" style={{ backgroundColor: 'transparent', borderColor: 'black' }}>
            </div>
        )
    }
}

export default Satellite;