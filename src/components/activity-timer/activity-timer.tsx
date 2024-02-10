import classNames from 'classnames';
import styles from './activity-timer.module.scss';
import { Activity } from '../../types/activity';
import { useState } from 'react';
import axios from 'axios';
import { Loading } from '../loading/loading';
import { url } from '../../variables';

interface IChangeActivityState {
    activityId: number;
    startActivity: boolean;
    endActivity: boolean;
    date: Date;
}

interface IPostResponse {
    success: boolean;
}

export interface ActivityTimerProps {
    className?: string;
    inputActivity: Activity;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const ActivityTimer = ({ className, inputActivity }: ActivityTimerProps) => {
    const [activity, setActivity] = useState(inputActivity);
    const [enabled, setEnabled] = useState(activity.isActive);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string>('');

    const getDate = function (): string {
        const date = new Date();
        return date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + " " + date.getHours() + "." + date.getMinutes() + "." + date.getSeconds();
    }

    const startActivity = function (): void {
        setLoading(true);
        axios
            .get<IPostResponse>(
                `${url}?type=post&activityId=${activity.id}&startActivity=true&endActivity=false&date=${getDate()}`,
            )
            .then((response) => {
                if(response.data.success){
                    setEnabled(true);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError('An error occurred while fetching data: ' + error.message);
                setLoading(false);
            });
    };
    const endActivity = function (): void {
        setLoading(true);
        axios
            .get<IPostResponse>(
                `${url}?type=post&activityId=${activity.id}&startActivity=false&endActivity=true&date=${getDate()}`,
            )
            .then((response) => {
                if(response.data.success){
                    setEnabled(false);
                }
                setLoading(false);
                updateActivity();
            })
            .catch((error) => {
                console.log(error);
                setError('An error occurred while fetching data: ' + error.message);
                setLoading(false);
            });
    };

    const updateActivity = function (): void {
        setLoading(true);
        axios
            .get<Activity>(
                `${url}?type=getone&activityId=${activity.id}`
            )
            .then((response) => {
                console.log('Data: ' + response.data.durationMs);
                setActivity(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError('An error occurred while fetching data: ' + error.message);
                setLoading(false);
            });
    }

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
                        <Loading size={16} loading={loading} />
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
