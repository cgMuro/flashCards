import React, { useEffect, useContext } from 'react';
import { Modal, ModalBody, Button} from 'reactstrap';
import { AuthContext } from '../context/AuthState';
import { AlertContext } from '../context/AlertState';


export default function LoadUser() {

    const { loadUser } = useContext(AuthContext)
    const { alertMsg, setAlertMsg } = useContext(AlertContext);

    // Check if user is still authenticated
    useEffect(() => {
        loadUser();
    }, [])

    return (
        <>
            <Modal isOpen={alertMsg !== '' ? true : false}>
                <ModalBody>
                    <h5 className="text-center mb-4">{alertMsg}</h5>
                    <Button color="info" outline onClick={() => setAlertMsg('')} block>Close</Button>
                </ModalBody>
            </Modal>
        </>
    )
}