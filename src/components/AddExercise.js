import React from 'react';
import { Redirect } from 'react-router-dom';

class addExercises extends React.Component {
    constructor(props) {
      super(props);
      this.state = {title: '', flag: false};
  
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      
      this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChangeTitle(event) {
      this.setState({title: event.target.value});    
      
    }
    // componentDidMount(){
    //   if(localStorage.getItem("jwtToken") == null){
    //     window.location.replace("/login");
    //   }
    // }
    async handleSubmit(event) {
      // alert('A name was submitted: ' + this.state.location);
      event.preventDefault();
      // let result = await fetch('http://localhost:5000/exercises', {
      await fetch('https://reaction21.herokuapp.com/exercises', {
        method: 'post',
        // mode: 'no-cors',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
          "title": this.state.title
          
        })
      });
      // console.log(result);
      
      this.setState({title: ''});
      // alert("Exercise added");
      // window.location.href = "/createworkout";
      this.setState({flag: true});
    }
  
    render() {
      return (       
        <div className="custom-form">
          
          <h1>Add Exercise</h1>
          <div className="custom-input">
          <form onSubmit={this.handleSubmit}>
            <input className="custom-input-field" id="name" type="text" placeholder="Enter name of the exercise" value={this.state.title} onChange={this.handleChangeTitle} required />
            <input className="btn btn-primary" type="submit" value="Add" />
          </form> 
          {this.state.flag && (<Redirect to={'/createworkout'}/>) }
        </div>
        </div>
      );
    }
  }

  export default addExercises;
