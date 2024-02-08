import { createBoard } from '@wixc3/react-board';
import { ActicityOverview } from '../../../components/acticity-overview/acticity-overview';

export default createBoard({
    name: 'ActivityOverview',
    Board: () => <ActicityOverview />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 2125,
        windowWidth: 430,
        windowHeight: 932,
        canvasHeight: 1003,
    },
});
