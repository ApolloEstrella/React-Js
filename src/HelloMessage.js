import React from 'react';
import ReactDOM from 'react-dom';



class HelloMessage extends React.Component {
     render() {
         return (
             <div>
             {this.props.msg};
             </div>
         )
     }      
}

export default HelloMessage;