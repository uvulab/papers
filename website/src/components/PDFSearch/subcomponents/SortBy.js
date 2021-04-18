import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export const CustomSortBy = ({ currentSortBy, options, onValueChange }) => {
  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value }
  })
  return (
    <Dropdown
      selection
      compact
      options={_options}
      value={currentSortBy}
      onChange={(e, { value }) => onValueChange(value)}
      style={{ width: '100%' }}
    />
  )
}
