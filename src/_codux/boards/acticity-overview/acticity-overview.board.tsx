import { createBoard } from '@wixc3/react-board';
import { ActicityOverview } from '../../../components/acticity-overview/acticity-overview';
import dayjs from 'dayjs';

const date = new Date(Date.now());

export default createBoard({
    name: 'ActivityOverview',
    Board: () => <ActicityOverview url='' selectedDateTime={date} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 502,
        windowWidth: 1024,
        windowHeight: 768,
        canvasHeight: 1003,
    },
});
