import { createBoard } from '@wixc3/react-board';
import { ActivityTimer } from '../../../components/activity-timer/activity-timer';
import { Activity } from '../../../types/activity';

const act: Activity = { name: 'AAU ITS', id: 1, durationMs: 5.832e7, isActive: false };

export default createBoard({
    name: 'ActivityTimer',
    Board: () => (
        <ActivityTimer selectedDateTime={new Date(Date.now())} url=''
            inputActivity={act}
        />
    ),
    isSnippet: true,
    environmentProps: {
        canvasWidth: 904,
        canvasHeight: 5,
    },
});
