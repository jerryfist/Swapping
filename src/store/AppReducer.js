export default (state, action) => {
    switch(action.type) {
      
      
      case 'ETH_BALANCE':
        return {
          ...state,
          ethBalance: action.payload
        }

      case 'UNI_BALANCE':
        return {
          ...state,
          uniBal: action.payload
      }

      case 'SETUP_WEB3':
        return {
          ...state,
          web3: action.payload,
          web3LoadingErrorMessage: "",
          web3Loadded: true
        }
      case 'SETUP_CONTRACT':
        return {
          ...state,
          contract: action.payload
        }

        case 'SETUP_TOKEN_CONTRACT':
        return {
          ...state,
          tokenContract: action.payload
        }

      case 'ADD_ETHEREUM_ACCOUNTS':
        return {
          ...state,
          accounts: action.payload
        }
      case 'WEB3_LOADING_ERROR':
        return {
          ...state,
          web3LoadingErrorMessage: action.errorMessage,
          web3Loadded: false
        }
      default:
        return state;
    }
  }