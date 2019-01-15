import React, { PureComponent } from "react";
import { Button } from "reactstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

import Header from "../Header/Header";
import ObjectForm from "../ObjectForm/ObjectForm";

import { planetsService } from "../../services/planetsService";
import { sattelitesService } from "../../services/sattelitesService";

import "./styles.scss";

class ObjectColumn extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            planets: [],
            sattelites: [],
            sattelitesForms: []
        };

        this.addPlanetObjectForm = this.addPlanetObjectForm.bind(this);
        this.addSatteliteObjectForm = this.addSatteliteObjectForm.bind(this);
        this.showSattelitesForPlanet = this.showSattelitesForPlanet.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    componentDidMount() {
        planetsService
            .getAll()
            .then(planets => this.setState({ planets: planets }));
        sattelitesService
            .getAll()
            .then(sattelites => this.setState({ sattelites: sattelites }));
    }

    addPlanetObjectForm = async e => {
        let newPlanet = {
            id: this.state.planets.length + 1,
            title: "",
            radius: 0,
            rotation: 0,
            time: 0
        };

        await planetsService.add(newPlanet);

        this.setState({
            ...this.state,
            planets: [...this.state.planets, newPlanet]
        });
    };

    updateItem(type, newItem) {
        this.props.updateItem(type, newItem);
    }

    addSatteliteObjectForm = async e => {
        let newSattelite = {
            id: this.state.sattelites.length + 1,
            title: "",
            radius: 0,
            rotation: 0,
            time: 0
        };

        await sattelitesService.add(newSattelite);

        this.setState({
            ...this.state,
            sattelites: [...this.state.sattelites, newSattelite]
        });
    };

    showSattelitesForPlanet(id) {
        this.props.getSattelitesForPlanet(id);
    }

    render() {
        const planetsForms = [],
            sattelitesForms = [];

        if (this.props.planets) {
            for (let i = 0; i < this.props.planets.length; i++) {
                planetsForms.push(
                    <ObjectForm
                        key={this.props.planets[i].id}
                        id={this.props.planets[i].id}
                        type="planet"
                        title={this.props.planets[i].title}
                        rotation={this.props.planets[i].rotation}
                        radius={this.props.planets[i].radius}
                        time={this.props.planets[i].time}
                        planets={this.props.planets}
                        showSattelitesForPlanet={this.showSattelitesForPlanet}
                        updateItem={this.updateItem}
                    />
                );
            }

        }

        if (this.props.sattelites) {
            for (let i = 0; i < this.props.sattelites.length; i++) {
                sattelitesForms.push(
                    <ObjectForm key={this.props.sattelites[i].id}
                        id={this.props.sattelites[i].id}
                        type='sattelite'
                        title={this.props.sattelites[i].title}
                        rotation={this.props.sattelites[i].rotation}
                        radius={this.props.sattelites[i].radius}
                        time={this.props.sattelites[i].time}
                        planets={this.props.planets}
                    />
                );
            }
        }

        if (this.props.title === "planets") {
            return (
                <div className={this.props.className}>
                    <Header title={this.props.title} />
                    {planetsForms}
                    <Button onClick={this.addPlanetObjectForm} color="success">
                        <FontAwesomeIcon icon={this.props.icon || faPlus} />
                    </Button>
                </div>
            );
        } else {
            return (
                <div className={this.props.className}>
                    <Header title={this.props.title} />
                    {sattelitesForms}
                    <Button onClick={this.addSatteliteObjectForm} color="success">
                        <FontAwesomeIcon icon={this.props.icon || faPlus} />
                    </Button>
                </div>
            );
        }
    }
}

export default ObjectColumn;
