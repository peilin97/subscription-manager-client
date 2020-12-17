import React, { useState } from 'react';
import Axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { useHistory } from 'react-router-dom';
import AdminLogout from './adminLogout';
import SearchResult from './searchResult';
import './admin.css';

// const URL = 'https://subscription-manager-server.herokuapp.com/admin';
const URL = 'http://localhost:5000/admin';

export default function Administrator() {

    const history = useHistory();
    const [search, setSearch] = useState('');
    const [isLoggedIn, setLoggedIn] = useState(false);
    const [searchResult, setSearchResult] = useState(null);

    // check if an administrator is logged in or not
    Axios.post(
        URL,
        {query: `query Administrator {
            administrator {
                username
            }
        }`,},
        {withCredentials: true}
    ).then(res => {
        if (res.data.errors) {
            // redirect to the login page
            history.push({
                pathname: '/admin/login',
            });
            // alert(res.data.errors[0].message);
        } else {
            setLoggedIn(true);
        }
    }).catch(err => {
        history.push({
            pathname: '/admin/login',
        });
        console.log(err.response);
    });

    const onSearch = () => {
        Axios.post(
            URL,
            {query: `mutation FindUserByEmail($email: String!) {
                findUser(userEmail: $email) {
                    username,
                    email,
                    subscriptions {
                        name,
                        cost,
                        billingDate,
                        category,
                        frequency
                    }
                }
            }`,
            variables: {
                email: search,
            }},
            // {headers: {'Authorization': 'Bearer '+'xxx'}},
            {withCredentials: true}
            ).then(res => {
                if (res.data.errors) {
                    console.log(res.data.errors[0].message);
                    return;
                }
                setSearchResult(res.data.data.findUser);
                console.log(searchResult);
            }).catch(err => {
                alert(err.response.data);
            });
    };

    return (
        // search box
        <div className="admin">
            {isLoggedIn && <div>
                <AdminLogout onClick={() => setLoggedIn(false)}/>
                <div  className="form">
                <input
                    className="searchBox"
                    value={search}
                    placeholder="Search a user by email"
                    onChange={e => setSearch(e.target.value)}
                />
                <span>
                    {search !== '' &&
                    <button>
                        <FontAwesomeIcon
                            className = "fontAwesomeIcon"
                            icon={faTimesCircle}
                            onClick={() => setSearch('')} />
                    </button>
                    }
                </span>
                <button className="searchButton">
                    <FontAwesomeIcon icon={faSearch} onClick={onSearch} className = "fontAwesomeIcon"/>
                </button>
                </div>
            </div>}
            {searchResult && <SearchResult info={searchResult}/>} 
        </div>
    )
}