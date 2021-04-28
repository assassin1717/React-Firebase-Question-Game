import React, { Component } from 'react'
import { Header, Container, Card, Button, Segment, Icon } from 'semantic-ui-react'
import Nav from './Nav'
import { auth, providers } from '../firebaseConfig'
import { Link, Redirect } from 'react-router-dom'

class Init extends Component {
    constructor(props) {
        super(props)

        this.state = {
            user: {},
            isLogged: this.props.location.state ? this.props.location.state.isLogged : false
        }

        auth.onAuthStateChanged((user) => {
            if (!localStorage.name) {
                if (user) {
                    this.setState({
                        user,
                        isLogged: true
                    })
                    if (user.displayName) {
                        localStorage.setItem('name', user.displayName)
                        localStorage.setItem('photo', user.photoURL)
                    }
                    else {
                        localStorage.setItem('name', 'Admin')
                        localStorage.setItem('photo', 'user secret')
                        localStorage.setItem('isAdmin', 'true')
                    }
                }
                else {
                    this.setState({
                        isLogged: false
                    })
                }
            }
            else {
                this.setState({
                    isLogged: true
                })
            }
        })
    }

    authNow(provider) {
        auth.signInWithPopup(providers[provider])
    }

    render() {
        if (this.state.isLogged) {
            return <Redirect to='/categories' />
        }
        else {
            return (
                <div>
                    <Nav />
                    <Container>
                        <Segment piled>
                            <Header as='h1' size='huge'>
                                Quizz
                            </Header>
                        </Segment>
                        <Header as='h2'>
                            Jogo de Perguntas e Respostas
                        </Header>
                        <Segment basic size='huge'>
                            Desafia os teus amigos neste incrível jogo de perguntas e respostas. Basta iniciar sessão!
                        </Segment>
                        <Card fluid>
                            <Card.Content>
                                <Segment basic size='big'>
                                    Faz já login com a tua conta e joga
                                </Segment>
                            </Card.Content>
                            <Card.Content>
                                <Button color='facebook' onClick={() => this.authNow('facebook')} size='big'><Icon name='facebook' />Facebook</Button>
                            </Card.Content>
                            <Card.Content>
                                <Button color='twitter' onClick={() => this.authNow('twitter')} size='big'><Icon name='twitter' />Twitter</Button>
                            </Card.Content>
                            <Card.Content>
                                <Button color='google plus' onClick={() => this.authNow('google')} size='big'><Icon name='google' />Google</Button>
                            </Card.Content>
                            <Card.Content>
                                <Button as={Link} to='/login' basic color='black' size='big'><Icon name='lock' />Administrador</Button>
                            </Card.Content>
                        </Card>
                    </Container>
                </div>
            )
        }
    }
}

export default Init