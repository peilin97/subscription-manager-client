import React from 'react';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faWallet } from '@fortawesome/free-solid-svg-icons';
import './header.css';

export default function Header() {
    return (
        <div className="navbar flexRow">
            <a href="/" className="navbarItem smallerText">
                <FontAwesomeIcon
                    className = "fontAwesomeIcon createBtn btn"
                    icon={faWallet} />
                <span className="hide">Subscription Manager</span>
            </a>
            <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
            <Popover id="popover-basic">
                <div className="dropdownItem hover"><a href="/user/login"> As user </a></div>
                <div className="dropdownItem hover"><a href="/admin/login"> As administrator </a></div>
            </Popover>}>
                <button>Log in</button>
            </OverlayTrigger>
            <OverlayTrigger rootClose trigger="click" placement="bottom" overlay={
            <Popover id="popover-basic">
                <div className="dropdownItem hover"><a href="/user/signup"> As user </a></div>
                <div className="dropdownItem hover"><a href="/admin/signup"> As administrator </a></div>
            </Popover>}>
                <button>Sign up</button>
            </OverlayTrigger>
        </div>
    )
}