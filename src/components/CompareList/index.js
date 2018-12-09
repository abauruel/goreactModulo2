import React from "react";
import { Container, Repository } from "./styles";
import PropTypes from "prop-types";

const CompareList = ({ repositories, remover, atualizar }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <label>
          <button type="submit" onClick={() => atualizar(repository.full_name)}>
            <i className="fa fa-refresh" />
          </button>
          <button
            type="submit"
            id={repository.id}
            onClick={() => remover(repository.id)}
          >
            <i className="fa fa-times" />
          </button>
        </label>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count}
            <small>stars</small>
          </li>
          <li>
            {repository.forks_count}
            <small>forks</small>
          </li>
          <li>
            {repository.open_issues_count}
            <small>issues</small>
          </li>
          <li>
            {repository.lastCommit}
            <small>last commits</small>
          </li>
        </ul>
      </Repository>
    ))}
  </Container>
);
CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        avatar_url: PropTypes.string,
        login: PropTypes.string
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      lastCommit: PropTypes.string
    })
  ).isRequired
};
export default CompareList;
