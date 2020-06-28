import React from 'react';
import jwt_decode from "jwt-decode";



var user="";

if(localStorage.getItem("jwtToken") != null){
var b = localStorage.getItem("jwtToken");
//console.log(b);
const decoded = jwt_decode(b);
//console.log(decoded);
user = decoded.name;
// console.log(user);
}else{
  user="No Profile";  
}


class CreateProfile extends React.Component {
    constructor(props) {
      super(props);
      //this.state = {user: ''};
      this.state = {gender: ''};
      this.state = {age: ''};
      this.state = {city: ''}
  
      this.handleChangeGender = this.handleChangeGender.bind(this);
      this.handleChangeAge = this.handleChangeAge.bind(this);
      this.handleChangeCity = this.handleChangeCity.bind(this);
      
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeGender(event) {
      this.setState({gender: event.target.value});    
      
    }
    handleChangeAge(event) {
        this.setState({age: event.target.value});    
        
    }
    handleChangeCity(event) {
        this.setState({city: event.target.value});    
        
    }
    componentDidMount(){
        //alert(user);
      if(localStorage.getItem("jwtToken") == null){
        window.location.replace("/login");
      }
    }
    async handleSubmit(event) {
     
      event.preventDefault();
     
      await fetch('https://reaction21.herokuapp.com/profiles', {
        method: 'post',
        
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          "user": user,
          "gender": this.state.gender,
          "age": this.state.age,
          "city": this.state.city
          
        })
      });
      // console.log(result);
      
      this.setState({gender: ''});
      this.setState({age: ''});
      this.setState({city: ''});
     
      window.location.href = "/exercises";
      
    }
  
    render() {
      return (       
        <div className="custom-form">
          <form onSubmit={this.handleSubmit}>
            <label for="gender" >Enter your gender: </label>
            <input  id="gender" type="text" value={this.state.gender} onChange={this.handleChangeGender} required />

            <label for="age" >Enter your age: </label>
            <input  id="age" type="text" value={this.state.age} onChange={this.handleChangeAge} required />

            <label for="city" >Enter your city: </label>
            <input  id="city" type="text" value={this.state.city} onChange={this.handleChangeCity} required />

            <input className="btn btn-primary" type="submit" value="Submit" />
          </form> 
        </div>
      );
    }
  }

  export default CreateProfile;
