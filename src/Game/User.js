import React from 'react'
import { Image, Table, Icon, Header } from 'semantic-ui-react'

const User = props => {
    const { category, photo, name, points } = props.userInfo
    return (
        <Table.Row>
            <Table.Cell>
                {name==='Admin' && <Icon name={photo} />}
                {name!=='Admin' && <Image avatar src={photo} />}
            {name}
        </Table.Cell>
            <Table.Cell>
                <Header as='h4'>
                    <Header.Content>{category}</Header.Content>
                </Header>
            </Table.Cell>
            <Table.Cell>{points}</Table.Cell>
            
        </Table.Row>
    )
}

export default User