import React from 'react'
import { List, Label } from 'semantic-ui-react'

const Result = props => {
    const {id, quest, resp} = props.answer
    return (
        <List.Item>
            <List.Content>
                <Label>
                    {id}
                </Label>
                {quest} - {resp}
            </List.Content>
        </List.Item>
    )
}

export default Result