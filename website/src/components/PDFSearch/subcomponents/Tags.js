import React from 'react'
import { onQueryChanged } from 'react-searchkit'
import { Button } from 'semantic-ui-react'

const Tags = ({ tags }) => {
  const click = (event, tag) => {
    onQueryChanged({
      searchQuery: { filters: ['tags_aggregation', tag], page: 1 }
    })
    event.preventDefault()
  }

  return tags.map((tag, index) => (
    <Button key={index} size='mini' onClick={event => click(event, tag)}>
      {tag}
    </Button>
  ))
}

export default Tags
