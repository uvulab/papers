import React from 'react'
import { Dropdown } from 'semantic-ui-react'

export const CustomSortOrder = ({
  currentSortOrder,
  options,
  onValueChange
}) => {
  const _options = options.map((element, index) => {
    return { key: index, text: element.text, value: element.value }
  })
  return (
    <Dropdown
      selection
      compact
      options={_options}
      value={currentSortOrder}
      onChange={(e, { value }) => onValueChange(value)}
      style={{ width: '100%' }}
    />
  )
}
