import React from 'react'
import { Item } from 'semantic-ui-react'
import { isEqual } from 'lodash/lang'
import { setPaperId } from 'store/actions'
import Tags from './Tags'

const ResultsListItem = ({ result, index, dispatch }) => {
  return (
    <Item key={index}>
      <Item.Content>
        <Item.Header onClick={() => dispatch(setPaperId(result.paperId))}>
          {result.title}
        </Item.Header>
        <Item.Description>{result.authors}</Item.Description>
        <Item.Extra>
          <Tags tags={result.tags} />
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

const ResultsListContainer = ({ results, dispatch }) => (
  <Item.Group divided relaxed link>
    {results.map((result, index) => (
      <ResultsListItem
        result={result}
        dispatch={dispatch}
        index={index}
        key={index}
      />
    ))}
  </Item.Group>
)

export class CustomResultsList extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    const { results: currentResults } = this.props
    const { results: nextResults } = nextProps
    if (currentResults.length !== nextResults.length) return true
    const rerender = currentResults.some(
      (result, index) => !isEqual(result, nextResults[index])
    )
    return rerender
  }
  render() {
    const { dispatch, loading, totalResults, results } = this.props
    return totalResults > 0 ? (
      <ResultsListContainer results={results} dispatch={dispatch} />
    ) : null
  }
}
