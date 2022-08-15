import {LoginPageProvider, LoginPageContext} from '../LoginPageProvider'
import '@testing-library/jest-dom'
import { render, screen} from '@testing-library/react'

describe('LoginPageContext State Values', () => {
    it('isRegister should be false as default', () => {
        render(<LoginPageProvider>
            <LoginPageContext.Consumer>
                {
                    value => <span>is Edit Section : {value.isRegister.toString()}</span>
                }
            </LoginPageContext.Consumer>
        </LoginPageProvider>)
        const IsRegister = screen.getByText(/is Edit Section : false/i)
        expect(IsRegister).toBeTruthy()
    })
    
})