import React, { useEffect, useState } from 'react'
import { useStore } from '../context/GlobalState';
import { SwapEthToUni } from '../store/asyncActions';
import Loader from '../images/loader.gif';

function SwapETHToToken(){
    const [{contract, accounts}, dispatch] = useStore();  
    const [value, setValue] = useState(0)
    const [{ethBalance}] = useStore();
    const [isTransactionInProcess, setTransactionInprocess] = useState(false);

    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            setTransactionInprocess(true)
            const newTransaction = {
                amountOutMin : 1000,
                path : [
                    '0xd0A1E359811322d97991E03f863a0C30C2cF029C',
                    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984'
                ],
                to : accounts[0],
                deadline : Math.floor(Date.now() / 1000) + 60 * 20,
                value : value
            }
            await SwapEthToUni(contract, accounts,newTransaction, dispatch);
            setTransactionInprocess(false);
            document.getElementById('box').value = ''
        }catch (error){
            console.log("error trax = ",error);
            setTransactionInprocess(false);
        }
    }     
    return(
        <div>
            <center>
                <h1>
                    SWAP ETH TO UNI
                </h1>
            
                <h3>Your ETH balance is : {ethBalance} ETH</h3>
                <input type="number"
                    id="box" 
                    onChange={(e)=>{setValue(Number(e.target.value))}} 
                    style={{width:'20%', height:'20px'}}
                />
                <br/><br/>
                <input type="submit"
                    onClick={handleSubmit}
                    value= "SWAP" 
                    style={{width:'10%', height:'30px'}}
                />
                {isTransactionInProcess && <img width="40px" src={Loader} alt="Loading..." />}

            </center>
        </div>
    )
}
export default SwapETHToToken;
