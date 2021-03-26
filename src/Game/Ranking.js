import React, { Component } from 'react'
import { Container, Header, List } from 'semantic-ui-react'
import Nav from './Nav'
import NavAdmin from '../Admin/Nav'
import User from './User'

const user={
    foto: '',
    name: 'Bicep',
    points: '100'
}

class Ranking extends Component {
    render() {
        return (
            <div>
                {localStorage.isAdmin && <NavAdmin />}
                {!localStorage.isAdmin && <Nav />}
                <Header as='h2' size='huge'>RANKING</Header>
                <Header size='medium'>Quem é o GOAT??</Header>
                <br />

                <Container>
                    <List divided>
                        <User user={user} />
                    </List>
                </Container>
            </div>
        )
    }
}

export default Ranking