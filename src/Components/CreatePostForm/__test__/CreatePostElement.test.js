import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import CreatePostElmnts from '../CreatePostElmnts';
import { CreatePostProvider } from '../../../Helper/CreatePostContext/CreatePostProvider';

const mockedCreatePostButtonClick = jest.fn();
const mockedCancel = jest.fn();

describe('CreatePostElmnts', () => {
    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<CreatePostProvider><CreatePostElmnts CreatePostButtonClick={mockedCreatePostButtonClick} Cancel={mockedCancel}/></CreatePostProvider>);
    })
    
    describe('Title Input Element', () => {
        it('should render', () => {
            expect(screen.getByPlaceholderText(/Title../i)).toBeInTheDocument();
        })
        it('should be empty by default', () => {
            expect(screen.getByPlaceholderText(/Title../i).value).toBe('');
        })
        it('should be able to type', () => {
            const titleInput = screen.getByPlaceholderText(/Title../i);
            userEvent.type(titleInput, 'title');
            expect(titleInput.value).toBe('title');
        })
    })

    describe('Post Input Element', () => {
        it('should render', () => {
            expect(screen.getByPlaceholderText(/Post.../i)).toBeInTheDocument();
        })
        it('should be empty by default', () => {
            expect(screen.getByPlaceholderText(/Post.../i).value).toBe('');
        })
        it('should be able to type', () => {
            const postInput = screen.getByPlaceholderText(/Post.../i);
            userEvent.type(postInput, 'post');
            expect(postInput.value).toBe('post');
        })
    })

    describe('Submit Button', () => {
        it('should render', () => {
            expect(screen.getByRole('button', {name: /Submit Post/i})).toBeInTheDocument();
        })
        it('should be disabled by default', () => {
            expect(screen.getByRole('button', {name: /Submit Post/i})).toBeDisabled();
        })
        it('should be enabled after giving Titlte and Post', () => {
            userEvent.type(screen.getByPlaceholderText(/Title../i), 'title');
            userEvent.type(screen.getByPlaceholderText(/Post.../i), 'post'); 
            expect(screen.getByRole('button', {name: /Submit Post/i})).toBeEnabled();
        })
        it('should run createPost function onClick', () => {
            userEvent.type(screen.getByPlaceholderText(/Title../i), 'title');
            userEvent.type(screen.getByPlaceholderText(/Post.../i), 'post'); 
            userEvent.click(screen.getByRole('button', {name: /Submit Post/i}));
            expect(mockedCreatePostButtonClick).toBeCalled();
        })
    })

    describe('Cancel Button', () => {
        it('should render', () => {
            expect(screen.getByRole('button', {name: /Cancel/i})).toBeInTheDocument();
        })
        it('should be enabled by default', () => {
            expect(screen.getByRole('button', {name: /Cancel/i})).toBeEnabled();
        })
        it('should run Cancel function onClick', () => {
            userEvent.click(screen.getByRole('button', {name: /Cancel/i}));
            expect(mockedCancel).toBeCalled();
        })
    })

})

