import React, { Component } from 'react'
import { Grid, Header } from 'semantic-ui-react'
import Category from './Category'
import Nav from './Nav'
import NavAdmin from '../Admin/Nav'
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
        if(localStorage.playerAnswers){
            localStorage.removeItem('playerAnswers')
        }
    }

    render() {
        return (
            <div className='alignCenter'>
                {localStorage.isAdmin && <NavAdmin />}
                {!localStorage.isAdmin && <Nav />}
                <Header as='h2' size='huge'>Lista de Categorias</Header>
                <Header size='medium'>Seleciona a categoria das perguntas</Header>
                <br />

                <div className="padding">
                    <Grid>
                        {
                            Object.keys(this.state.categories).map(key => {
                                return <Category key={key} title={this.state.categories[key].name} icon={this.state.categories[key].icon} />
                            })
                        }
                    </Grid>
                </div>
            </div>
        )
    }
}

export default Categories