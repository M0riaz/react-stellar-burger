
import React from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import { ingredientPropType } from "../../utils/prop-types";
import styles from './modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals");

function Modal({modalActive,setModalActive, children }) {
    // console.log(props)
    // const [ modalActive, setModalActive] = React.useState(true)
    const [overlayActive, setOverlayActive] = React.useState(true);

    const handleKeyDown = React.useCallback((e) => {
        if (e.key === 'Escape') {
            setOverlayActive(false);
            setModalActive(false);
        }
    }, []);

    const handleCloseClick = React.useCallback(() => {
        setModalActive(false);
        setOverlayActive(false);
    }, []);

    React.useEffect(() => {
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('keydown', handleKeyDown);
        };
    });

    return ReactDOM.createPortal((
        <div >
            {overlayActive &&  <ModalOverlay />}
            <div >
                <div className={modalActive ? `${styles.popup} ${styles.active}` : styles.popup} onClick={ handleCloseClick}>
                    <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
                        <button type="button" className={styles.buttonClose} onClick={handleCloseClick}>
                            <CloseIcon type="primary" />
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