import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CommentPopOver from '../CommentPopOver';

const mockedFunction = jest.fn();

describe('CommentPopOver', () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<CommentPopOver functionality={mockedFunction}/>);
    })

    describe('Send Button', () => {
        it('Should render', () => {
            expect(screen.getByTestId('sendButton')).toBeInTheDocument();
        })
    })

    describe('PopOver', () => {
        it('should not render by default', () => {
            expect(screen.queryByText(/Please Login to Post a Comment/i)).not.toBeInTheDocument();
        })
        it('Clicking Send Button should render PopOver', () => {
            userEvent.click(screen.getByTestId('sendButton'));
            expect(screen.getByText(/Please Login to Post a Comment/i)).toBeInTheDocument();
        })
    })
})