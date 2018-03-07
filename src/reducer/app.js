import { 
  LOAD_DATA, 
  START, 
  SUCCESS, 
  FAIL 
} from '../constants'

const initialState = {
  data: [], //вакансии
  isLoadData: true,
}


export default (state = initialState, action) => {
  const { type, payload } = action

  switch (type) {
      case LOAD_DATA + START:
          return {data: payload.data, isLoadData: payload.isLoadData}

      case LOAD_DATA + SUCCESS:
          return {data: [...state.data, ...payload.data], isLoadData: payload.isLoadData}

      case LOAD_DATA + FAIL:
          return {...state, isLoad: false}

      default: return state;
  }
}