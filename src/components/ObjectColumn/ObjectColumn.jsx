import React, { PureComponent } from 'react';
import { Button } from 'reactstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

import Header from '../Header/Header';
import ObjectForm from '../ObjectForm/ObjectForm';

import { spaceService } from '../../SpaceService';
import { planetsService } from '../../services/planetsService';
import { sattelitesService } from '../../services/sattelitesService';

import './styles.scss';

class ObjectColumn extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            planets: [],
            sattelites: []
        }

        this.addObjectForm = this.addObjectForm.bind(this);
    }

    componentDidMount() {
        planetsService.getAll().then(planets => this.setState({ planets }));
        sattelitesService.getAll().then(sattelites => this.setState({ sattelites }));
    }

    addObjectForm(e) {
        e.preventDefault();
        this.setState({
            countOfPlanets: this.state.planets.length++
        });
    }

    addObjectForm = async (e) => {
        let newItem = {
            id: Date.now(),
            title: '',
            radius: 0,
            rotation: 0,
            time: 0
        };

        await spaceService.add(newItem);

        this.setState({
            ...this.state,
            items: [...this.state.items, newItem]
        });
    }

    render() {
        const planetsForms = [],
            sattelitesForms = [];

        for (let i = 0; i < this.state.planets.length; i++) {
            planetsForms.push(
                <ObjectForm key={this.state.planets[i].id} />
            );
        }

        for (let i = 0; i < this.state.sattelites.length; i++) {
            sattelitesForms.push(
                <ObjectForm key={this.state.sattelites[i].id} />
            );
        }

        if (this.props.title === 'planets') {
            return (
                <div className={this.props.className}>
                    <Header title={this.props.title} />
                    {planetsForms}
                    <Button onClick={this.addObjectForm} color='success'>
                        <FontAwesomeIcon icon={this.props.icon || faPlus} />
                    </Button>
                </div>
            )
        }
        else {
            return (
                <div className={this.props.className}>
                    <Header title={this.props.title} />
                    {sattelitesForms}
                    <Button onClick={this.addObjectForm} color='success'>
                        <FontAwesomeIcon icon={this.props.icon || faPlus} />
                    </Button>
                </div>
            )
        }
    }
}

export default ObjectColumn;
