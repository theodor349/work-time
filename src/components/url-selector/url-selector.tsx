import { useState } from 'react';
import classNames from 'classnames';
import TextField from '@mui/material/TextField';
import styles from './url-selector.module.scss';

export interface UrlSelectorProps {
    className?: string;
    updateUrl: (newUrl: string) => void;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const UrlSelector = ({ className, updateUrl }: UrlSelectorProps) => {
    const [url, setUrl] = useState('');

    return (
        <div className={styles.root}>
            <div className={styles['url-container']}>
                <TextField 
                    id="outlined-basic" 
                    label="Sheet URL" 
                    variant="outlined" 
                    value={url}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        setUrl(event.target.value);
                    }}
                />
                <button onClick={() => updateUrl(url)}>Update</button>
            </div>
            <div>
                <p>Instruction on how to set this up, can be found on <a href="https://github.com/theodor349/work-time">GitHub</a></p>
            </div>
        </div>
    );
};
