import { createBoard } from '@wixc3/react-board';
import { Header } from '../../../components/header/header';

export default createBoard({
    name: 'Header',
    Board: () => <Header resetUrl={() => console.log("Reset URL")} />,
    isSnippet: true,
    environmentProps: {
        canvasWidth: 548,
    },
});
