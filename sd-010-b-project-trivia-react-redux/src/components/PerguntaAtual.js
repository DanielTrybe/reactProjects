import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

class PerguntaAtual extends React.Component {
  constructor() {
    super();
    this.renderAnswers = this.renderAnswers.bind(this);
    this.paintAnswerCorrect = this.paintAnswerCorrect.bind(this);
    this.paintAnswerIncorrect = this.paintAnswerIncorrect.bind(this);
    this.onClickCorrectAnswer = this.onClickCorrectAnswer.bind(this);
    this.paintAll = this.paintAll.bind(this);
  }

  onClickCorrectAnswer() {
    const { buttonAvaliable,
      stopOnClick, randomAnswer: { dificuldade }, timer, renderTotal } = this.props;
    this.paintAnswerIncorrect();
    this.paintAnswerCorrect();
    buttonAvaliable();
    stopOnClick();
    const difficultyValue = {
      easy: 1,
      medium: 2,
      hard: 3,
    };
    const local = JSON.parse(localStorage.getItem('state')).player;
    const points = 10;
    const player = {
      player: {
        ...local,
        assertions: local.assertions + 1,
        score: local.score + (points + (timer * difficultyValue[dificuldade])),
      } };
    localStorage.setItem('state', JSON.stringify(player));
    renderTotal();
  }

  paintAnswerIncorrect() {
    const branco = document.getElementsByClassName('incorrect');
    for (let key = 0; key < branco.length; key += 1) {
      branco[key].style.border = '3px solid rgb(255, 0, 0)';
      branco[key].style.boxShadow = '0px 0px 30px red';
    }
  }

  paintAll() {
    const { buttonAvaliable, stopOnClick } = this.props;
    this.paintAnswerIncorrect();
    this.paintAnswerCorrect();
    buttonAvaliable();
    stopOnClick();
  }

  paintAnswerCorrect() {
    const correct = document.getElementById('correct');
    correct.style.border = '3px solid rgb(6, 240, 15)';
    correct.style.boxShadow = '0px 0px 30px green';
  }

  renderAnswers() {
    const { timer } = this.props;
    const { randomAnswer: { allAnswers, correctAnswer } } = this.props;
    let index = 0;
    return allAnswers.map((answer, i) => {
      if (answer !== correctAnswer) {
        index += 1;
        return (
          <button
            type="button"
            className="incorrect"
            onClick={ () => this.paintAll() }
            data-testid={ `wrong-answer-${index - 1}` }
            key={ i }
            disabled={ timer === 0 }
          >
            { answer }
          </button>
        );
      }
      return (
        <button
          key={ i }
          type="button"
          id="correct"
          onClick={ () => this.onClickCorrectAnswer() }
          data-testid="correct-answer"
          disabled={ timer === 0 }
        >
          { answer }
        </button>
      );
    });
  }

  render() {
    const { randomAnswer: { allAnswers, category, question } } = this.props;
    return (
      <section>
        <div className="questions-section">
          <h3 data-testid="question-category">{ category }</h3>
          <br />
          <div data-testid="question-text">{ question }</div>
          { !allAnswers ? <div>Carregando...</div> : this.renderAnswers() }
        </div>
      </section>
    );
  }
}

const mapStateToProps = (state) => ({
  questions: state.user.questions,
});

PerguntaAtual.propTypes = {
  randomAnswer: PropTypes.shape({
    allAnswers: PropTypes.arrayOf(PropTypes.string),
    correctAnswer: PropTypes.string,
    category: PropTypes.string,
    question: PropTypes.string,
    dificuldade: PropTypes.string,
  }).isRequired,
  buttonAvaliable: PropTypes.func.isRequired,
  stopOnClick: PropTypes.func.isRequired,
  timer: PropTypes.number.isRequired,
  renderTotal: PropTypes.func.isRequired,
};

export default connect(mapStateToProps)(PerguntaAtual);
