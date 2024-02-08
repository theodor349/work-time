import { createBoard } from '@wixc3/react-board';
import { ActivityTimer } from '../../../components/activity-timer/activity-timer';

export default createBoard({
    name: 'ActivityTimer',
    Board: () => (
        <ActivityTimer
            activity={{ name: 'AAU ITS', id: 1, durationMs: 5.832e7, isActive: false }}
        />
    ),
    isSnippet: true,
    environmentProps: {
        canvasWidth: 904,
        canvasHeight: 5,
    },
});
