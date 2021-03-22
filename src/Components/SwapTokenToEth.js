import React, { useState } from 'react'
import { useStore } from '../context/GlobalState';
import { uniBalance, SwapUniToEth } from '../store/asyncActions'
import Loader from '../images/loader.gif';
function SwapTokenToEth(){
    const [{uniBal}] = useStore();
    const [{tokenContract, accounts}, dispatch] = useStore();  
    const [{contract}] = useStore();  
    const [isTransactionInProcess, setTransactionInprocess] = useState(false);
    const [value, setValue] = useState(0)
    
    const handleClick = async (e)=>{
        e.preventDefault();
        
        try{
            await uniBalance(tokenContract,accounts,dispatch)
        }catch (error){
            console.log("error trax = ",error);
            
        }
    }
    const handleSubmit = async (e) =>{
        e.preventDefault();
        try {
            setTransactionInprocess(true)
            const newTransaction = {
                amountIn : value,
                amountOutMin : 1,
                path : [
                    '0x1f9840a85d5af5bf1d1762f925bdaddc4201f984',
                    '0xd0A1E359811322d97991E03f863a0C30C2cF029C'
                ],
                to : accounts[0],
                deadline : Math.floor(Date.now() / 1000) + 60 * 20,
                
            }
            await SwapUniToEth(contract, accounts,newTransaction, dispatch);
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
                    SWAP UNI TO ETH
                </h1>
                <input type="submit" style={{width:'15%', height:'30px'}} value="Check Balance" onClick={handleClick}/>
                <h3>Your UNI balance is : {uniBal} UNI</h3>
                <input type="number"
                    id= "box"
                    style={{width:'20%', height:'20px'}}
                    onChange={(e)=>{
                        if(Number(e.target.value)>uniBal){
                            alert("You have input wrong value")
                        }
                        setValue(Number(e.target.value))}}
                    /><br/><br/>
                <input type="submit" 
                    style={{width:'15%',
                    height :'30px',
                    }}
                    value="SWAP"
                    onClick={handleSubmit}
                    />
                {isTransactionInProcess && <img width="40px" src={Loader} alt="Loading..." />}

            </center>
        </div>
    )
}
export default SwapTokenToEth;
