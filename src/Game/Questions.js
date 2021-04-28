import React, { Component } from 'react'
import _ from 'lodash'
import { Button, Container, Grid, Header, Icon, Progress } from 'semantic-ui-react'
import axios from 'axios'
import Nav from './Nav'
import NavAdmin from '../Admin/Nav'
import Question from './Question'
import { Redirect } from 'react-router'
import LoaderDiv from './LoaderDiv'
import { Link } from 'react-router-dom'

class Questions extends Component {
    constructor(props) {
        super(props)

        this.state = {
            questions: {},
            currQuestion: 0,
            totalQuestions: 0,
            isLoading: false,
            isAnswered: false,
            answers: [],
            finished: false
        }

        this.setAnswered = this.setAnswered.bind(this)
        this.nextQuestion = this.nextQuestion.bind(this)
        this.previousQuestion = this.previousQuestion.bind(this)
        this.finishingGame = this.finishingGame.bind(this)
    }

    componentDidMount() {
        this.loadQuestions(this.props.match.params.name)
    }

    loadQuestions(name) {
        this.setState({
            questions: {},
            isLoading: true
        })
        const url = `https://quiizz-estyleoflife-default-rtdb.europe-west1.firebasedatabase.app/Categories.json?orderBy="name"&equalTo="${name}"`
        axios
            .get(url)
            .then(data => {
                const key = Object.keys(data.data)[0]
                this.setState({
                    questions: data.data[key],
                    totalQuestions: _.size(data.data[key].Questions),
                    isLoading: false
                })
            })
            .catch(err => {
                console.log('Problems with the get!')
            })
    }

    renderQuestions(questions, id) {
        return (
            <div>
                <br />
                <Header as='h3' size='medium'>PERGUNTA: {questions.question}</Header>
                <br />
                <Grid columns={2}>
                    {
                        Object.keys(questions.responses).map(key => {
                            return <Question key={key} question={questions.question} response={questions.responses[key]} id={id} setState={this.setAnswered} />
                        })
                    }
                </Grid>
            </div>
        )
    }

    setAnswered() {
        this.setState({
            isAnswered: true
        })
    }

    nextQuestion() {
        let question = this.state.currQuestion + 1
        this.setState({
            isAnswered: false,
            currQuestion: question
        })
    }

    previousQuestion() {
        let question = this.state.currQuestion - 1
        this.setState({
            isAnswered: false,
            currQuestion: question
        })
    }

    finishingGame() {
        this.setState({
            finished: true
        })
    }

    render() {
        if (this.state.isLoading) {
            return (
                <div>
                    <Nav />
                    <LoaderDiv />
                </div>
            )
        }
        else if (this.state.finished) {
            return <Redirect to={{
                pathname: '/results',
                state: {
                    category: this.state.questions.name,
                    icon: this.state.questions.icon
                }
            }} />
        }
        else {
            let itens = []
            return (
                <div>
                    {localStorage.isAdmin && <NavAdmin />}
                    {!localStorage.isAdmin && <Nav />}
                    {
                        this.state.questions.Questions && Object.keys(this.state.questions.Questions).forEach(key => {
                            itens.push(key)
                        })
                    }
                    <br />
                    {itens.length > 0 &&
                        <div>
                            <Header as='h2' size='huge'>Perguntas sobre {this.state.questions.name}</Header>
                            <Header as='h2' size='medium'>Mostra que conheces tudo sobre <Icon name={this.state.questions.icon} inverted />{this.state.questions.name}!!!</Header>
                        </div>
                    }
                    {itens.length === 0 &&
                        <div>
                            <Header as='h2' size='huge'>Esta categoria ainda não tem perguntas associadas</Header>
                            <Header as='h2' size='medium'><Button as={Link} to='/categories' size='large' color='black'>Clica aqui</Button> para voltares ás categorias</Header>

                        </div>
                    }
                    <Container>
                        {itens.length > 0 &&
                             this.renderQuestions(this.state.questions.Questions[itens[this.state.currQuestion]], itens[this.state.currQuestion])
                        }
                        <br />
                        {itens.length > 0 && <Progress color='teal' progress='ratio' value={this.state.currQuestion + 1} total={this.state.totalQuestions} />}
                        <br />
                        <Container>
                            {this.state.currQuestion + 1 > 1 && this.state.isAnswered === false &&
                                <Button onClick={this.previousQuestion} size='large' circular animated color='green' disabled>
                                    <Button.Content visible>Anterior</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow left' />
                                    </Button.Content>
                                </Button>}
                            {this.state.currQuestion + 1 > 1 && this.state.isAnswered &&
                                <Button onClick={this.previousQuestion} size='large' circular animated color='green'>
                                    <Button.Content visible>Anterior</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow left' />
                                    </Button.Content>
                                </Button>}

                            {this.state.currQuestion + 1 < this.state.totalQuestions && this.state.isAnswered === false &&
                                <Button onClick={this.nextQuestion} size='large' circular animated color='red' disabled>
                                    <Button.Content visible>Próxima</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>}
                            {this.state.currQuestion + 1 < this.state.totalQuestions && this.state.isAnswered === true &&
                                <Button onClick={this.nextQuestion} size='large' circular animated color='red'>
                                    <Button.Content visible>Próxima</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='arrow right' />
                                    </Button.Content>
                                </Button>}

                            {this.state.currQuestion + 1 === this.state.totalQuestions && this.state.isAnswered===false &&
                                <Button onClick={this.finishingGame} size='large' circular animated color='blue' disabled>
                                    <Button.Content visible>Finalizar</Button.Content>
                                    <Button.Content hidden>
                                        <Icon name='trophy' />
                                    </Button.Content>
                                </Button>}
                            {this.state.currQuestion + 1 === this.state.totalQuestions && this.state.isAnswered &&
                                <Button onClick={this.finishingGame} size='large' circular animated color='blue'>
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