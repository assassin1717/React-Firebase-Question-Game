import React, { Component } from 'react'
import { Button, Grid, Message } from 'semantic-ui-react'

class Question extends Component {
    constructor(props) {
        super(props)
    }

    onRadioChange = (e, { answer }) => {
        let answers = localStorage.playerAnswers ? JSON.parse(localStorage.getItem('playerAnswers')) : []
        let obj={
            question: this.props.id,
            answer: answer
        }
        if (answers.length > 0) {
            let index=-1
            for(let i=0; i<answers.length;i++){
                if(answers[i].question===this.props.id){
                    index++
                }
            }
            if (index > -1) {
                answers.splice(index, 1)
                answers.splice(index, 0, obj)
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
                    <Button color='orange' onClick={this.onRadioChange} answer={this.props.response.isCorrect.toString()}>{this.props.response.answer}</Button>
                </Message>
            </Grid.Column>
        )
    }
}

export default Question