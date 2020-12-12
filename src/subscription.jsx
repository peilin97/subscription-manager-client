import Axios from 'axios';
import React from 'react';

export default class Subscription extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      subscription: [],
      subscriptionName: '',
      subscriptionBillDate: Date,
      subscriptionFrequency: '',
      subscriptionCost: 0,
      subscriptionCategory: '',
      subscriptionUserId: ''
    }    
  }

  componentDidMount() {
    Axios.get('http://localhost:3000/graphql', {
      withCredentials: true,
    })
      .then(response => {
        console.log(response.data)
        this.setState({pokemon: response.data})
      });
  }
  
  onChange(key, event) {
    this.setState(

      {[key]: event.target.value}
    )
  }

  onSubmit() {
    Axios.post(
      'http://localhost:3000/graphql', 
      {
        subscriptionName: this.state.subscriptionName,
        subscriptionBillDate: this.state.subscriptionBillDate,
        subscriptionFrequency: this.state.subscriptionFrequency,
        subscriptionCost: this.state.subscriptionCost,
        subscriptionCategory: this.state.subscriptionCategory,
        subscriptionUserId: this.state.subscriptionUserId
      }
    ).then(function() {
      return Axios.get('http://localhost:3000/graphql')

    })
    .then(response => {
      this.setState({subscription: response.data})
    })
    .catch(error => console.log(error))
    .finally(() => this.setState(
        {
          subscriptionName: '',
          subscriptionBillDate: Date,
          subscriptionFrequency: '',
          subscriptionCost: 0,
          subscriptionCategory: '',
          subscriptionUserId: ''
        }    
      )
    )   
  }

  render() {
    return (
      <><h1>Subscription List</h1>
        <h2> List of Subscriptions</h2>
        <div>
          {this.state.subscription.map(subscript => 
            <div>
              <span>{subscript.subscriptionName}</span>
              <span>{subscript.subscriptionBillDate}</span>
              <span>{subscript.subscriptionFrequency}</span>
              <span>{subscript.subscriptionCost}</span>
              <span>{subscript.subscriptionCategory}</span>
              <span>{subscript.subscriptionUserId}</span>
              </div>
          )
          }
          <label for="name">Subscription Name:</label>
          <input id="name" value={this.state.subscriptionName} 
          onChange={(e) => this.onChange('subscriptionName', e)}></input>
          
          <label for="name">Subscription Bill Date:</label>
          <input id="name" type="date" value={this.state.subscriptionBillDate}
          onChange={(e) => this.onChange('subscriptionBillDate', e)}>
          </input>
          
          <label for="name">Subscription Frequency:</label>
          <input id="name" value={this.state.subscriptionFrequency} 
          onChange={(e) => this.onChange('subscriptionFrequency', e)}>
          </input>
          
          <label for="name">Subscription Cost:</label>
          <input id="name" type="number" value={this.state.subscriptionCost} 
          onChange={(e) => this.onChange('subscriptionCost', e)}>
          </input>

          <label for="name">Subscription Category:</label>
          <input id="name" value={this.state.subscriptionCategory} 
          onChange={(e) => this.onChange('subscriptionCategory', e)}>
          </input>

        </div>
      </>
    )
  }
  
}