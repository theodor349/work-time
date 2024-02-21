import { createBoard } from '@wixc3/react-board';
import { DateSelector } from '../../../components/date-selector/date-selector';

export default createBoard({
    name: 'DateSelector',
    Board: () => <DateSelector />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 409,
        windowWidth: 1028,
    },
});
