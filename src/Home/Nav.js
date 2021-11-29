import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Icon, Header } from 'semantic-ui-react'

const Nav = props => {
    return (
        <div>
            <header className="App-header">
                <Menu size='huge' stackable borderless>
                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item><Icon name='user' /></Menu.Item>
                        <Menu.Item as={Link} to='/'>Login</Menu.Item>
                    </Menu.Menu>
                </Menu>
                <div className='App-title'>
                    <Header as='h1' size='huge' inverted>Jogo de Perguntas e Respostas</Header>
                </div>
            </header>
        </div>
    )
}

export default Nav