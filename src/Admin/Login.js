import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import { Container, Dimmer, Form, Header, Image, Loader, Segment } from 'semantic-ui-react'
import { auth } from '../firebaseConfig'
import Nav from '../Home/Nav'

class Login extends Component {
    constructor(props) {
        super(props)

        this.state = {
            email: '',
            password: '',
            isLogging: false,
            isLogged: false,
            error: false,
            user: {}
        }

        this.authUser = this.authUser.bind(this)
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value }
        )
    }

    componentDidMount() {
        auth.onAuthStateChanged(user => {
            this.setState({ isLogging: false, isLogged: !!user, user })
        })
    }

    componentWillUnmount() {
        this.setState({
            email: '',
            password: '',
            isLogging: false,
            isLogged: false,
            error: false,
            user: {}
        })
    }

    authUser() {
        const { email, password } = this.state
        this.setState({ isLogging: true, error: false })
        auth.signInWithEmailAndPassword(email, password)
            .then(user => {
                this.setState({ isLogged: true })
            })
            .catch(err => {
                this.setState({ error: true, isLogging: false, isLogged: false })
            })
    }

    render() {
        const { email, password } = this.state
        if (this.state.isLogged) {
            return <Redirect to='/' />
        }
        else if (this.state.isLogging) {
            return (
                <div>
                    <Nav />
                    <Segment>
                        <Dimmer active>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>
                    </Segment>
                </div>
            )
        }
        else {
            return (
                <div>
                    <Nav />
                    <br />
                    <Container>
                        <Header as='h2'>Login para Administradores</Header>
                        <Header color='red'>Administradores só podem ser adicionados pelo criador da app.</Header>
                        <br />
                        <div className='centerforms'>
                            <Form size='huge' onSubmit={this.authUser}>
                                <Form.Field>
                                    <Form.Input
                                        label='Email'
                                        placeholder='Email'
                                        name='email'
                                        type='email'
                                        value={email}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        label='Password'
                                        placeholder='Password'
                                        name='password'
                                        type='password'
                                        value={password}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Button content='Submit' />
                            </Form>
                        </div>
                    </Container>
                </div>
            )
        }
    }
}

export default Login