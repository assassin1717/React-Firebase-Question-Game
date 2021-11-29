import React, { Component } from 'react'
import { Button, Grid, Icon, Message } from 'semantic-ui-react'

class Question extends Component {
    constructor(props) {
        super(props)

        this.state = {
            isAnswered: false
        }

        this.handleClicks = this.handleClicks.bind(this)
    }

    handleClicks(e, { answer, isCorrect }) {
        this.setState({
            isAnswered: true
        })
        this.props.setState()
        this.onRadioChange(e, { answer, isCorrect })
    }

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
                    index = i
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
                <Message inverted='true' color='violet'>
                    <Button color='violet' animated onClick={this.handleClicks}
                        answer={this.props.response.answer}
                        isCorrect={this.props.response.isCorrect.toString()}>
                        <Button.Content visible>{this.props.response.answer}</Button.Content>
                        <Button.Content hidden>
                            <Icon name='check' />
                        </Button.Content>
                    </Button>
                </Message>
            </Grid.Column>
        )
    }
}

export default Question