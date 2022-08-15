import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Comments from '../Comments';

const comment = {
    userName: 'Name',
    Text: 'Text',
};

const mockedFunction= jest.fn();

describe('Comments', () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<Comments comment={comment} deleteComment={mockedFunction}/>);
    })


    describe('CommentsContainer', () => {
        it('userName should render', () => {
            expect(screen.getByText(/name/i)).toBeInTheDocument();
        })
        
        it('Text should render', () => {
            expect(screen.getByText(/text/i)).toBeInTheDocument();
        })
    })

    describe('Delete Button', () => {
        it('Should render', () => {
                expect(screen.getByTestId('deleteButton')).toBeInTheDocument();
        })
       
        it('Should run deleteComment function onClick', () => {
                userEvent.click(screen.getByTestId('deleteButton'));
                expect(mockedFunction).toBeCalled();
        })

    })
})