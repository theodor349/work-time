import classNames from 'classnames';
import styles from './activity-timer.module.scss';
import { Activity } from '../../types/activity';

export interface ActivityTimerProps {
    className?: string;
    activity: Activity;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const ActivityTimer = ({
    className,
    activity
}: ActivityTimerProps) => {

    const startActivity = function(): void {
        console.log("Start");
        activity.isActive = !activity.isActive;
    };
    const endActivity = function(): void {
        activity.isActive = !activity.isActive;
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles['activity-title-container']}>
                <div className={styles['activity-idicator-title-container']}>
                    <div
                        className={classNames(
                            styles['activity-indicator'],
                            activity.isActive
                                ? styles['activity-indicator-active']
                                : styles['activity-indicator-inactive']
                        )}
                    />
                    <h3 className={styles['activity-title']}>{activity.name}</h3>
                </div>
                <div className={styles['time-text-container']}>
                    <h3 className={styles['time-text']}>
                        {Math.floor(activity.durationMs / 36e5) + 'h ' + new Date(activity.durationMs).getMinutes() + 'm'}
                    </h3>
                </div>
            </div>
            <div className={styles['button-container']}>
                <button
                    className={classNames(styles['timer-button'], styles['start-button'])}
                    disabled={activity.isActive}
                    onClick={startActivity}
                >
                    Start
                </button>
                <button
                    className={classNames(styles['timer-button'], styles['end-button'])}
                    disabled={!activity.isActive}
                    onClick={endActivity}
                >
                    End
                </button>
            </div>
        </div>
    );
};
