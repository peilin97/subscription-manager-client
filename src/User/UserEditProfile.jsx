import React, { useState } from 'react';
import Axios from 'axios';
import { useHistory } from 'react-router-dom';

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

export default function UserEditProfile () {
    
    const EditUserProfile = () => {
        Axios.post(
            URL,
            {
                query: `mutation EditUserProfile(
                $email: String!,
                $username: String!,
                $password: String!
                ) {
                    editProfile(
                    email: $email,
                    username: $username,
                    password: $password,
                ) {
                    email,
                    username,
                    password
                }
            }`,
                variables: {
                    email: 'admin999@test.com',
                    password: 'admin5test',
                },
            },
            { withCredentials: true }
        )
            .then(res => {
                if (res.data.errors) {
                    console.log('has error');
                } else {
                    console.log('no error');
                }
                console.log(res.cookies);
                console.log(res);
            })
            .catch(err => {
                console.log(err.response);
            });
    };

    return (
        <div>
            <button onClick={EditUserProfile}>log in</button>
        </div>
    );
}
