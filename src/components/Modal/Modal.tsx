import React, {FC, ReactNode} from "react";
import ReactDOM from "react-dom";
import {CloseIcon} from '@ya.praktikum/react-developer-burger-ui-components'
import PropTypes from "prop-types";
import styles from './modal.module.css'
import ModalOverlay from "../ModalOverlay/ModalOverlay";

const modalRoot = document.getElementById("react-modals") as Element;

interface IModalProps {
    modalActive: boolean;
    setModalActive: React.Dispatch<React.SetStateAction<boolean>>;
    children: ReactNode;
}

const Modal: FC<IModalProps> = (props) => {
const {modalActive, setModalActive, children} = props;
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
                     onClick={() => setModalActive(false)}>
                    <div className={styles.popupBox} onClick={e => e.stopPropagation()}>
                        <button type="button" className={styles.buttonClose} onClick={() => setModalActive(false)}>
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