import React, { Component } from 'react'
import Nav from './Nav'
import LoaderDiv from '../Game/LoaderDiv'
import config from '../firebaseConfig'
import { Container, Form, Header, Select } from 'semantic-ui-react'
import { Redirect } from 'react-router'
import axios from 'axios'

class NewQuestion extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: [],
            category: '',
            question: '',
            answer1: '',
            answer2: '',
            answer3: '',
            correctAnswer: '',
            isSaving: false,
            isSaved: false
        }

        this.createQuestion = this.createQuestion.bind(this)
        this.getCategories = this.getCategories.bind(this)
    }

    componentDidMount() {
        this.getCategories()
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value }
        )
    }

    sortAnswers(valsArray, trueVal) {
        let num = Math.floor(Math.random() * 3)
        console.log(num)
        let newArray = []
        if (num > 1) {
            newArray = valsArray.sort()
        }
        else {
            newArray = valsArray.reverse()
        }
        let responses = {
            a: {
                answer: newArray[0],
                isCorrect: newArray[0] === trueVal ? true : false
            },
            b: {
                answer: newArray[1],
                isCorrect: newArray[1] === trueVal ? true : false
            },
            c: {
                answer: newArray[2],
                isCorrect: newArray[2] === trueVal ? true : false
            },
            d: {
                answer: newArray[3],
                isCorrect: newArray[3] === trueVal ? true : false
            }
        }
        return responses
    }

    getCategories() {
        let categories = []
        const url = `https://reactquizz-assassin1717-default-rtdb.europe-west1.firebasedatabase.app/Categories.json`
        axios
            .get(url)
            .then(data => {
                Object.keys(data.data).forEach(key => {
                    let obj = {
                        key: key,
                        text: data.data[key].name,
                        value: key
                    }
                    categories.push(obj)
                })

                this.setState({
                    categories
                })
            })
            .catch(err => {
                console.log('Problems with the get!')
            })
    }

    createQuestion() {
        const { category, question, answer1, answer2, answer3, correctAnswer } = this.state
        this.setState({ isSaving: true })
        const newQuestion = {
            question: question,
            responses: this.sortAnswers([answer1, answer2, answer3, correctAnswer], correctAnswer)
        }
        console.log(newQuestion)
        config.push(`Categories/${category}/Questions`, {
            data: newQuestion
        })
            .then(ref => {
                this.setState({
                    isSaved: true
                })
            })
            .catch(err => {
                console.log(err)
            })
        this.setState({ isSaving: false })
    }

    render() {
        const { category, question, answer1, answer2, answer3, correctAnswer } = this.state
        if (this.state.isSaving) {
            return (
                <div>
                    <Nav />
                    <LoaderDiv />
                </div>
            )
        }
        else if (this.state.isSaved) {
            return <Redirect to='/categories' />
        }
        else {
            return (
                <div>
                    <Nav />
                    <br />
                    <Container>
                        <Header as='h2'>Menu de criação para novas categorias</Header>
                        <br />
                        <div className='centerforms'>
                            <Form size='huge' onSubmit={this.createQuestion}>
                                <Form.Field
                                    control={Select}
                                    options={this.state.categories}
                                    label={{ children: 'Categoria', htmlFor: 'form-select-control-category' }}
                                    placeholder='Categoria'
                                    name='category'
                                    value={category}
                                    onChange={this.handleChange}
                                    search
                                    searchInput={{ id: 'form-select-control-category' }}
                                />
                                <Form.Field>
                                    <Form.Input
                                        label='Pergunta'
                                        placeholder='Pergunta'
                                        name='question'
                                        type='text'
                                        value={question}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Group>
                                    <Form.Input width={8}
                                        label='Resposta 1'
                                        placeholder='Primeria resposta'
                                        name='answer1'
                                        type='text'
                                        value={answer1}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input width={8}
                                        label='Resposta 2'
                                        placeholder='Segunda resposta'
                                        name='answer2'
                                        type='text'
                                        value={answer2}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Group>
                                    <Form.Input width={8}
                                        label='Resposta 3'
                                        placeholder='Terceira resposta'
                                        name='answer3'
                                        type='text'
                                        value={answer3}
                                        onChange={this.handleChange}
                                    />
                                    <Form.Input width={8}
                                        label='Resposta Certa'
                                        placeholder='Resposta Certa'
                                        name='correctAnswer'
                                        type='text'
                                        value={correctAnswer}
                                        onChange={this.handleChange}
                                    />
                                </Form.Group>
                                <Form.Button size='big' color='black' content='Criar' />
                            </Form>
                        </div>
                    </Container>
                </div>
            )
        }
    }
}

export default NewQuestion