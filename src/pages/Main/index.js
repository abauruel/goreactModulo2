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
        repositoryError: false,
        nameRepository: [
          ...this.state.nameRepository,
          `${this.state.repositoryInput}`
        ]
      });
      localStorage.setItem("@repositoriogit", this.state.repositories);

      console.log(localStorage.getItem("@repositoriogit"));
    } catch (err) {
      this.setState({
        repositoryError: true
      });
    } finally {
      this.setState({ loading: false });
    }
  };

  componentDidMount() {
    const repositorioGit = localStorage.getItem("@repositoriogit");
    console.log(repositorioGit);
    if (repositorioGit.length) {
      return;
    }
    this.setState({
      repositories: [...this.state.repositories, repositorioGit]
    });
  }

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
        <CompareList repositories={this.state.repositories} />
      </Container>
    );
  }
}
