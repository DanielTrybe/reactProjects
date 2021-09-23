import React from 'react';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

class Feedback extends React.Component {
  constructor(props) {
    super(props);
    this.photoSearch = this.photoSearch.bind(this);
    this.state = {
      photo: '',
    };
  }

  componentDidMount() {
    this.photoSearch();
    // this.getPlayer();
  }

  getPlayer(hash) {
    // const { photo } = this.state;
    const ranking = JSON.parse(localStorage.getItem('ranking'));
    const playerInfo = JSON.parse(localStorage.getItem('state'));
    const player = {
      name: playerInfo.player.name,
      score: playerInfo.player.score,
      picture: hash };
    if (ranking) {
      const rankingPlayers = [...ranking, player];
      return localStorage.setItem('ranking', JSON.stringify(rankingPlayers));
    }

    return (localStorage.setItem('ranking', JSON.stringify([player])));
  }

  photoSearch() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ photo: hash }, () => this.getPlayer(hash));
  }

  renderMessage() {
    const getAssertions = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = getAssertions;
    const lowScore = 3;
    if (assertions < lowScore) {
      return (
        <div
          data-testid="feedback-text"
          className="score"
        >
          Podia ser melhor...
        </div>
      );
    }
    return (
      <div
        data-testid="feedback-text"
        className="score"
      >
        Mandou bem!
      </div>
    );
  }

  renderButtons() {
    return (
      <div className="feedback-buttons">
        <Link to="/">
          <button
            data-testid="btn-play-again"
            type="button"
          >
            &#9658;
          </button>
        </Link>
        <Link to="/ranking">
          <button
            data-testid="btn-ranking"
            type="button"
            className="ranking-button"
          >
            &#10032;
          </button>
        </Link>
      </div>
    );
  }

  render() {
    const { name } = this.props;
    const { photo } = this.state;
    const getScore = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = getScore;
    const getAssertions = JSON.parse(localStorage.getItem('state'));
    const { player: { assertions } } = getAssertions;
    return (
      <div className="feedback-div">
        <h1 className="feedback-title">Resultado</h1>
        <div className="feedback-results">
          <span>Acertou:</span>
          <p
            data-testid="feedback-total-question"
            className="feedback-score"
          >
            { assertions }
          </p>
          <span>Pontos</span>
          <p
            data-testid="feedback-total-score"
            className="feedback-score"
          >
            { score }
          </p>
          <p
            data-testid="header-score"
            className="feedback-score-2"
          >
            { score }
          </p>
        </div>
        <div className="feedback-main">
          <img
            src={ `https://www.gravatar.com/avatar/${photo}` }
            data-testid="header-profile-picture"
            alt="my profile"
          />
          <section className="feedback-player-data">
            <p data-testid="header-player-name">{ name }</p>
            { this.renderMessage() }
          </section>
        </div>
        {this.renderButtons()}
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

Feedback.propTypes = {
  email: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Feedback);
