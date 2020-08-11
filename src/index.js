import React from "react";

import ReactDOM from "react-dom";

class RestController extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      firstNameError: "",
      authors: [],
      newId: 0,
      author: { id: 0, firstName: "", lastName: "" },
      isSubmitLabel: true,
    };
   
    this.handleChangeFirstName = this.handleChangeFirstName.bind(this);
    this.handleChangeLastName = this.handleChangeLastName.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.handleUpdate = this.handleUpdate.bind(this);
  }

  handleChangeFirstName(event) {
    this.setState({
      author: {
        ...this.state.author,
        firstName: event.target.value,
      },
    });
  }

  validateFirstName() {
    if (this.state.author.firstName.length === 0) {
      this.setState({ firstNameError: "Please enter first name." });
    }
  }

  handleChangeLastName(event) {
    this.setState({
      author: { ...this.state.author, lastName: event.target.value },
    });
  }

  setNewId() {
    this.setState((prevState) => {
      return {
        newId: prevState.newId - 1,
      };
    });
  }

  handleSubmit(e) {
    e.preventDefault();
    this.setNewId();
    fetch("https://localhost:44354/api/values", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        id: this.state.newId,
        firstName: this.state.author.firstName,
        lastName: this.state.author.lastName,
      }),
    })
      .then((response) => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          this.setState({ id: this.state.newId });

          const author = {
            id: this.state.newId,
            firstName: this.state.author.firstName,
            lastName: this.state.author.lastName,
          };
          this.setState({ authors: [...this.state.authors, author] });
        } else {
          alert("Something happened wrong");
        }
      })
      .catch((err) => err);
  }

  handleUpdate(author) {
    fetch("https://localhost:44354/api/values/" + author.id, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(author),
    })
      .then((response) => {
        console.log(response);
        if (response.status >= 200 && response.status < 300) {
          this.setState((prevState) => ({
            author: {
              // object that we want to update
              ...prevState.author, // keep all other key-value pairs
              firstName: author.firstName, // update the value of specific key
            },
          }));

          this.setState((prevState) => ({
            author: {
              // object that we want to update
              ...prevState.author, // keep all other key-value pairs
              lastName: author.lastName, // update the value of specific key
            },
          }));
        } else {
          alert("Something happened wrong");
        }
      })
      .catch((err) => err);
  }

  handleDelete(e) {
    console.log(e.target.value);
    var array = [...this.state.authors];
    var itemId = e.target.value;

    var index = array.findIndex((i) => String(i.id) === String(itemId));

    array.splice(index, 1);
    this.setState({ authors: array });

    fetch("https://localhost:44354/api/values/" + itemId, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ authors: result });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  componentDidMount() {
    fetch("https://localhost:44354/api/values")
      .then((res) => res.json())
      .then(
        (result) => {
          this.setState({ authors: result });
        },
        (error) => {
          this.setState({
            isLoaded: true,
            error,
          });
        }
      );
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            First Name:
            <input
              name="firstName"
              value={this.state.author.firstName}
              onChange={this.handleChangeFirstName}
            ></input>
          </label>

          <label>
            Last Name:
            <input
              name="lastName"
              value={this.state.author.lastName}
              onChange={this.handleChangeLastName}
            ></input>
          </label>

          <input type="submit" value="Submit" />
        </form>

        <ul>
          {this.state.authors.map((item) => (
            <li key={item.id}>
              {item.id + ": " + item.firstName + ", " + item.lastName}
              <button value={item.id} onClick={this.handleDelete}>
                Delete
              </button>
              <button value={item.id} onClick={() => this.handleUpdate(item)}>
                Edit
              </button>
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

ReactDOM.render(<RestController />, document.getElementById("root"));
