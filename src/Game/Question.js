import React, { Component } from 'react'
import { Button, Grid, Message } from 'semantic-ui-react'

class Question extends Component {

    onRadioChange = (e, { answer, isCorrect }) => {
        let answers = localStorage.playerAnswers ? JSON.parse(localStorage.getItem('playerAnswers')) : []
        let obj = {
            questionId: this.props.id,
            question: this.props.question,
            answer,
            isCorrect
        }
        if (answers.length > 0) {
            let index = -1
            for (let i = 0; i < answers.length; i++) {
                if (answers[i].questionId === this.props.id) {
                    index=i
                }
            }
            if (index > -1) {
                answers.splice(index, 1, obj)
            }
            else {
                answers.push(obj)
            }
        }
        else {
            answers = [obj]
        }
        localStorage.setItem('playerAnswers', JSON.stringify(answers))
    }

    render() {
        return (
            <Grid.Column>
                <Message inverted='true' color='orange'>
                    <Button color='orange' onClick={this.onRadioChange}
                        answer={this.props.response.answer}
                        isCorrect={this.props.response.isCorrect.toString()}>
                        {this.props.response.answer}
                    </Button>
                </Message>
            </Grid.Column>
        )
    }
}

export default Question