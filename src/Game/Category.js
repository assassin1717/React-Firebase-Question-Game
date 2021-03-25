import React from 'react'
import { Grid, Header, Icon, Segment } from 'semantic-ui-react'
import { Link } from 'react-router-dom'

const size = {
    width: 200,
    height: 200
}

const Category = props => {
    return (
        <div className='centerdiv'>
            <Grid.Column textAlign='center'>
                <Link to={`/questions/${props.title}`}>
                    <Segment circular style={size}>
                        <Header as='h2'>
                            <Icon name={props.icon} />
                            {props.title}
                        </Header>
                    </Segment>
                </Link>
            </Grid.Column>
        </div>
    )
}

export default Category