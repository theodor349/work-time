import { useState } from 'react';
import styles from './App.module.scss';
import { ActicityOverview } from './components/acticity-overview/acticity-overview';
import { Header } from './components/header/header';
import Classnames from 'classnames';

function App() {
    const [count, setCount] = useState(0);

    return (
        <div className={styles.App}>
            <Header />
            <ActicityOverview />
        </div>
    );
}

export default App;
