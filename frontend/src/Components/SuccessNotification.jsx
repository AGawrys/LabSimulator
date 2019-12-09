import React from 'react';
import {Toast} from 'react-bootstrap'

function SuccessNotification(props) {
    const {show, onClose, message, isSuccess, autohide, delay} = props;
    return (
        <Toast className="success-notif" show={show} onClose={onClose} autohide={autohide} delay={delay}>
          <Toast.Header className="success-notif-body">
            <i class="fa fa-check-circle" aria-hidden="true"/>&nbsp;&nbsp;<strong className={"mr-auto"}>{message}</strong>
          </Toast.Header>
        </Toast>
    );
}

export default SuccessNotification;