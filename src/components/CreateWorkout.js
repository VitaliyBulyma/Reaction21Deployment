
import React from 'react';
import { Redirect } from 'react-router-dom';
import jwt_decode from "jwt-decode";


var name="";
function getUser(){
if(localStorage.getItem("jwtToken") != null){
var b = localStorage.getItem("jwtToken");
// console.log(b);
const decoded = jwt_decode(b);
name = decoded.name;
// console.log(name);
}else{
  name="Anonymous User";  
}
return name;
}


class CreateWorkout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {title: '', length: '', data: [], abc: ""};
      // this.state = {length: ''};
      // this.state = {data: []};  
      // this.state = {abc: ""};     
        
      // this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeLength = this.handleChangeLength.bind(this);      
      this.handleSelect = this.handleSelect.bind(this);      
      this.handleSubmit = this.handleSubmit.bind(this);
      
    }
    
    async componentDidMount() {

        // if(localStorage.getItem("jwtToken") == null){
        //   window.location.replace("/login");
        // }
      await fetch('https://reaction21.herokuapp.com/exercises')
        .then(response => response.json())
        .then(data => this.setState({ data }));
        // console.log(this.state.data);

    }


    handleChangeLength(event) {
        
      this.setState({length: event.target.value});       
      
    }

    handleSelect(event){
      // console.log(event.target.value);
      this.setState({title: event.target.value}); 
    }
    
    async handleSubmit(event) {
      
      getUser();
      
      // alert('An exercise was submitted: ' + name);
      event.preventDefault();
       await fetch('https://reaction21.herokuapp.com/workouts', {
        method: 'post',
        // mode: 'no-cors',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            "title": this.state.title,
            "length": this.state.length,
            "user": name          
        })
      });

      this.setState({title: ''});     
      this.setState({length: ''});  
      // window.location.href = "https://reaction21.netlify.app/showworkouts";
      this.setState({abc: true});
      
      //  window.location.replace("/showworkouts");
    }
    
    render() {
      
      return (       
        <div className="custom-form">
        
          <form onSubmit={this.handleSubmit}>
            <select id="select" onChange={this.handleSelect}>
              {this.state.data.map(item =>(                
                <option key={item._id} value={item.title} >{item.title}</option>                
              ))}
            </select> 
          <label>Duration</label>
            <input type="text" value={this.state.length} onChange={this.handleChangeLength} required />
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form> 
        {this.state.abc && (<Redirect to={'/showworkouts'}/>) }       
      </div>
      );
    }
  }

  export default CreateWorkout;
