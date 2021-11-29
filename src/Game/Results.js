import React, { Component } from 'react'
import { Button, Container, Header, Icon, Table } from 'semantic-ui-react'
import Nav from './Nav'
import NavAdmin from '../Admin/Nav'
import Result from './Result'
import { Link } from 'react-router-dom'
import config from '../firebaseConfig'
import LoaderDiv from './LoaderDiv'

class Results extends Component {
    constructor(props) {
        super(props)

        this.state = {
            category: '',
            icon: '',
            totalPoints: 0,
            isSaving: false,
            answersInfo: []
        }

        this.totalPoints=this.totalPoints.bind(this)
        this.savedResults=this.savedResults.bind(this)
    }

    componentDidMount() {
        const { category, icon } = this.props.history.location.state
        const answersInfo = JSON.parse(localStorage.getItem('playerAnswers'))
        this.setState({
            category,
            icon,
            answersInfo
        })
    }

    componentWillUnmount(){
        this.savedResults()
        this.setState({
            category: '',
            icon: '',
            totalPoints: 0,
            isSaving: false,
            answersInfo: []
        })
    }

    totalPoints() {
        let counter = 0
        let answersInfo = this.state.answersInfo
        for (let i = 0; i < answersInfo.length; i++) {
            if (answersInfo[i].isCorrect === 'true') {
                counter++
            }
        }
        return counter
    }

    savedResults(){
            const { category } = this.state
            this.setState({ isSaving: true })
            const newResult = {
                category: category,
                name: localStorage.getItem('name'),
                photo: localStorage.getItem('photo'),
                points: localStorage.getItem('totalPoints')
            }
            config.push(`Ranking`, {
                data: newResult
            })
                .then(ref => {

                })
                .catch(err => {
                    console.log(err)
                })
    }

    render() {
        let totalPoints = 0
        totalPoints = this.totalPoints()
        localStorage.setItem('totalPoints', totalPoints)
        let infoPoints = totalPoints > 1 ? 'pontos' : 'ponto'
        if (this.state.isSaving) {
            return (
                <div>
                    <Nav />
                    <LoaderDiv />
                </div>
            )
        }
        else{
            return (
                <div>
                    {localStorage.isAdmin && <NavAdmin />}
                    {!localStorage.isAdmin && <Nav />}
                    <Header as='h1' size='huge'>Os Resultados</Header>
                    <Header size='medium'>Vê o teu desempenho na categoria <Icon name={this.state.icon} />{this.state.category}.</Header>
                    <br />
                    <Container>
                        <Table padded celled unstackable inverted color='violet' textAlign='center' size='large'>
                            <Table.Header>
                                <Table.Row>
                                    <Table.HeaderCell>Número da Pergunta</Table.HeaderCell>
                                    <Table.HeaderCell>Pergunta</Table.HeaderCell>
                                    <Table.HeaderCell>Resposta Do Jogador</Table.HeaderCell>
                                    <Table.HeaderCell>Resposta está Correta</Table.HeaderCell>
                                </Table.Row>
                            </Table.Header>
    
                            <Table.Body>
                                {
                                    this.state.category !== '' && Object.keys(this.state.answersInfo).map(key => {
                                        return <Result key={key} answer={this.state.answersInfo[key]} id={Number(key) + 1} />
                                    })
                                }
                            </Table.Body>
                        </Table>
                    </Container>
                    <Header as='h2' size='medium'>Fizeste {totalPoints} {infoPoints}.</Header>
                    <br />
                    <Button as={Link} to='/categories' size='huge' color='black'>Jogar de novo</Button>
                </div>
            )
        }
    }
}

export default Results