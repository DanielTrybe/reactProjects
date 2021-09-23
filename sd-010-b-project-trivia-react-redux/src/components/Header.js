import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import md5 from 'crypto-js/md5';

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.photoSearch = this.photoSearch.bind(this);
    this.state = {
      photo: '',
    };
  }

  componentDidMount() {
    this.photoSearch();
  }

  photoSearch() {
    const { email } = this.props;
    const hash = md5(email).toString();
    this.setState({ photo: hash });
  }

  render() {
    const { name, score } = this.props;
    const { photo } = this.state;
    return (
      <header className="header-component">
        <img src={ `https://www.gravatar.com/avatar/${photo}` } data-testid="header-profile-picture" alt="my profile" />
        <p data-testid="header-player-name" className="header-name">{ name }</p>
        <p>
          <span>Total de Pontos: </span>
          <span data-testid="header-score">{ score }</span>
        </p>
      </header>
    );
  }
}

const mapStateToProps = (state) => ({
  email: state.user.email,
  name: state.user.name,
});

Header.propTypes = {
  name: PropTypes.string.isRequired,
  email: PropTypes.string.isRequired,
  score: PropTypes.number.isRequired,
};

export default connect(mapStateToProps)(Header);
