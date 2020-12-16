import React, { useEffect, useState } from 'react';
import { createApi } from 'unsplash-js';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import './cover.css';

const unsplash = createApi({
    accessKey: "FfS1t4GQKxgFlvO8ncBrFpIo-DlXl1Ghm1ooubHA-m8",
});

// implement UnsplashAPI for users to search photos and change the cover
export default function Cover() {
    const [showPopover, setShowPopover] = useState(false);
    const [addCover, toggleAddCover] = useState(false);
    const [cover, setCover] = useState('');
    const [photos, setPhotos] = useState([]);
    const [search, setSearch] = useState('');

    useEffect(() => {
        if (addCover && search === '' && photos.length === 0) {
            getRandomPhotos();
        }
    });
    
    const getRandomCover = () => {
        toggleAddCover(!addCover);
        // get a single random cover
        if (cover === '') {
            unsplash.photos.getRandom({orientation: "landscape"})
            .then( res => {
                if (res.errors) {
                    console.log('error occurred: ' + res.errors[0]);
                } else {
                    setCover(res.response);
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
        setCover('');
        setPhotos([]);
        toggleAddCover(!addCover);
        document.body.click();  // close popover
    }

    return (
        <div>
            {cover !== '' &&
                <div>
                    <img src={cover.urls.regular} alt='cover' className="coverImg" />
                    <OverlayTrigger
                        rootClose  // close the popover on click outside
                        onToggle = {() => getRandomPhotos()}
                        container={this}
                        trigger="click"
                        placement="bottom"
                        overlay={
                        <Popover id="popover-positioned-bottom"  className="popover">
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
                                                        onClick = {() => setCover(photo)}
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
                            className="changeBtn"
                        >
                            Change
                        </button>
                    </OverlayTrigger>
                    <button onClick={removeCover} className="removeBtn">Remove</button> 
                </div>
            }
            {/* only show add cover button when there's no cover */}
            {!addCover &&
                <button onClick={getRandomCover}>
                    Add cover
                </button>
            }
        </div>
    )
}