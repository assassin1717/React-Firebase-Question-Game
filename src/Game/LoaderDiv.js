import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

const LoaderDiv = props => {
    return (
        <div className='loader'>
            <Dimmer active>
                <Loader size='massive'>Loading</Loader>
            </Dimmer>
        </div>
    )
}

export default LoaderDiv