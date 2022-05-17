import logo from './logo.svg';
import React, {useEffect, useState, useRef} from "react";
import './App.css';
import { User } from './components/User';
import { Form } from './components/Form';
import swal from "sweetalert";

function App() {

  const [data, setData] = useState([]);
  const [form, setForm] = useState([]);
  const [estado, setEstado] = useState(true);
  const refInput = useRef(null)
  


  const get=async()=>{
            let res= await fetch("https://api-express-mong.herokuapp.com/api/user");
            let json = await res.json();
            setData(json);   
  }

  const handleChange=(e)=>{
        setForm({...form,
          [e.target.name]:e.target.value});
          console.log(form);
  }

  const editUser=(id, name,profession)=>{
      setForm({
        id,
        name,
        profession
      })

      setEstado(!id);
      refInput.current.focus();
  }

  const submit=async(e)=>{
    e.preventDefault();

    if(form.id){
      await updateUser();
    }else{
      await addUser();
    }
      setEstado(true);
      setForm({
        name:"",
        profession:"",
      })
    }

const addUser=async()=>{
    let res = await fetch("https://api-express-mong.herokuapp.com/api/user",
    {
      method:"POST",
      body:JSON.stringify(form),
      headers:{
        "Content-type":"application/json"
      },
      
    })

    let json = await res.json();
    if(json) {
      swal(json, "", "success");
      get();
      };
  }

  const updateUser=async()=>{
    let res = await fetch(`https://api-express-mong.herokuapp.com/api/user/${form.id}`,
    {
      method:"PUT",
      body:JSON.stringify(form),
      headers:{
        "Content-type":"application/json"
      },
      
    })

    let json = await res.json();
    if(json) {
       swal(json, "", "success");
        get();
      };
  }
  const deleteClic=async(id,name)=>{
  swal({
  title: `Deseas eliminar el registro de ${name}?`,
  icon: "warning",
  buttons: true,
  dangerMode: true,
})
.then((willDelete) => {
  if (willDelete) {
        fetch(`https://api-express-mong.herokuapp.com/api/user/${id}`,{method:"DELETE"})
         .then(res=>res.json())
        //alert(json);
        .then(json=>swal(json," ", "success"))
        get(); 
        }

    });  
     
  }
  

  useEffect(() => {
    get();

  }, [])
  
  return (
    
    <div className="App">
      <Form submit={submit} handleChange={handleChange} form={form} setForm={setForm} estado={estado} refInput={refInput}></Form>
  <div>
    <h2>Clients Data</h2>
    <table className='table'>
      <thead>
        <tr>
          <th>Name</th>
          <th>Profession</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        
          {data.map((user,i)=>{
            return <User key={i} {...user} deleteUser={deleteClic} editUser={editUser} estado={estado}></User>
          })}

      </tbody>
    </table>
     
  </div>
    
    
    </div>
  );
}

export default App;
