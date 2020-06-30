

import React from 'react';


class EditProfile extends React.Component {
    constructor(props) {
      super(props);
      this.state = {user: ''};
      this.state = {gender: ''};
      this.state = {age: ''};
      this.state = {city: ''}
      
    //   this.state = {data: []};
        
      this.handleChangeUser = this.handleChangeUser.bind(this);
      this.handleChangeGender = this.handleChangeGender.bind(this);     
      this.handleChangeAge = this.handleChangeAge.bind(this);  
      this.handleChangeCity = this.handleChangeCity.bind(this);
       
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount() {
      await fetch('http://localhost:5000/profiles/editprofile/'+this.props.match.params.id)
        .then(response => response.json())
        .then(data => this.setState({ user: data.user, gender:data.gender, age: data.age, city: data.city }));
    
        
    }

    handleChangeUser(event) {
    
      this.setState({user: event.target.value});   
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

    async handleSubmit(event) {
    //   alert('The profile was updated: ' + this.state.user);
      event.preventDefault();
       await fetch(('http://localhost:5000/profiles/'+this.props.match.params.id), {
        method: 'PATCH',
        // mode: 'no-cors',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            // "_id": this.props.match.params.id,
            "user": this.state.user,
            "gender": this.state.gender,
            "age": this.state.age,
            "city": this.state.city,
           //check user 
           // "user": "Vitaliy"          
        })
      });

    //   this.setState({user: ''});     
    //   this.setState({gender: ''}); 

      window.location.href = "/showprofile";  
      
    }
    
    render() {
      
      return (       
        <div className="custom-form">
          <h1>Edit your profile</h1>
          <div className="custom-input">
          <form onSubmit={this.handleSubmit}>
            <input className="custom-input-field"  id="user" type="text"  placeholder="Enter New Name" value={this.state.user}  onChange={this.handleChangeUser} />
            <input className="custom-input-field" id="gender" type="text" placeholder="Enter New Gender" value={this.state.gender}  onChange={this.handleChangeGender} />
            <input className="custom-input-field" id="age" type="text" placeholder="Enter New Age" value={this.state.age}  onChange={this.handleChangeAge} />
            <input className="custom-input-field" id="city" type="text" placeholder="Enter New City" value={this.state.city}  onChange={this.handleChangeCity} /> 

          <input className="btn btn-primary" type="submit" value="Update" />
        </form> 
        </div>       
        </div>
      );
    }
  }

  export default EditProfile;