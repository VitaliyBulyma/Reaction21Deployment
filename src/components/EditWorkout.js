

import React from 'react';


class EditWorkout extends React.Component {
    constructor(props) {
      super(props);
      this.state = {title: ''};
      this.state = {length: ''};
      
    //   this.state = {data: []};
        
      this.handleChangeTitle = this.handleChangeTitle.bind(this);
      this.handleChangeLength = this.handleChangeLength.bind(this);      
       
      this.handleSubmit = this.handleSubmit.bind(this);
    }
    
    async componentDidMount() {
      await fetch('https://reaction21.herokuapp.com/workouts/'+this.props.match.params.id)
        .then(response => response.json())
        .then(data => this.setState({ title: data.title, length:data.length }));
    }

    handleChangeTitle(event) {
    
      this.setState({title: event.target.value});   
    }

    handleChangeLength(event) {
        
      this.setState({length: event.target.value});       
      
    }

    async handleSubmit(event) {
    //   alert('The workout was updated: ' + this.state.title);
      event.preventDefault();
       await fetch(('https://reaction21.herokuapp.com/workouts/'+this.props.match.params.id), {
        method: 'PATCH',
        // mode: 'no-cors',
        headers:{
          'Accept': 'application/json',
          'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify({
            // "_id": this.props.match.params.id,
            "title": this.state.title,
            "length": this.state.length,
            "user": "Vitaliy"          
        })
      });

    //   this.setState({title: ''});     
    //   this.setState({length: ''});  
      window.location.href = "/showworkouts";  
      
    }
    
    render() {
      
      return (       
        <div className="custom-form">
          <form onSubmit={this.handleSubmit}>

          <label>Workout</label>
            <input type="text" value={this.state.title}  onChange={this.handleChangeTitle} />
          <label>Duration</label>
            <input type="text" value={this.state.length}  onChange={this.handleChangeLength} />
          <input className="btn btn-primary" type="submit" value="Submit" />
        </form>        
      </div>
      );
    }
  }

  export default EditWorkout;
