export const dataChecker = (objectState: any, objectKey: string) => {  
    if (objectState === null || objectState === undefined){
      return "null"
    } else{
      return objectState[objectKey]
    }
}

export const convertToMoney = (amount: number) => {

    return amount.toLocaleString('en-US', {style: 'currency', currency: 'PHP'})
  }