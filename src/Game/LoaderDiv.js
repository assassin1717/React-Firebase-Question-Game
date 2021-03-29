import React from 'react'
import { Dimmer, Image, Loader } from 'semantic-ui-react'

const LoaderDiv = props => {
    return (
        <div className='loader'>
            <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>

            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
            <Image src='https://react.semantic-ui.com/images/wireframe/short-paragraph.png' />
        </div>
    )
}

export default LoaderDiv