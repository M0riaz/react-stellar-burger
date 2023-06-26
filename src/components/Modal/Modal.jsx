import React from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import styles from './modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals");

function Modal({modalActive, setModalActive, children}) {

    const handleKeyDown = React.useCallback((e) => {
        if (e.key === 'Escape') {
            setModalActive(false);
        }
    }, []);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, []);

    return ReactDOM.createPortal((
        <div>
            <ModalOverlay onClick={setModalActive}/>
            <div>
                <div className={modalActive ? `${styles.popup} ${styles.active}` : styles.popup}
                     onClick={setModalActive}>
                    <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
                        <button type="button" className={styles.buttonClose} onClick={setModalActive}>
                            <CloseIcon type="primary"/>
                        </button>
                        <div>
                            {children}
                        </div>
                    </div>
                </div>
            </div>

        </div>
    ), modalRoot);
}

Modal.propTypes = {
    children: PropTypes.element.isRequired
};

export default Modal;