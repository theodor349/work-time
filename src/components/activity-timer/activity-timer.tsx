import classNames from 'classnames';
import styles from './activity-timer.module.scss';
import { Activity } from '../../types/activity';
import { useState } from 'react';
import axios from 'axios';
import { Loading } from '../loading/loading';

interface IChangeActivityState {
    activityId: number;
    startActivity: number;
    title: string;
    date: Date;
}

export interface ActivityTimerProps {
    className?: string;
    activity: Activity;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const ActivityTimer = ({ className, activity }: ActivityTimerProps) => {
    const [enabled, setEnabled] = useState(activity.isActive);

    const startActivity = function (): void {
        setEnabled(!enabled);
    };
    const endActivity = function (): void {
        setEnabled(!enabled);
    };

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles['activity-title-container']}>
                <div className={styles['activity-idicator-title-container']}>
                    <div
                        className={classNames(
                            styles['activity-indicator'],
                            enabled
                                ? styles['activity-indicator-active']
                                : styles['activity-indicator-inactive']
                        )}
                    />
                    <h3 className={styles['activity-title']}>{activity.name}</h3>
                    <Loading size={16} />
                </div>
                <div className={styles['time-text-container']}>
                    <h3 className={styles['time-text']}>
                        {Math.floor(activity.durationMs / 36e5) +
                            'h ' +
                            new Date(activity.durationMs).getMinutes() +
                            'm'}
                    </h3>
                </div>
            </div>
            <div className={styles['button-container']}>
                <button
                    className={classNames(styles['timer-button'], styles['start-button'])}
                    disabled={enabled}
                    onClick={startActivity}
                >
                    Start
                </button>
                <button
                    className={classNames(styles['timer-button'], styles['end-button'])}
                    disabled={!enabled}
                    onClick={endActivity}
                >
                    End
                </button>
            </div>
        </div>
    );
};
