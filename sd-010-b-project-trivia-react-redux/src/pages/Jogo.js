import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import PerguntaAtual from '../components/PerguntaAtual';

class Jogo extends React.Component {
  constructor(props) {
    super(props);
    this.answers = this.answers.bind(this);
    this.somaPergunta = this.somaPergunta.bind(this);
    this.buttonAvaliable = this.buttonAvaliable.bind(this);
    this.paintAnswerCorrect = this.paintAnswerCorrect.bind(this);
    this.paintAnswerIncorrect = this.paintAnswerIncorrect.bind(this);
    this.paintAll = this.paintAll.bind(this);
    this.changeTimerState = this.changeTimerState.bind(this);
    this.temporizador = this.temporizador.bind(this);
    this.stopTimer = this.stopTimer.bind(this);
    this.stopOnClick = this.stopOnClick.bind(this);
    this.renderTotal = this.renderTotal.bind(this);
    this.state = {
      randomAnswer: {},
      perguntaNumber: 0,
      buttonDisable: true,
      timer: 30,
      myTimer: null,
      score: 0,
    };
  }

  componentDidMount() {
    this.answers();
    this.temporizador();
  }

  buttonAvaliable() {
    this.setState({
      buttonDisable: false,
    });
  }

  answers() {
    const { perguntaNumber } = this.state;
    const { questions: { results } } = this.props;
    const allAnswers = [...results[perguntaNumber].incorrect_answers];
    const numberOfQuestions = 4;
    const randomPosition = Math.floor(Math.random() * numberOfQuestions);
    allAnswers.splice(randomPosition, 0, results[perguntaNumber].correct_answer);
    this.setState({
      randomAnswer: { allAnswers,
        category: results[perguntaNumber].category,
        question: results[perguntaNumber].question,
        correctAnswer: results[perguntaNumber].correct_answer,
        dificuldade: results[perguntaNumber].difficulty,
      },
    });
  }

  stopTimer() {
    const { timer, myTimer } = this.state;
    if (timer <= 0) {
      this.buttonAvaliable();
      return clearInterval(myTimer);
    }
  }

  stopOnClick() {
    const { myTimer } = this.state;
    clearInterval(myTimer);
  }

  somaPergunta() {
    this.setState((previ) => ({
      perguntaNumber: previ.perguntaNumber + 1,
      buttonDisable: true,
      timer: 30,
    }), () => this.answers());
    this.paintAll();
    this.temporizador();
  }

  paintAnswerCorrect() {
    const correct = document.getElementById('correct');
    correct.style.border = 'none';
    correct.style.boxShadow = 'none';
  }

  paintAnswerIncorrect() {
    const branco = document.getElementsByClassName('incorrect');
    for (let key = 0; key < branco.length; key += 1) {
      branco[key].style.border = 'none';
      branco[key].style.boxShadow = 'none';
    }
  }

  paintAll() {
    this.paintAnswerIncorrect();
    this.paintAnswerCorrect();
  }

  temporizador() {
    const SECOND = 1000;
    this.setState({
      myTimer: setInterval(this.changeTimerState, SECOND),
    });
  }

  changeTimerState() {
    this.setState((prev) => ({
      timer: prev.timer - 1,
    }), () => this.stopTimer());
  }

  renderNextButton() {
    const lastQuestion = 4;
    const { buttonDisable, perguntaNumber } = this.state;
    if (buttonDisable) {
      return null;
    }
    if (perguntaNumber < lastQuestion) {
      return (
        <button
          data-testid="btn-next"
          type="button"
          onClick={ () => this.somaPergunta() }
          className="next-btn"
        >
          <span className="next-icon">&#10145;</span>
        </button>
      );
    }
    return (
      <Link to="/feedback">
        <button
          type="button"
          data-testid="btn-next"
          className="next-btn"
          onClick={ () => this.somaPergunta() }
        >
          Resultado
        </button>
      </Link>
    );
  }

  renderTotal() {
    const getScore = JSON.parse(localStorage.getItem('state'));
    const { player: { score } } = getScore;
    this.setState({
      score,
    });
  }

  render() {
    const { randomAnswer, timer, score } = this.state;
    return (
      <section>
        <Header score={ score } />
        <section className="game-section">
          <div className="timer">
            { timer }
          </div>
          <PerguntaAtual
            randomAnswer={ randomAnswer }
            buttonAvaliable={ () => this.buttonAvaliable() }
            timer={ timer }
            stopOnClick={ () => this.stopOnClick() }
            renderTotal={ this.renderTotal }
          />
          { this.renderNextButton() }
        </section>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.user.questions,
});

Jogo.propTypes = {
  questions: PropTypes.shape({
    results: PropTypes.arrayOf(PropTypes.shape({
      incorrect_answers: PropTypes.arrayOf(PropTypes.string),
      correct_answer: PropTypes.string,
      category: PropTypes.string,
      question: PropTypes.string,
      difficulty: PropTypes.string,
    }).isRequired).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Jogo);
