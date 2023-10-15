import React from 'react'
import PrivacyPage from './privacy'

describe('<PrivacyPage />', () => {
  it('renders', () => {
    // see: https://on.cypress.io/mounting-react
    cy.mount(<PrivacyPage />)
  })
})