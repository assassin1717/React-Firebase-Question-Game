import React from 'react'
import { List, Image } from 'semantic-ui-react'

const User = props => {
    const { foto, name, points } = props.user
    return (
        <List.Item>
            <List.Content>
                <Image avatar src={foto} />
                {name} - {points} pontos
            </List.Content>
        </List.Item>
    )
}

export default User