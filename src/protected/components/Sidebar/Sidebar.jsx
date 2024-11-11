import React, { useState } from 'react';
import { Offcanvas, ListGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { navigationLinks } from './NavLinkData';
import styles from './Sidebar.module.css';

function Sidebar() {
    const [show, setShow] = useState(false);
    const navigate = useNavigate();

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogout = () => {
        navigate('/');
    };
    const toUrlFriendlyString = (str) => {
        return str
            .normalize('NFD') // ékezetek leválasztása
            .replace(/[\u0300-\u036f]/g, '') // ékezetek eltávolítása
            .toLowerCase();
    }


    return (
        <div>

            <Button
                variant="primary"
                onClick={handleShow}
                className="d-lg-none"
                style={{
                    position: 'fixed',
                    top: '10px',
                    left: '10px',
                    zIndex: 1301
                }}
            >
                ☰
            </Button>


            <Offcanvas show={show} onHide={handleClose} backdrop={false} className={styles['offcanvas-sidebar']} placement="start">
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Menü</Offcanvas.Title>
                </Offcanvas.Header>
                <Offcanvas.Body>
                    <ListGroup variant="flush">
                        {navigationLinks.map((link) => (
                            <ListGroup.Item
                                key={link.id}
                                action
                                onClick={() => link.title === 'Kilépés' ? handleLogout() : navigate(`/${toUrlFriendlyString(link.title)}`)}
                                className={`${styles['list-group-item']} d-flex align-items-center`}
                            >
                                <img
                                    src={link.image}
                                    alt={link.title}
                                    className={styles.icon}
                                />
                                {link.title}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>
                </Offcanvas.Body>
            </Offcanvas>


            <div className={`d-none d-lg-block ${styles.sidebar}`}>
                <ListGroup variant="flush">
                    {navigationLinks.map((link) => (
                        <ListGroup.Item
                            key={link.id}
                            action
                            onClick={() => link.title === 'Kilépés' ? handleLogout() : navigate(`/${toUrlFriendlyString(link.title)}`)}
                            className={`${styles['list-group-item']} d-flex align-items-center`}
                        >
                            <img
                                src={link.image}
                                alt={link.title}
                                className={styles.icon}
                            />
                            {link.title}
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </div>
        </div>
    );
}

export default Sidebar;
