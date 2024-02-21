import { createBoard } from '@wixc3/react-board';
import { UrlSelector } from '../../../components/url-selector/url-selector';

export default createBoard({
    name: 'UrlSelector',
    Board: () => <UrlSelector />,
    isSnippet: true,
    environmentProps: {
        windowWidth: 1024,
    },
});
