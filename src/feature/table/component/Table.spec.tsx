import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/extend-expect'

import { Table } from './Table'

describe('Table', () => {
  it('Displays the component given for the grid.', () => {
    const Grid = (): JSX.Element => (
      <rect data-testid='grid' />
    )

    render(<Table grid={Grid} />)

    expect(screen.getByTestId('grid')).toBeInTheDocument()
  })
})
