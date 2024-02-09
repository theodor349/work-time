import { createBoard } from '@wixc3/react-board';
import { Loading } from '../../../components/loading/loading';

export default createBoard({
    name: 'Loading',
    Board: () => <Loading size={640} />,
    isSnippet: true,
});
