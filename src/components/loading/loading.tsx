import classNames from 'classnames';
import styles from './loading.module.scss';
import { InfinitySpin, Bars } from 'react-loader-spinner';

export interface LoadingProps {
    className?: string;
    size: number;
    loading: boolean;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const Loading = ({ className, size, loading }: LoadingProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <Bars width={size} height={size} visible={loading} />
        </div>
    );
};
