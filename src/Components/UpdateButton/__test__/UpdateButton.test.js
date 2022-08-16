import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import UpdateButton from '../UpdateButton';
import { HomePageProvider } from '../../../Helper/HomePageContexts/HomePageProvider';


jest.mock('../../../redux/redux-hooks')
const post = {id : 1}
const updatedPost = {id:1}


describe('UpdateButton', () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<HomePageProvider><UpdateButton post={post} updatedPost={updatedPost}/></HomePageProvider>);
    })


    describe('UpdateButton', () => {
        it('should render', () => {
            expect(screen.getByTitle(/Update/i)).toBeInTheDocument();
        })

        it('should be enabled by default', () => {
            expect(screen.getByTitle(/Update/i)).toBeEnabled();
        })      
    })
})