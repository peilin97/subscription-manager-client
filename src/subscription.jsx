import Axios from 'axios';
import React from 'react';
export default class Subscription extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            subscription: {},
            subscriptionName: '',
            subscriptionBillDate: Date,
            subscriptionFrequency: '',
            subscriptionCost: 0.0,
            subscriptionCategory: '',
            subscriptionUserId: '',
        };
    }

    componentDidMount() {
        Axios.get('https://subscription-manager-server.herokuapp.com/user', {
            withCredentials: true,
        }).then(response => {
            console.log(response.data);
            this.setState({ pokemon: response.data });
        });
    }

    onChange(key, event) {
        this.setState({ [key]: event.target.value });
    }

    subscriptionFreqEnum = subFreqEnum => {
        switch (subFreqEnum) {
            case 'DAILY':
                this.subscriptionFrequency = 'DAILY';
                break;
            case 'WEEKLY':
                this.subscriptionFrequency = 'WEEKLY';
                break;
            case 'QUARTERLY':
                this.subscriptionFrequency = 'QUARTERLY';
                break;
            case 'HALFYEARLY':
                this.subscriptionFrequency = 'HALFYEARLY';
                break;
            case 'YEARLY':
                this.subscriptionFrequency = 'YEARLY';
                break;
            default:
                this.subscriptionFrequency = 'MONTHLY';
        }
    };

    subscriptionCatEnum = subCatEnum => {
        switch (subCatEnum) {
            case 'DAILY':
                this.subscriptionCategory = 'CONTENT';
                break;
            default:
                this.subscriptionCategory = 'SERVICE';
        }
    };

    onSubmit() {
        Axios.post('https://subscription-manager-server.herokuapp.com/user', {
            subscriptionName: this.state.subscriptionName,
            subscriptionBillDate: this.state.subscriptionBillDate,
            subscriptionFrequency: this.state.subscriptionFrequency,
            subscriptionCost: this.state.subscriptionCost,
            subscriptionCategory: this.state.subscriptionCategory,
            subscriptionUserId: this.state.subscriptionUserId,
        })
            .then(function () {
                return Axios.get(
                    'https://subscription-manager-server.herokuapp.com/user'
                );
            })
            .then(response => {
                this.setState({ subscription: response.data });
            })
            .catch(error => console.log(error))
            .finally(() =>
                this.setState({
                    subscriptionName: '',
                    subscriptionBillDate: Date,
                    subscriptionFrequency: '',
                    subscriptionCost: 0,
                    subscriptionCategory: '',
                    subscriptionUserId: '',
                })
            );
    }

    render() {
        return (
            <>
                <h1>Subscription List</h1>
                <h2> List of Subscriptions</h2>
                <div>
                    {this.state.subscription.map(subscript => (
                        <div>
                            <span>{subscript.subscriptionName}</span>
                            <span>{subscript.subscriptionBillDate}</span>
                            <span>{subscript.subscriptionFrequency}</span>
                            <span>{subscript.subscriptionCost}</span>
                            <span>{subscript.subscriptionCategory}</span>
                            <span>{subscript.subscriptionUserId}</span>
                        </div>
                    ))}
                    <label for="name">Subscription Name:</label>
                    <input
                        id="name"
                        value={this.state.subscriptionName}
                        onChange={e =>
                            this.onChange('subscriptionName', e)
                        }></input>

                    <label for="name">Subscription Bill Date:</label>
                    <input
                        id="name"
                        type="date"
                        value={this.state.subscriptionBillDate}
                        onChange={e =>
                            this.onChange('subscriptionBillDate', e)
                        }></input>

                    <label for="name">Subscription Frequency:</label>
                    <select
                        id="name"
                        value={this.state.subscriptionFreqEnum}
                        onChange={e =>
                            this.onChange('subscriptionFreqEnum', e)
                        }>
                        <option value="DAILY">DAILY</option>
                        <option value="WEEKLY">WEEKLY</option>
                        <option value="MONTHLY">MONTHLY</option>
                        <option value="QUARTERLY">QUARTERLY</option>
                        <option value="HALFYEARLY">HALFYEARLY</option>
                        <option value="YEARLY">YEARLY</option>
                    </select>

                    <label for="name">Subscription Cost:</label>
                    <input
                        id="name"
                        type="double"
                        value={this.state.subscriptionCost}
                        onChange={e =>
                            this.onChange('subscriptionCost', e)
                        }></input>

                    <label for="name">Subscription Category:</label>
                    <select
                        id="name"
                        value={this.state.subscriptionCatEnum}
                        onChange={e => this.onChange('subscriptionCatEnum', e)}>
                        <option value="CONTENT">CONTENT</option>
                        <option value="SERVICE">SERVICE</option>
                    </select>

                    <button onClick={() => this.onSubmit()}>Submit</button>
                </div>
            </>
        );
    }
}
