import { useLogout } from '../hooks/useLogout';
import { useAuthContext } from '../hooks/useAuthContext';
import { Link } from 'react-router-dom';

import logo from '../assets/logo.png';
import styles from './Navbar.module.css';

export default function Navbar() {
    const { logout } = useLogout();
    const { user } = useAuthContext();

    return (
        <div className={styles['navbar-area']}>
            <div className={styles['container']}>
                <nav className={styles.navbar}>
                        <Link to="/" className={styles.title}><img src={logo} className={styles['logo-image']} alt='logo' /></Link>
                        <div className={styles['collapse-navbar']}>
                            {!user && (
                                <ul className={styles['navbar-nav']}>
                                    <li className={styles['nav-item']}><Link to="/login">Login</Link></li>
                                    <li className={styles['nav-item']}><Link to="/signup">Signup</Link></li>
                                </ul>
                            )}

                            {user && (
                                <ul className={styles['navbar-nav']}>
                                    <li className={styles['nav-item']}>hello, {user.displayName}</li>
                                    <li className={styles['nav-item']}>
                                        <button className='btn' onClick={logout}>Logout</button>
                                    </li>
                                </ul>
                            )}
                        </div>
                </nav>
            </div>
        </div>
    )
}