import React from 'react'

export const Form = ({submit, handleChange, form, setForm,estado, refInput}) => {
  return (
    <div>
        <h2>INSERT DATA</h2>
        <form onSubmit={submit}>
            <div className='box'>
                <label htmlFor="name">Name: </label>
                <input type="text" name="name" ref={refInput} value={form.name} onChange={handleChange}/>
            </div>
            <div className='box'>
                <label htmlFor="profession">Profession:</label>
                <input type="text" name="profession" value={form.profession} onChange={handleChange}/>
            </div>
            <div className='btn'>
                <button type="submit">{(estado)?"Save":"Update"} </button>
                <button type="reset" onClick={()=>setForm({})}>Cancel</button>
            </div>
                
            
             
            
        </form>
    </div>
  )
}
