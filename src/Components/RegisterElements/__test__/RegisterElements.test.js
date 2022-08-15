import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import '@testing-library/jest-dom';
import Register from '../RegisterElements';
import { LoginPageContext } from '../../../Helper/LoginPageContext/LoginPageProvider';


const mockedFunction= jest.fn();
const setIsRegister= jest.fn();
const setError= jest.fn();
const setRegisterUserName= jest.fn();
const setRegisterPassword= jest.fn();
const setRegisterEmail= jest.fn();


describe('Register', () => {

    beforeEach(() => {
        // eslint-disable-next-line testing-library/no-render-in-setup
        render(<LoginPageContext.Provider value={{setRegisterUserName, setRegisterPassword, setIsRegister, setRegisterEmail,  setError}}>
            <Register RegisterUser={mockedFunction}/></LoginPageContext.Provider>);
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
    describe('Username Input Element', () => {
        it('should render', () => {
            expect(screen.getByPlaceholderText(/Name.../i)).toBeInTheDocument();
        })
        it('should be empty by default', () => {
            expect(screen.getByPlaceholderText(/Name.../i).value).toBe('');
        })
        it('should be able to type', () => {
            userEvent.type(screen.getByPlaceholderText(/Name.../i), 'Password');
            expect(screen.getByPlaceholderText(/Name.../i).value).toBe('Password')
        })
    })

    describe('Submit Button', () => {
        it('should render', () => {
            expect(screen.getByRole('button', {name: /Submit/i})).toBeInTheDocument();
        })
        it('should run RegisterUser function onClick', () => {
            userEvent.click(screen.getByRole('button', {name: /Submit/i}));
            expect(mockedFunction).toBeCalled();
        })          
    })

    describe('Login Here Button', () => {
        it('should render', () => {
            expect(screen.getByRole('button', {name: /Login Here/i})).toBeInTheDocument();
        })
        it('should call setIsRegister function onClick', () => {
            userEvent.click(screen.getByRole('button', {name: /Login Here/i}));
            expect(setIsRegister).toBeCalled();
            expect(setError).toBeCalled();
        })
    })
})