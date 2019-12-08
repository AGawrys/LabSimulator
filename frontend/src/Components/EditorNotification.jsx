import React from 'react';
import {Toast} from 'react-bootstrap'

function EditorNotification(props) {
    const {show, onClose, message, autohide, delay, isSuccess} = props;
    const toastClassName = isSuccess ? "success-notif" : "unsuccessful-notif";
    const toastHeaderClassName = isSuccess ? "success-notif-body" : "unsuccessful-notif-body";
    const icon = isSuccess ? "fa fa-check-circle" : "fa fa-times-circle";

    return (
        <Toast className={toastClassName} show={show} onClose={onClose} autohide={autohide} delay={delay}>
          <Toast.Header className={toastHeaderClassName}>
            <i className={icon} aria-hidden="true"/>&nbsp;&nbsp;<strong className={"mr-auto"}>{message}</strong>
          </Toast.Header>
        </Toast>
    );
}

export default EditorNotification;