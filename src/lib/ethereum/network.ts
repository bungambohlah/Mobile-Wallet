export enum Networks {
    mainnet = 'mainnet',
    ropsten = 'ropsten',
    planq = 'planq'
  }
  
  export const getNetwork = (): Networks => {
    return (process.env.NODE_ENV === 'production') ? Networks.planq : Networks.ropsten
  }