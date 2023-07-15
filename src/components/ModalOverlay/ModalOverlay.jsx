import styles from './modalOverlay.module.css'

function ModalOverlay (props){
    return (
        <div onClick={props.closeModal} className={styles.block}>
        </div>
    )
}

export default ModalOverlay