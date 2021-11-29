import React from 'react'
import { Header, Icon, Table } from 'semantic-ui-react'

const Result = props => {
    const {question, answer, isCorrect} = props.answer
    return (
        <Table.Row>
            <Table.Cell>{props.id}</Table.Cell>
            <Table.Cell>
                <Header as='h4'>
                    <Header.Content>
                        {question}
                    </Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{answer}</Table.Cell>
            {isCorrect==='true' && <Table.Cell positive>Sim <Icon name='check' /></Table.Cell>}
            {isCorrect==='false' && <Table.Cell negative>Não <Icon name='close' /></Table.Cell>}
        </Table.Row>
    )
}

export default Result