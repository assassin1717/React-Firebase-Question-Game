import React, { Component } from 'react'
import Nav from '../Admin/Nav'
import config from '../firebaseConfig'
import { Container, Dimmer, Form, Header, Image, Loader, Segment } from 'semantic-ui-react'
import { Redirect } from 'react-router'

class NewCat extends Component {
    constructor(props) {
        super(props)

        this.state = {
            title: '',
            icon: '',
            isSaving: false,
            isSaved: false
        }

        this.createCategory = this.createCategory.bind(this)
    }

    handleChange = (e, { name, value }) => {
        this.setState({ [name]: value }
        )
    }

    createCategory() {
        const { title, icon } = this.state
        this.setState({ isSaving: true })
        const newCategory = {
            name: title,
            icon: icon
        }
        config.push('Categories/', {
            data: newCategory
        })
        .then(ref=>{
            this.setState({
                isSaved: true
            })
        })
        .catch(err=>{
            console.log(err)
        })

        this.setState({ isSaving: false })
    }

    render() {
        const { title, icon} = this.state
        if (this.state.isSaving) {
            return (
                <div>
                    <Nav />
                    <Segment>
                        <Dimmer active inverted>
                            <Loader size='large'>Loading</Loader>
                        </Dimmer>

                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                        <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
                    </Segment>
                </div>
            )
        }
        else if(this.state.isSaved){
            return <Redirect to='/categories' />
        }
        else {
            return (
                <div>
                    <Nav />
                    <br />
                    <Container>
                        <Header as='h2'>Menu de criação para novas categorias</Header>
                        <br />
                        <div className='centerforms'>
                            <Form size='huge' onSubmit={this.createCategory}>
                                <Form.Field>
                                    <Form.Input
                                        label='Nome da Categoria'
                                        placeholder='Nome da Categoria'
                                        name='title'
                                        type='text'
                                        value={title}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Field>
                                    <Form.Input
                                        label='Icone'
                                        placeholder='Nome do icone'
                                        name='icon'
                                        type='text'
                                        value={icon}
                                        onChange={this.handleChange}
                                    />
                                </Form.Field>
                                <Form.Button size='big' color='black' content='Criar' />
                            </Form>
                        </div>
                    </Container>
                </div>
            )
        }
    }
}

export default NewCat