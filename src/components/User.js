import React, { useEffect, useState } from 'react'


export const User = ({_id, name, profession, deleteUser, editUser, estado}) => {
    

  return (
      
   <tr>
        <td> {name} </td>
        <td> {profession} </td>
        <td>
        <button className='edit' onClick={()=>editUser(_id,name,profession, estado)}>Edit</button>
        <button className='delete' onClick={()=>deleteUser(_id,name)}>Remove</button>
        </td>
  </tr>

  )
}
