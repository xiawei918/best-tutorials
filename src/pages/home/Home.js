import hero from '../../assets/hero.png';
import styles from './Home.module.css';

export default function Home() {
        return (
        <div className={styles.container}>
            <div className={styles['section-one']}>
                <section className={styles['home-intro-section']}>
                    <div className={styles.intro}>
                        <div>
                            <h2><strong>Learn From <br/>The Best Tutorials.</strong></h2>
                            <p>Best Rated Tutorials To Get You Started.</p>
                        </div>
                        <img src={hero} className={styles['hero-image']} alt='digital world'/>
                    </div>
                </section>
            </div>
        </div>
    )
}