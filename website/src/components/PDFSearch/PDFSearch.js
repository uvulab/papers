import React from 'react'
import {
  ReactSearchKit,
  SearchBar,
  SortBy,
  SortOrder,
  BucketAggregation,
  Pagination,
  ResultsPerPage,
  ResultsList
} from 'react-searchkit'
import { useDispatch } from 'react-redux'
import { OverridableContext, parametrize } from 'react-overridable'
import { Scrollbar } from 'react-scrollbars-custom'
import {
  CustomBucketAggregation,
  CustomBucketAggregationContainer,
  CustomPaginator,
  CustomResultsList,
  CustomSortBy,
  CustomSortOrder
} from './subcomponents'
import PDFSearchAPI from './PDFSearchAPI'

const sortValues = [
  { text: 'Most Recent', value: 'year' },
  { text: 'Title', value: 'title' }
]

const sortOrderValues = [
  { text: 'Descending', value: 'desc' },
  { text: 'Ascending', value: 'asc' }
]

const searchApi = new PDFSearchAPI()
function PDFSearch() {
  const dispatch = useDispatch()
  const ResultsListWithDispatch = parametrize(CustomResultsList, {
    dispatch
  })
  const overriddenComponents = {
    ResultsList: ResultsListWithDispatch,
    'Pagination.element': CustomPaginator,
    'SortBy.element': CustomSortBy,
    'SortOrder.element': CustomSortOrder,
    'BucketAggregationContainer.element': CustomBucketAggregationContainer,
    'BucketAggregation.element': CustomBucketAggregation
  }
  return (
    <OverridableContext.Provider value={overriddenComponents}>
      <ReactSearchKit searchApi={searchApi} eventListenerEnabled={true}>
        <div style={{ width: '90%', margin: 'auto' }}>
          <div style={{ margin: '10px 0' }}>
            <SearchBar />
          </div>
          <div style={{ display: 'flex', textAlign: 'center' }}>
            <div style={{ flex: 1, width: '100%' }}>
              <SortBy values={sortValues} defaultValue='year' />
            </div>
            <div style={{ flex: 1, width: '100%' }}>
              <SortOrder values={sortOrderValues} defaultValue='desc' />
            </div>
          </div>
          <ResultsPerPage label={() => <></>} />
          <BucketAggregation
            title='Types of Papers'
            agg={{ aggName: 'tags_aggregation' }}
          />
          <Scrollbar style={{ height: 500 }}>
            <ResultsList />
          </Scrollbar>
          <Pagination />
        </div>
      </ReactSearchKit>
    </OverridableContext.Provider>
  )
}

export default PDFSearch
