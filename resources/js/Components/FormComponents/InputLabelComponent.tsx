import React from 'react'
import InputLabel from '../InputLabel'
import TextInput from '../TextInput'

const InputLabelComponent = ({labelName, idName, inputData, inputSetData, errorMessage}: any) => {
  idName = ''
  return (
    <div className='flex flex-col'>
        <InputLabel htmlFor={idName}>{labelName}</InputLabel>
        <TextInput autoComplete="off"  id={idName} type="text" value={inputData} onChange={(e) => inputSetData({...inputData, [idName]: e.target.value})} />
        {errorMessage ? errorMessage : null}
    </div>
  )
}

export default InputLabelComponent