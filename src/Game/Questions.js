import React, { Component } from 'react'
import _ from 'lodash'
import { Button, Container, Dimmer, Grid, Header, Icon, Image, Loader, Progress, Segment } from 'semantic-ui-react'
import axios from 'axios'
import Nav from './Nav'
import Question from './Question'

class Questions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: {},
            currQuestion: 0,
            totalQuestions: 0,
            isLoading: false,
            answers: []
        }

        this.nextQuestion = this.nextQuestion.bind(this)
        this.previousQuestion = this.previousQuestion.bind(this)
    }

    componentDidMount() {
        this.loadQuestions(this.props.match.params.name)
    }

    loadQuestions(name) {
        this.setState({
            questions: {},
            isLoading: true
        })
        const url = `https://reactquizz-assassin1717-default-rtdb.europe-west1.firebasedatabase.app/Categories.json?orderBy="name"&equalTo="${name}"`
        axios
            .get(url)
            .then(data => {
                const key = Object.keys(data.data)[0]
                this.setState({
                    questions: data.data[key],
                    totalQuestions: _.size(data.data[key]),
                    isLoading: false
                })
            })
            .catch(err => {
                console.log('Problems with the get!')
            })
    }

    randerQuestions(questions, id) {
        return (
            <div>
                <br />
                <Header as='h3' size='medium'>PERGUNTA: {questions.question}</Header>
                <br />
                <Grid columns={2}>
                    {
                        Object.keys(questions.responses).map(key => {
                            return <Question key={key} response={questions.responses[key]} id={id}/>
                        })
                    }
                </Grid>
            </div>
        )
    }

    nextQuestion() {
        let question=this.state.currQuestion+1
        this.setState({
            currQuestion: question
        })
    }

    previousQuestion() {
        let question=this.state.currQuestion-1
        this.setState({
            currQuestion: question
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <Nav />
                    <Segment>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Segment>
                </div>
            )
        }
        else {
            let itens = []
            return (
                <div>
                    <Nav />
                    <Header as='h2' size='huge'>Perguntas sobre Desporto</Header>
                    <Header as='h2' size='medium'>Mostra que conheces tudo sobre <Icon name={this.state.questions.icon} />{this.state.questions.name}!!!</Header>
                    <Container>
                        {
                            this.state.questions.Questions && Object.keys(this.state.questions.Questions)
                                .map(key => {
                                    itens.push(key)
                                })
                        }
                        {
                            this.state.questions.Questions && this.randerQuestions(this.state.questions.Questions[itens[this.state.currQuestion]], itens[this.state.currQuestion])
                        }
                        <br />
                        <Progress color='black' progress='ratio' value={this.state.currQuestion + 1} total={this.state.totalQuestions} />
                        <br />
                        <Container>
                            {this.state.currQuestion + 1 > 1 && <Button onClick={this.previousQuestion} size='large' circular animated color='green'>
                                <Button.Content visible>Anterior</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow left' />
                                </Button.Content>
                            </Button>}
                            {this.state.currQuestion + 1 < 10 && <Button onClick={this.nextQuestion} size='large' circular animated color='red'>
                                <Button.Content visible>Próxima</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='arrow right' />
                                </Button.Content>
                            </Button>}
                            {this.state.currQuestion + 1 === 10 && <Button size='large' circular animated color='red'>
                                <Button.Content visible>Finalizar</Button.Content>
                                <Button.Content hidden>
                                    <Icon name='trophy' />
                                </Button.Content>
                            </Button>}
                        </Container>
                    </Container>
                </div>
            )
        }
    }
}

export default Questions