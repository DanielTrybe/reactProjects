import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Ranking extends Component {
  podiumPlayers(index) {
    if (index === 0) {
      return <td className="podium1">&#10032;</td>;
    }
    if (index === 1) {
      return <td className="podium2">&#10032;</td>;
    }
    if (index === 2) {
      return <td className="podium3">&#10032;</td>;
    }
    return <td />;
  }

  render() {
    const rankingPlayer = JSON.parse(localStorage.getItem('ranking')).sort(
      (a, b) => b.score - a.score,
    );
    return (
      <section className="ranking-page-outer">
        <section data-testid="ranking-title" className="ranking-page">
          <h1>Ranking</h1>
          <table>
            <tr>
              <th aria-label="ranking-position" />
              <th aria-label="profile-picture" />
              <th>Jogador</th>
              <th>Pontos</th>
            </tr>
            {rankingPlayer.map((player, index) => (
              <tr key={ index }>
                { this.podiumPlayers(index) }
                <td>
                  <img src={ `https://www.gravatar.com/avatar/${player.picture}` } width="50px" alt="profile" />
                </td>
                <td>
                  <span data-testid={ `player-name-${index}` }>{player.name}</span>
                </td>
                <td>
                  <span data-testid={ `player-score-${index}` }>{player.score}</span>
                </td>
              </tr>))}
          </table>
          <Link to="/">
            <button
              data-testid="btn-go-home"
              type="button"
            >
              &#9658;
            </button>
          </Link>
        </section>
      </section>
    );
  }
}
