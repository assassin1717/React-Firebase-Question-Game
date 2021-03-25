import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import Category from './Category'
import Nav from './Nav'
import config from '../firebaseConfig'

class Categories extends Component {
    constructor(props) {
        super(props)

        this.state = {
            categories: {}
        }
    }
    componentDidMount() {
        config.syncState(
            'Categories', {
            context: this,
            state: 'categories',
            asArray: false
        }
        )
    }

    render() {
        return (
            <div className='alignCenter'>
                <Nav />
                <Header as='h2' size='huge'>Lista de Categorias</Header>
                <Header size='medium'>Seleciona a categoria das perguntas</Header>
                <br />

                <Grid>
                    {
                        Object.keys(this.state.categories).map(key => {
                            return <Category key={key} title={this.state.categories[key].name} icon={this.state.categories[key].icon} />
                        })
                    }
                </Grid>
            </div>
        )
    }
}

export default Categories