import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import LoginElements from '../LoginElements';
import { LoginPageContext } from '../../../Helper/LoginPageContext/LoginPageProvider';


const mockedFunction= jest.fn();
const setIsRegister= jest.fn();
const setError= jest.fn();
const setLoginEmail= jest.fn();
const setLoginPassword= jest.fn();
describe('LoginElements', () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<LoginPageContext.Provider value={{setError, setIsRegister, setLoginEmail, setLoginPassword}}>
            <LoginElements LoginUser={mockedFunction}/></LoginPageContext.Provider>);
    })


    describe('Email Input Element', () => {
        it('should render', () => {
            expect(screen.getByPlaceholderText(/Email.../i)).toBeInTheDocument();
        })
        it('should be empty by default', () => {
            expect(screen.getByPlaceholderText(/Email.../i).value).toBe('');
        })
        it('should be able to type', () => {
            userEvent.type(screen.getByPlaceholderText(/Email.../i), 'Email');
            expect(screen.getByPlaceholderText(/Email.../i).value).toBe('Email')
        })
    })
    describe('Password Input Element', () => {
        it('should render', () => {
            expect(screen.getByPlaceholderText(/Password.../i)).toBeInTheDocument();
        })
        it('should be empty by default', () => {
            expect(screen.getByPlaceholderText(/Password.../i).value).toBe('');
        })
        it('should be able to type', () => {
            userEvent.type(screen.getByPlaceholderText(/Password.../i), 'Password');
            expect(screen.getByPlaceholderText(/Password.../i).value).toBe('Password')
        })
    })

    describe('Login Button', () => {
        it('should render', () => {
            expect(screen.getByRole('button', {name: /Login/i})).toBeInTheDocument();
        })
        it('should run LoginUser function onClick', () => {
            userEvent.click(screen.getByRole('button', {name: /Login/i}));
            expect(mockedFunction).toBeCalled();
        })          
    })

    describe('Register Here Button', () => {
        it('should render', () => {
            expect(screen.getByRole('button', {name: /Register Here/i})).toBeInTheDocument();
        })
        it('should call setIsRegister function onClick', () => {
            userEvent.click(screen.getByRole('button', {name: /Register Here/i}));
            expect(setIsRegister).toBeCalled();
            expect(setError).toBeCalled();
        })
    })
})