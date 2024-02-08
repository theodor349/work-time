import classNames from 'classnames';
import styles from './acticity-overview.module.scss';
import { ActivityTimer } from '../activity-timer/activity-timer';

export interface ActicityOverviewProps {
    className?: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const ActicityOverview = ({ className }: ActicityOverviewProps) => {
    return (
        <div className={classNames(styles.root, className)}>
            <div />
            <div>
                <ActivityTimer activity={{name: "AAU ITS", id: 1, durationMs: 37000000, isActive: false}} />
                <ActivityTimer activity={{name: "Trifork", id: 2, durationMs: 5.832e+7, isActive: true}} />
                <ActivityTimer activity={{name: "Netcompany", id: 2, durationMs: 3720000, isActive: false}} />
            </div>
        </div>
    );
};
