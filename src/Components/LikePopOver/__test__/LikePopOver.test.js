import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LikePopOver from '../LikePopOver';


describe('LikePopOver', () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<LikePopOver/>);
    })


    describe('ThumbUpOffAltIcon', () => {
        it('should render', () => {
            expect(screen.getByTestId(/ThumbUpOffAltIcon/i)).toBeInTheDocument();
        })
        
    })
    describe('LikePopOver', () => {
        it('should not render by default', () => {
            expect(screen.queryByText(/Please Login to Like a Post/i)).not.toBeInTheDocument();
        })
        
        it('should render when clicking ThumbUpOffAltIcon', () => {
            userEvent.click(screen.getByTestId(/ThumbUpOffAltIcon/i));
            expect(screen.getByText(/Please Login to Like a Post/i)).toBeInTheDocument();
        })
        
    })
})