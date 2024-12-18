import  { useState } from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { useNavigate, useLocation } from 'react-router-dom';
import { navigationLinks } from './NavLinkData';
import styles from './Sidebar.module.css';
import { useAuth } from '../../../context/AuthContext.jsx';

function Sidebar() {
    const [expanded, setExpanded] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const { user } = useAuth();
    const removeAccents = (str) => {
        return str.normalize("NFD").replace(/[\u0300-\u036f]/g, "");
    };

    const isActive = (link) => {
        const cleanTitle = removeAccents(link.title.toLowerCase());
        return location.pathname === `/${cleanTitle}`;
    };

    const handleNavigate = (link) => {
        setExpanded(false); // Hamburger menü bezárása
        if (link.title === 'Kilépés') {
            navigate('/');

        }
        else if (link.title==='Főoldal'){
            navigate('/dashboard');
        }
        else
        {
            const cleanTitle = removeAccents(link.title.toLowerCase());
            navigate(`/${cleanTitle}`);
        }
    };

    return (
        <Navbar
            expand="lg"
            className={styles['checkinn-navbar']}
            expanded={expanded}
            fixed="top"
        >
            <Container fluid>
                <Navbar.Brand className={styles.brand}>
                    CheckInn
                </Navbar.Brand>
                <Navbar.Toggle
                    aria-controls="navbar-nav"
                    onClick={() => setExpanded(!expanded)}
                    className={styles.toggle}
                />
                <Navbar.Collapse id="navbar-nav">
                    <Nav className={`me-auto ${styles.navLinks}`}>
                        {navigationLinks
                            // HR menü elrejtése RoleId alapján, Kilépés kivételével
                            .filter((link) => {
                                if (link.title === 'HR') {
                                    return user && user.roleId <= 2; // Csak 1-es és 2-es RoleId esetén jelenjen meg
                                }
                                return link.title !== 'Kilépés';
                            })
                            .map((link) => {
                                return (
                                    <Nav.Link
                                        key={link.id}
                                        onClick={() => handleNavigate(link)}
                                        className={`${styles.navLink} ${
                                            isActive(link) ? styles.active : ''
                                        }`}
                                    >
                                        <img
                                            src={link.image}
                                            alt={link.title}
                                            className={styles.icon}
                                        />
                                        {link.title}
                                    </Nav.Link>
                                );
                            })}
                    </Nav>
                    <Nav className={styles.logout}>
                        {navigationLinks
                            .filter((link) => link.title === 'Kilépés')
                            .map((link) => (
                                <Nav.Link
                                    key={link.id}
                                    onClick={() => handleNavigate(link)}
                                    className={`${styles.navLink} ${styles.logoutLink}`}
                                >
                                    <img
                                        src={link.image}
                                        alt={link.title}
                                        className={styles.icon}
                                    />
                                    {link.title}
                                </Nav.Link>
                            ))}
                    </Nav>
                </Navbar.Collapse>



            </Container>
        </Navbar>
    );
}

export default Sidebar;
