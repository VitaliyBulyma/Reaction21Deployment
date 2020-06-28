import React, {useState, useEffect} from 'react';
import '../App.css';
import Table from 'react-bootstrap/Table';


function ShowExercises() {
    useEffect(()=>{
        fetchItems();
    },[]);
const [exercises, setItems] = useState([]);

async function handleDelete(event){
    event.preventDefault();
    if (window.confirm("Are you sure you want to delete?")){
    const url = 'https://reaction21.herokuapp.com/exercises/'+event.target.value;

    await fetch(url, {
        method: 'delete'

      });   
     
      fetchItems();  
    }  
}
    const fetchItems = async ()=>{

      if(localStorage.getItem("jwtToken") == null){
        window.location.replace("/login");
      }
        const data = await fetch('https://reaction21.herokuapp.com/exercises');
        const exercises = await data.json();        
        setItems(exercises);
    }
  return (
    <div className="App">
      <div className="custom-table">
        <h1 id="title">Show Exercises</h1>
      <Table striped bordered hover variant="light">
        <thead className="thead-dark">
          <tr>      
            <th>Name</th>
            <th>Delete</th>
          </tr>
        </thead>

        <tbody>
        {exercises.map(item =>(
          
          <tr>      
            <td>{item.title}</td>     
            <td><button className="btn btn-primary" value={item._id} onClick={handleDelete}>Delete</button></td>     
          </tr>
          ))} 
        </tbody>
      </Table>       
      </div>
    </div>
  );
}

export default ShowExercises;