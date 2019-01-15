import React, { PureComponent } from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";

import Header from '../Header/Header';
import { planetsService } from "../../services/planetsService";
import { sattelitesService } from "../../services/sattelitesService";

import "./styles.scss";

class ObjectForm extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      type: "",
      radius: 0,
      rotation: 0,
      time: 0,
      planets: [],
      sattelites: []
    };

    this.updateItem = this.updateItem.bind(this);
    this.handleTitleChange = this.handleTitleChange.bind(this);
    this.handleRadiusChange = this.handleRadiusChange.bind(this);
    this.handleRotationChange = this.handleRotationChange.bind(this);
    this.handleTimeChange = this.handleTimeChange.bind(this);
    this.getPlanetById = this.getPlanetById.bind(this);
    this.getSatteliteById = this.getSatteliteById.bind(this);
    this.showSattelitesForPlanet = this.showSattelitesForPlanet.bind(this);
  }


  showSattelitesForPlanet(e) {
    e.preventDefault();
    if (!e.target.hasAttribute('placeholder')) {
      this.props.showSattelitesForPlanet(this.props.id);
    }
  }

  componentDidMount() {
    if (this.props.type === "planet") {
      let currentPlanet = {
        title: this.props.title,
        radius: this.props.radius,
        rotation: this.props.rotation,
        time: this.props.time
      };
      this.setState({
        title: currentPlanet.title,
        radius: currentPlanet.radius,
        rotation: currentPlanet.rotation,
        time: currentPlanet.time,
        planets: this.props.planets
      });
    } else if (this.props.type === "sattelite") {
      let currentPlanet = {
        title: this.props.title,
        radius: this.props.radius,
        rotation: this.props.rotation,
        time: this.props.time
      }
      this.setState({
        title: currentPlanet.title,
        radius: currentPlanet.radius,
        rotation: currentPlanet.rotation,
        time: currentPlanet.time,
        planets: this.props.planets
      })
    }
  }

  handleTitleChange(e) {
    this.setState({
      title: e.target.value
    });
  }

  handleRadiusChange(e) {
    this.setState({
      radius: e.target.value
    });
  }

  handleRotationChange(e) {
    this.setState({
      rotation: e.target.value
    });
  }

  handleTimeChange(e) {
    this.setState({
      time: e.target.value
    });
  }

  updateItem(e) {
    let newItem = {
      id: this.props.id,
      title: this.state.title,
      radius: this.state.radius,
      rotation: this.state.rotation,
      time: this.state.time
    };

    this.props.updateItem(this.props.type, newItem);
  };

  getPlanetById = async planet => {
    await planetsService.getPlanetById(planet.id);
  };

  getSatteliteById = async sattelite => {
    await sattelitesService.getSatteliteById(sattelite.id);
  };

  render() {
    return (
      <Form className="objectForm" onClick={this.showSattelitesForPlanet}>
        <Header title={this.state.title} />
        <FormGroup>
          <Label for="title">Title</Label>
          <Input
            type="text"
            id="title"
            value={this.state.title}
            onChange={this.handleTitleChange}
            placeholder="Enter planet/sattelite title"
          />
        </FormGroup>
        <FormGroup>
          <Label for="radius">Radius</Label>
          <Input
            type="number"
            id="radius"
            value={this.state.radius}
            onChange={this.handleRadiusChange}
            placeholder="Enter planet/sattelite radius"
          />
        </FormGroup>
        <FormGroup>
          <Label for="rotation">Rotation</Label>
          <Input
            type="number"
            id="rotation"
            value={this.state.rotation}
            onChange={this.handleRotationChange}
            placeholder="Enter rotation"
          />
        </FormGroup>
        <FormGroup>
          <Label for="time">Time</Label>
          <Input
            type="number"
            id="time"
            value={this.state.time}
            onChange={this.handleTimeChange}
            placeholder="Enter planet/sattelite time"
          />
        </FormGroup>
        <Button onClick={this.updateItem}>Save</Button>
      </Form>
    );
  }
}

export default ObjectForm;
