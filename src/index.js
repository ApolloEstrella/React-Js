import React from 'react';

import ReactDOM from 'react-dom';




class RestController extends React.Component {
	constructor(props) {
		super(props);
		this.state =  {
						//id: 0,
						//firstName: '',
						//lastName: '',
						firstNameError: '',
						authors: [],
						newId: 0,
						author: {"id": 0, "firstName": "", "lastName": ""},
						isSubmitLabel: true
					 };
		//this.state = {authors: []};	
		 				
		this.handleChangeFirstName = this.handleChangeFirstName.bind(this); 
		this.handleChangeLastName = this.handleChangeLastName.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleDelete = this.handleDelete.bind(this);
		this.handleUpdate = this.handleUpdate.bind(this);
	}
	
	 
 
	//handleChangeFirstName(e) {
	//	this.setState({ value: e.target.value}, () => { this.validateFirstName() });
	//}

	handleChangeFirstName(event) {
		//const target = event.target;
		//const name = target.name;
		//this.setState({[name]: event.target.value});
		//this.setState({firstName: event.target.value});
		this.setState({
			author: {
						...this.state.author,
						firstName: event.target.value
			}
	})
	}
	   
	validateFirstName() {
		if (this.state.author.firstName.length === 0) {
			this.setState({ firstNameError: 'Please enter first name.'} );
		}
	}
	
	handleChangeLastName(event) {
		//this.setState(() => { return { lastName: e.target.value } } );
		//console.log(this.state.author.lastName);
		//this.setState({lastName: e.target.value});
		this.setState({
			author: {...this.state.author, lastName: event.target.value}
		})
	}
	
	 
	

	  setNewId(){
		this.setState(prevState => {
		  return {
			newId: prevState.newId - 1
		  }
		})
	  } 
		 

	handleSubmit(e){
		e.preventDefault();
		//var newId = this.state.author.id - 1;
		//this.setNewId();
		//console.log(this.state.newId);

		//this.setState({newId: this.state.newId - 1})

		this.setNewId();


		fetch("https://localhost:44354/api/values", {method: 'POST', headers:{'Content-Type': 'application/json'}, body: JSON.stringify({id: this.state.newId, firstName: this.state.author.firstName, lastName: this.state.author.lastName})})		
		.then(response => {
			console.log(response)
			if (response.status >= 200 && response.status < 300) {
				//alert('Successfully added');

				
				this.setState({id: this.state.newId});

				const author = {'id': this.state.newId, 'firstName': this.state.author.firstName, 'lastName': this.state.author.lastName};
				//this.setState({authors: [this.state.authors, obj]});
				 
				//this.state.authors.push(obj)
				//this.setState(
				//  this.state
				//)
		
		
				this.setState({ authors: [...this.state.authors, author ] })
			} else {
				alert('Something happened wrong');
			}
		})
		.catch(err => err)
	}

	handleSubmitOld(e) {
		e.preventDefault();
		console.log(this.state.author.firstName);
		//const obj = {'id': 3, 'firstName': this.state.author.firstName, 'lastName': this.state.author.lastName};
		//this.setState({authors: [this.state.authors, obj]});
		//this.state.authors.push(obj);

		const obj = {'id': {...this.state.author.id}, 'firstName': this.state.author.firstName, 'lastName': this.state.author.lastName};
		//this.setState({authors: [this.state.authors, obj]});
		 
		//this.state.authors.push(obj)
		//this.setState(
		//  this.state
		//)


		this.setState({ authors: [...this.state.authors, obj ] })

		 
	}

	handleUpdate(author) {
		var x = JSON.stringify(author);                          
		fetch("https://localhost:44354/api/values/" + author.id, {method: 'PUT', headers:{'Content-Type': 'application/json'}, body: JSON.stringify(author)})		
		.then(response => {
			console.log(response)
			if (response.status >= 200 && response.status < 300) {

				//this.setState({...this.state.author.firstName:});


				this.setState(prevState => ({
					author: {                   // object that we want to update
							...prevState.author,    // keep all other key-value pairs
							firstName: author.firstName       // update the value of specific key
					}
			}))

			this.setState(prevState => ({
				author: {                   // object that we want to update
						...prevState.author,    // keep all other key-value pairs
						lastName: author.lastName      // update the value of specific key
				}
		}))	
			
			
			//alert('Successfully updated.');

				
				//this.setState({id: this.state.newId});

				//const author = {'id': this.state.newId, 'firstName': this.state.author.firstName, 'lastName': this.state.author.lastName};
				//this.setState({authors: [this.state.authors, obj]});
				 
				//this.state.authors.push(obj)
				//this.setState(
				//  this.state
				//)
		
		
				//this.setState({ authors: [...this.state.authors, author ] })
			} else {
				alert('Something happened wrong');
			}
		})
		.catch(err => err)
	}
 


	handleDelete(e) {
		//alert('del');
		console.log(e.target.value);
		var array = [...this.state.authors];
		var itemId = e.target.value;

		var index = array.findIndex(i => String(i.id) === String(itemId));
		//var index = array.map(function(j) { return j.id ; }).indexOf(itemId);

		//var index = array.findIndex('id', itemId);
		//var index = array.findIndex(i => i.id === itemId)
		//var item = array.find(item => item.id === itemId);


		//let obj = array.find(o => o.id == itemId);

		array.splice(index, 1);		
		this.setState({authors: array});
		
		//this.setState({authors:[...this.authors.splice(e.value, 1)]}) */
		
 			fetch("https://localhost:44354/api/values/" + itemId, {method: "DELETE", headers: {'Content-Type': 'application/json'}})
		
			  .then(res => res.json())
			  .then(
				(result) => {
					 
					//for(let i = 0; i < result.length; i++) {
						//0console.log(result[i].firstName);
						//var name = result[i].firstName;
					  //<HelloMessage msg={"Taylor"} />
						// loop through your data
						//alert(name + "a");
					   
						//this.setState({firstName: result[i].firstName});
						 
					 //}
	
	
					 this.setState({authors: result});
					 
	
	
					 
				},
				// Note: it's important to handle errors here
				// instead of a catch() block so that we don't swallow
				// exceptions from actual bugs in components.
				(error) => {
				  this.setState({
					isLoaded: true,
					error
				  });
				}
			  )				 
 	}

	 

	componentDidMount() {
		fetch("https://localhost:44354/api/values")
		  .then(res => res.json())
		  .then(
			(result) => {
				 
				//for(let i = 0; i < result.length; i++) {
					//0console.log(result[i].firstName);
					//var name = result[i].firstName;
				  //<HelloMessage msg={"Taylor"} />
					// loop through your data
					//alert(name + "a");
				   
					//this.setState({firstName: result[i].firstName});
					 
				 //}


				 this.setState({authors: result});
				 


				 
			},
			// Note: it's important to handle errors here
			// instead of a catch() block so that we don't swallow
			// exceptions from actual bugs in components.
			(error) => {
			  this.setState({
				isLoaded: true,
				error
			  });
			}
		  )
		}
		

	render() {                            
		return (
			<div>

	<form onSubmit={this.handleSubmit}>				
   <label>
		 First Name:
  	<input name="firstName" value={this.state.author.firstName} onChange={this.handleChangeFirstName}></input>
  </label>

	<label>
		Last Name:	
  	<input name="lastName" value={this.state.author.lastName} onChange={this.handleChangeLastName}></input>
	</label>	 

	<input type="submit" value="Submit" />			

  </form>

			
    <ul>
			{this.state.authors.map(item => (
			 	<li key={item.id}>{item.id + ': ' + item.firstName + ', ' + item.lastName} 
				 	<button value={item.id} onClick={this.handleDelete} >Delete</button> 
				 	<button value={item.id} onClick={ () => this.handleUpdate(item)} >Edit</button>
				 
				 </li>
				//<li key={item.id}>{item.firstName + ', ' + item.lastName} <input type="button" value="Delete" onClick={this.handleDelete(item.id)} ></input> </li>
			))}
		</ul>

			</div>
			
		)
	}
}

 


ReactDOM.render(<RestController />, document.getElementById('root'));


 