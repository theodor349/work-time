import classNames from 'classnames';
import styles from './loading.module.scss';
import { InfinitySpin } from 'react-loader-spinner'

export interface LoadingProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Loading = ({ className }: LoadingProps) => {
    return <div className={classNames(styles.root, className)}>
        <InfinitySpin/>
    </div>;
};
