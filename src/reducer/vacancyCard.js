import { LOAD_VACANCY, START, SUCCESS, FAIL } from '../constants'

const initialState = {
  vacancies: [],
  isLoad: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOAD_VACANCY + START:
      return { ...state, isLoad: payload.isLoad }

    case LOAD_VACANCY + SUCCESS:
      return { ...state, vacancies: [...state.vacancies, payload.vacancy], isLoad: payload.isLoad }

    case LOAD_VACANCY + FAIL:
      return { ...state, isLoad: payload.isLoad }

    default:
      return state
  }
}
