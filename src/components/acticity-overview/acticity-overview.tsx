import classNames from 'classnames';
import styles from './acticity-overview.module.scss';
import { ActivityTimer } from '../activity-timer/activity-timer';
import { Loading } from '../loading/loading';
import { useState, useEffect } from 'react';
import { Activity } from '../../types/activity';
import axios from 'axios';

interface IGetRequest {
    activities: Activity[];
}

export interface ActicityOverviewProps {
    className?: string;
    selectedDateTime: Date;
    url: string;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */

export const ActicityOverview = ({ className, selectedDateTime, url }: ActicityOverviewProps) => {
    const [activities, setActivities] = useState<Activity[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');

    useEffect(() => {
        axios
            .get<IGetRequest>(
                `${url}?type=get`
            )
            .then((response) => {
                setActivities(response.data.activities);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setError('An error occurred while fetching data: ' + error.message);
                setLoading(false);
            });
    }, []);

    if(error !== '') {
        return (
            <div className={styles.root}>
                <p>{error}</p>
                <p>Try changing the Sheet URL</p>
            </div>
        );
    }
    else if (loading) {
        return (
            <div className={styles.root}>
                <Loading size={200} loading={true} />
            </div>
        );
    } else {
        return (
            <div className={styles.root}>
                <div />
                <div>
                    {activities.map((activity) => (
                        <ActivityTimer inputActivity={activity} key={activity.id} selectedDateTime={selectedDateTime} url={url} />
                    ))}
                </div>
            </div>
        );
    }
};
