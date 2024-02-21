import { useState } from 'react';
import styles from './App.module.scss';
import { ActicityOverview } from './components/acticity-overview/acticity-overview';
import { Header } from './components/header/header';
import Classnames from 'classnames';
import { DateSelector } from './components/date-selector/date-selector';
import { useUrl } from './variables';
import { UrlSelector } from './components/url-selector/url-selector';

function App() {
    const [count, setCount] = useState(0);
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());
    const [url, setUrl] = useUrl();

    if (url === '') {
        return (
            <div className={styles.App}>
                <Header resetUrl={() => setUrl('')} />
                <UrlSelector updateUrl={(newUrl: string) => setUrl(newUrl)} />
            </div>
        );
    } else {
        return (
            <div className={styles.App}>
                <Header resetUrl={() => setUrl('')} />
                <DateSelector updateSelectedDateTime={setSelectedDateTime} />
                <ActicityOverview selectedDateTime={selectedDateTime} url={url} />
            </div>
        );
    }
}

export default App;
