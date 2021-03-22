import { eth_balance, uni_balance, setupTokenContract ,setupWeb3, setupContract, addEthereumAccounts, web3LoadingError } from "./actions";
import Web3 from "web3";
import { ROUTER_ADDRESS, ROUTER_ABI } from '../contract/Router';
import { TOKEN_ADDRESS, TOKEN_ABI } from '../contract/TokenContract'

let web3
let BN
export const loadBlockchain = async(dispatch) =>{
    try {
        console.log("Web3 = ",Web3);
        console.log("Web3.givenProvider = ",Web3.givenProvider);
        
        if(Web3.givenProvider){
        
            web3 = new Web3(Web3.givenProvider);
            await Web3.givenProvider.enable();
            BN = web3.utils.BN
            dispatch(setupWeb3(web3));
            const contract = new web3.eth.Contract(ROUTER_ABI, ROUTER_ADDRESS);
            dispatch(setupContract(contract));
            const tokenContract = new web3.eth.Contract(TOKEN_ABI,TOKEN_ADDRESS)
            dispatch(setupTokenContract(tokenContract))
            const accounts = await web3.eth.getAccounts();
            dispatch(addEthereumAccounts(accounts));
            web3.eth.getBalance(accounts[0]).then((res)=>{
                console.log(res)
                dispatch(eth_balance(web3.utils.fromWei(new BN(res).toString(),"ether")))
            })
            console.log("contract = ",contract);
            console.log("contract.methods = ",contract.methods);
            console.log("contract.methods = ",tokenContract.methods);
            
        }
        else {
            dispatch(web3LoadingError("Please install an Ethereum-compatible browser or extension like MetaMask to use this dApp!"))
        }
    }
    catch(error){
        console.log("Error in loading Web3 = ",error);
        if(error.code===4001){
            
            dispatch(web3LoadingError(error.message));
        }
    }
}

export const uniBalance = async(tokenContract, accounts, dispatch)=>{
    const receipt = await tokenContract.methods.balanceOf(accounts[0]).call({from:accounts[0]})
    const bal = web3.utils.fromWei(String(receipt),"ether") 
    dispatch(uni_balance(bal))
    console.log("UNI BAL =========== ",bal)
}
export const SwapEthToUni = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    const receipt = await contract.methods.swapExactETHForTokens(transaction.amountOutMin,transaction.path,transaction.to,transaction.deadline)
    .send({
        from: accounts[0],
        value: web3.utils.toHex(web3.utils.toWei(String(transaction.value))) 
    })
    console.log("after  transaction ", receipt);
}

export const SwapUniToEth = async(contract, accounts, transaction, dispatch)=>{
    console.log("before transaction");
    
    const receipt = await contract.methods.swapExactTokensForETH(new BN(transaction.amountIn).toString(),transaction.amountOutMin,transaction.path,transaction.to,transaction.deadline)
    .send({
        from: accounts[0],
    })
    console.log("after  transaction ", receipt);
}