import React, { Component } from "react";
import logo from "../../assets/logo.png";
import moment from "moment";
import { Form, Container } from "./styles";
import CompareList from "../../components/CompareList";

import api from "../../services/api";

export default class Main extends Component {
  state = {
    repositoryError: false,
    repositoryInput: "",
    repositories: [],
    nameRepository: []
  };

  handleAddRepository = async e => {
    e.preventDefault();
    this.setState({ loading: true });
    try {
      const { data: repository } = await api.get(
        `/repos/${this.state.repositoryInput}`
      );
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      this.setState({
        loading: false,
        repositoryInput: "",
        repositories: [...this.state.repositories, repository],
        repositoryError: false
      });
      localStorage.setItem(
        "@repositoriogit",
        JSON.stringify(this.state.repositories)
      );

      console.log(JSON.parse(localStorage.getItem("@repositoriogit")));
    } catch (err) {
      this.setState({
        repositoryError: true
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    //window.localStorage.removeItem("@repositoriogit");
    const obj = JSON.parse(localStorage.getItem("@repositoriogit"));
    console.log(obj);
    if (!obj) {
      return;
    }
    this.setState({
      repositories: obj
    });
  }
  handleRefresh = async full_name => {
    const { repositories } = this.state;
    console.log(repositories.length);
    const elem = repositories.filter(function(n) {
      return n.full_name !== full_name;
    });
    this.setState({
      repositories: elem
    });
    try {
      const { data: repository } = await api.get(`/repos/${full_name}`);
      repository.lastCommit = moment(repository.pushed_at).fromNow();
      this.setState({
        repositories: [...this.state.repositories, repository]
      });
      localStorage.removeItem("@repositoriogit");
      localStorage.setItem(
        "@repositoriogit",
        JSON.stringify(this.state.repositories)
      );
    } catch (error) {
      this.setState({
        repositoryError: true
      });
    }
  };
  handleOnClick = async id => {
    const { repositories } = this.state;

    const resp = await repositories.filter(function(n) {
      return n.id !== id;
    });

    console.log("antes: " + repositories.length);
    this.setState({
      repositories: [...resp]
    });
    console.log("depois: " + this.state.repositories.length);
    localStorage.removeItem("@repositoriogit");
    localStorage.setItem("@repositoriogit", JSON.stringify(resp));
  };
  render() {
    return (
      <Container>
        <img src={logo} alt="Github Compare" />

        <Form
          onSubmit={this.handleAddRepository}
          withError={this.state.repositoryError}
        >
          <input
            type="text"
            placeholder="usuário/repositorio"
            value={this.state.repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">
            {this.state.loading ? (
              <i className="fa fa-spinner fa-pulse" />
            ) : (
              "OK"
            )}
          </button>
        </Form>
        <CompareList
          repositories={this.state.repositories}
          remover={this.handleOnClick}
          atualizar={this.handleRefresh}
        />
      </Container>
    );
  }
}
