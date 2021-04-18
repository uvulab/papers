import { PAPER_LOADING, SET_PAPER_ID } from 'store/types'

export const setPaperId = paperId => ({ type: SET_PAPER_ID, payload: paperId })
export const setPaperLoading = loading => ({
  type: PAPER_LOADING,
  payload: loading
})
