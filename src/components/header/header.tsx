import classNames from 'classnames';
import styles from './header.module.scss';
import { useUrl } from '../../variables';

export interface HeaderProps {
    className?: string;
    resetUrl: () => void;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Header = ({ className, resetUrl }: HeaderProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles['header-container']}>
                <button className={styles['url-button']} onClick={resetUrl}>Reset URL</button>
                <h2 className={styles['header-text']}>Work Tracker</h2>
            </div>
        </div>
    );
};
