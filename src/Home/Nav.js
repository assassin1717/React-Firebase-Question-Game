import React from 'react'
import { Link } from 'react-router-dom'
import { Menu, Dropdown, Icon, Header } from 'semantic-ui-react'

const Nav = props => {
    return (
        <div>
            <header className="App-header">
                <Menu size='huge' stackable borderless>
                    <Menu.Item as={Link} to='/'>Home</Menu.Item>
                    <Menu.Menu position='right'>
                        <Menu.Item><Icon name='user' /></Menu.Item>
                        <Dropdown item text='Opção de Login'>
                            <Dropdown.Menu>
                                <Dropdown.Item>Facebook</Dropdown.Item>
                                <Dropdown.Item>Twitter</Dropdown.Item>
                                <Dropdown.Item>Google</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>
                    </Menu.Menu>
                </Menu>
                <div className='App-title'>
                    <Header as='h2' size='huge' color='orange'>Jogo de Perguntas e Respostas</Header>
                </div>
            </header>
        </div>
    )
}

export default Nav