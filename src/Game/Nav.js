import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import { Menu, Image, Dropdown, Header } from 'semantic-ui-react'
import firebase from 'firebase'

class Nav extends Component {
    constructor(props) {
        super(props)

        this.state = {
            name: '',
            photo: ''
        }
    }

    componentDidMount() {
        this.setState({
            name: localStorage.getItem('name'),
            photo: localStorage.getItem('photo')
        })
    }

    componentWillUnmount() {
        this.setState({
            name: '',
            photo: ''
        })
    }

    logout() {
        firebase
            .auth()
            .signOut()
            .then(() => {
                localStorage.removeItem('name')
                localStorage.removeItem('photo')
                localStorage.removeItem('playerAnswers')
                window.location.reload()
            })
            .catch(err => {
                console.log('Error a Terminar Sessão!')
                console.log(err)
            })
    }

    render() {
        if (!localStorage.name) {
            return <Redirect to={{
                pathname: '/',
                state: {
                    isLogged: false
                }
            }} />
        }
        else {
            return (
                <div>
                    <header className="App-header">
                        <Menu size='huge' stackable borderless>
                            <Menu.Item as={Link} to='/'>Home</Menu.Item>
                            <Menu.Item as={Link} to='/categories'>Categorias</Menu.Item>
                            <Menu.Item as={Link} to='/ranking'>Ranking</Menu.Item>
                            <Menu.Menu position='right'>
                                <Menu.Item><Image avatar src={this.state.photo} /></Menu.Item>
                                <Dropdown item text={this.state.name}>
                                    <Dropdown.Menu>
                                        <Dropdown.Item onClick={this.logout}>Terminar Sessão</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </Menu.Menu>
                        </Menu>
                        <div className='App-title'>
                            <Header as='h2' size='huge' inverted>Jogo de Perguntas e Respostas</Header>
                        </div>
                    </header>
                </div>
            )
        }
    }
}

export default Nav