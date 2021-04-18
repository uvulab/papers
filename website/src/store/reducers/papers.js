import { SET_PAPER_ID, PAPER_LOADING } from 'store/types'

const initialState = {
  paperId: '1T7AECPwBRKSxCSIr311rXsS8Hlfg3ILz',
  paperLoading: true
}
export function paperIdReducer(state = initialState, action) {
  switch (action.type) {
    case SET_PAPER_ID:
      return {
        ...state,
        paperId: action.payload,
        paperLoading: state.paperId !== action.payload
      }
    case PAPER_LOADING:
      return { ...state, paperLoading: action.payload }
    default:
      return state
  }
}
