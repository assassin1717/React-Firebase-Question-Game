import React, { Component } from 'react'
import { Container, Header, Table } from 'semantic-ui-react'
import Nav from './Nav'
import NavAdmin from '../Admin/Nav'
import User from './User'

import config from '../firebaseConfig'

class Ranking extends Component {
    constructor(props) {
        super(props)

        this.state = {
            ranking: {}
        }
    }

    componentDidMount() {
        config.syncState(
            'Ranking', {
            context: this,
            state: 'ranking',
            asArray: false
        }
        )
    }

    renderRankings(){
        let rankings=[]
        Object.keys(this.state.ranking).forEach(key=>{
            rankings.push(this.state.ranking[key])
        })
        let descRankings=rankings.sort((a, b) => a.points > b.points ? 1 : -1).reverse()
        let i=0
        return(
            descRankings.map(data=>{
                i++
                return <User key={i} userInfo={data} />
            })
        )
    }

    render() {
        return (
            <div>
                {localStorage.isAdmin && <NavAdmin />}
                {!localStorage.isAdmin && <Nav />}
                <Header as='h2' size='huge'>RANKING</Header>
                <Header size='medium'>Quem é o Melhor??</Header>
                <br />

                <Container>
                    <Table padded celled unstackable inverted color='violet' textAlign='center' size='large'>
                        <Table.Header>
                            <Table.Row>
                                <Table.HeaderCell>Nome</Table.HeaderCell>
                                <Table.HeaderCell>Categoria</Table.HeaderCell>
                                <Table.HeaderCell>Pontos</Table.HeaderCell>
                            </Table.Row>
                        </Table.Header>

                        <Table.Body>
                            {this.state.ranking && this.renderRankings()}
                        </Table.Body>
                    </Table>
                </Container>
            </div>
        )
    }
}

export default Ranking