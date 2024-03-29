import { createBoard } from '@wixc3/react-board';
import { Loading } from '../../../components/loading/loading';

export default createBoard({
    name: 'Loading',
    Board: () => <Loading loading={true} size={640} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 1344,
    },
});
