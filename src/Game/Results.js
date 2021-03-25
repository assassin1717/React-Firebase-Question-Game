import React, { Component } from 'react'
import { Container, Header, List } from 'semantic-ui-react'
import Nav from './Nav'
import Result from './Result'

const answer = {
    id: 1,
    quest: 'Pergunta sobre ceps',
    resp: 'A'
}

class Results extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Header as='h2' size='huge'>Os Resultados</Header>
                <Header size='medium'>Vê o teu desempenho nesta categoria.</Header>
                <br />

                <Container>
                    <List divided>
                        <Result answer={answer} />
                    </List>
                </Container>
            </div>
        )
    }
}

export default Results