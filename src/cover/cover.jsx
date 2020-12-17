import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createApi } from 'unsplash-js';
import {
    selectCover,
    setCover,
} from '../User/userSlice.js';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './cover.css';
import Axios from 'axios';

// console.log(process.env.REACT_APP_UNSPLASH_ACCESS_KEY)
const unsplash = createApi({
    accessKey: process.env.REACT_APP_UNSPLASH_ACCESS_KEY,
});

// const URL = 'https://subscription-manager-server.herokuapp.com/user';
const URL = 'http://localhost:5000/user';

// implement UnsplashAPI for users to search photos and change the cover
export default function Cover() {
    const cover = useSelector(selectCover);
    // console.log(cover);
    const [showPopover, setShowPopover] = useState(false);
    // const [addCover, toggleAddCover] = useState(false);
    // const [cover, setCover] = useState('');
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState('');
    const dispatch = useDispatch();

    useEffect(() => {
        if (cover !== '' && search === '' && photos.length === 0) {
            getRandomPhotos();
        }
    });
    
    const getRandomCover = () => {
        // toggleAddCover(!addCover);
        // get a single random cover
        if (cover === '') {
            unsplash.photos.getRandom({orientation: "landscape"})
            .then( res => {
                if (res.errors) {
                    console.log('error occurred: ' + res.errors);
                } else {
                    // set url
                    dispatch(setCover(res.response.urls.regular));
                    // update on backend
                    Axios.post(URL, {
                        query: `mutation AddCover(
                            $cover: String!,
                            ) {
                            addCover(
                                cover: $cover,
                            ) {
                                cover
                            }
                        }`,
                        variables: {
                            cover: res.response.urls.regular,
                        },
                    }, { withCredentials: true }
                    ).then(response => {
                        if (response.data.errors) {
                            console.log(response.data.errors);
                            return;
                        }
                        console.log(response.data);
                    }).catch(err => {
                        console.log(err.response);
                    });
                }
            });
        }
    }

    const getRandomPhotos = () => {
            if (!showPopover) {
                // get 20 random photos
                unsplash.photos.getRandom({count: 20, orientation: "landscape"})
                .then( res => {
                    if (res.errors) {
                        console.log('error occurred: ' + res.errors[0]);
                    } else {
                        convertResponseTo2D(res.response);
                    }
                });
            }
            setShowPopover(!showPopover);
            
    }

    /* arr: an array of photos */
    const convertResponseTo2D = (arr) => {
        let newArr = [];
        while(arr.length) newArr.push(arr.splice(0,4));
        setPhotos(newArr)
    }

    const getSearchResults = e => {
        setSearch(e.target.value);
        unsplash.search.getPhotos({
            query: e.target.value,
            perPage: 20,
            orientation: "landscape",
        })
        .then( res => {
            if (res.errors) {
                console.log('error occurred: ' + res.errors[0]);
            } else {
                convertResponseTo2D(res.response.results);
            }
        });
    }

    const clearSearch = () => {
        setSearch('');
        setPhotos([]);
    }

    const removeCover = () => {
        dispatch(setCover(''));
        Axios.post(URL, {
            query: `mutation RemoveCover{
                removeCover{
                    cover
                }
            }`,
        }, { withCredentials: true }
        ).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
                return;
            }
        }).catch(err => {
            console.log(err.response);
        });

        setPhotos([]);
        // toggleAddCover(!addCover);
        document.body.click();  // close popover
    }

    const changeCover = (photo) => {
        dispatch(setCover(photo.urls.regular));
        Axios.post(URL, {
            query: `mutation AddCover(
                $cover: String!,
                ) {
                addCover(
                    cover: $cover,
                ) {
                    cover
                }
            }`,
            variables: {
                cover: photo.urls.regular,
            },
        }, { withCredentials: true }
        ).then(res => {
            if (res.data.errors) {
                console.log(res.data.errors);
                return;
            }
        }).catch(err => {
            console.log(err.response);
        });
    }

    return (
        <div>
            {cover !== '' &&
                <div>
                    <img src={cover} alt='cover' className="coverImg" />
                    <OverlayTrigger
                        rootClose  // close the popover on click outside
                        onToggle = {() => getRandomPhotos()}
                        container={this}
                        trigger="click"
                        placement="bottom"
                        overlay={
                        <Popover id="popover-positioned-bottom"  className="customPopover">
                            {/* search box */}
                            <div>
                                <input
                                    className="searchBox"
                                    value={search}
                                    placeholder="Search for an image"
                                    onChange={e => getSearchResults(e)}
                                />
                                <span>
                                    {search !== '' &&
                                        <FontAwesomeIcon
                                            className = "fontAwesomeIcon"
                                            icon={faTimesCircle}
                                            onClick={clearSearch} />
                                    }
                                </span> 
                            </div>
                            {/* list of pictures */}
                            {photos.length === 0
                                ? <p className="center">No results found</p>
                                : <div className="photosContainer">
                                    {photos.map(row =>(
                                        <div className="row">
                                            {row.map(photo => (
                                                <div key={photo.id} className="figure">
                                                    <img
                                                        className = "thumbnail"
                                                        key={photo.id}
                                                        src={photo.urls.thumb}
                                                        onClick = {() => changeCover(photo)}
                                                        alt="thumb" />
                                                    <a
                                                        className="credit"
                                                        href={photo.links.html}
                                                        target="_blank"
                                                    >{photo.user.username}</a>
                                                </div>
                                            ))}
                                        </div>
                                    ))}
                                </div>
                            }
                        </Popover>
                    }
                    >
                        <button
                            // onClick={getRandomPhotos}
                            className="coverBtn"
                        >
                            Change
                        </button>
                    </OverlayTrigger>
                    <button onClick={removeCover} className="coverBtn">Remove</button> 
                </div>
            }
            {/* only show add cover button when there's no cover */}
            {cover === '' &&
                <button onClick={getRandomCover} className="coverBtn">
                    Add cover
                </button>
            }
        </div>
    )
}