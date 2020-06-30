import React, {useState, useEffect} from 'react';
import '../App.css';

function ListProfiles() {
    useEffect(()=>{
        fetchItems();
    },[]);
const [profiles, setItems] = useState([]);


    const fetchItems = async ()=>{
        const data = await fetch('http://localhost:5000/profiles');
        const profiles = await data.json();
      
        setItems(profiles);
    };
// function handleChange(event){
//     // event.preventDefault();
//     // console.log(event.target.value);
//     return event.target.value;
// }
  return (
    <div className="App">
        <div className="custom-form">
            {/* <select onChange={handleChange}> */}
            <select >
                {profiles.map(item =>(                
                    <option key={item._id} value={item.user} >{item.user}</option>   
                                 
                ))}
            </select>     
        </div>   
    </div>
  );
}

export default ListProfiles;