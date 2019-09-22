import React from 'react';

import ReactDOM from 'react-dom';


class Reservation extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        firstName: ''
      };
      //this.state = {authors: []};	
      this.handleInputChange = this.handleInputChange.bind(this);
      this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    }
  
    handleChangeFirstName(event) {
		const target = event.target;
		const name = target.name;
		this.setState({[name]: event.target.value});
    }
    
    handleInputChange(event) {
      const target = event.target;
      const value = target.type === 'checkbox' ? target.checked : target.value;
      const name = target.name;
  
      this.setState({
        [name]: value
      });
    }
  
    render() {
      return (
        <form>
          <label>
            First Name:
            <input name="firstName" value={this.state.firstName} onChange={this.handleChangeFirstName}></input>

          </label>
        </form>
      );
    }
  }


 
  ReactDOM.render(<Reservation />, document.getElementById('root'));    