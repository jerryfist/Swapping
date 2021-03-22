import React from 'react'
import SwapETHToToken from './Components/SwapEthToToken'
import SwapTokenToEth from './Components/SwapTokenToEth'

function App1(){
    return(
        <div>
            <SwapETHToToken/>
            <br/>
            <SwapTokenToEth/>
        </div>
    )
}

export default App1;