import classNames from 'classnames';
import styles from './date-selector.module.scss';
import { useState } from 'react';
import { LocalizationProvider, DateTimePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

export interface DateSelectorProps {
    className?: string;
    updateSelectedDateTime: (date: Date) => void;
}

/**
 * This component was created using Codux's Default new component template.
 * To create custom component templates, see https://help.codux.com/kb/en/article/kb16522
 */
export const DateSelector = ({ className, updateSelectedDateTime }: DateSelectorProps) => {
    const [selected, setSelected] = useState(dayjs());

    return (
        <div className={classNames(styles.root, className)}>
            <div className={styles['date-container']}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateTimePicker 
                        ampm={false} 
                        closeOnSelect 
                        displayWeekNumber 
                        defaultValue={dayjs()}
                        value={selected}
                        onChange={(newValue: dayjs.Dayjs | null) => {
                            if(newValue === null) 
                                return;
                            updateSelectedDateTime(newValue.toDate());
                            setSelected(newValue);
                        }}
                        />
                </LocalizationProvider>
                <button className={styles['url-button']} onClick={() => setSelected(dayjs())}>Reset</button>
            </div>
        </div>
    );
};
