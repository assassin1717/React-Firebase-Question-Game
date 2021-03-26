import React from 'react'
import { Dimmer, Image, Segment, Loader } from 'semantic-ui-react'

const LoaderDiv = props => {
    return (
        <Segment>
            <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </Segment>
    )
}

export default LoaderDiv