import {
  LOAD_TABLE_DATA,
  LOAD_PAGE_TABLE_DATA,
  CHANGE_VACANCIES_PAGE,
  START,
  SUCCESS,
  FAIL,
} from '../../constants';

export function loadData(searchText, searchMetroId) {
  return dispatch => {
    dispatch({
      type: LOAD_TABLE_DATA + START,
      payload: { data: [], isLoad: false, isLoadData: true },
    });
    const metro = searchMetroId ? `&metro=${searchMetroId}` : '';
    const text = searchText ? `&text=${searchText.split(' ').join('+')}` : '';
    const baseUrl = `https://api.hh.ru/vacancies?area=1${text}${metro}`;
    fetch(`${baseUrl}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(data =>
        dispatch({
          type: LOAD_TABLE_DATA + SUCCESS,
          payload: {
            data: data.items,
            isLoad: true,
            isLoadData: true,
            found: data.found,
            page: data.page,
            pages: data.pages,
            address: baseUrl,
            searchText,
            searchMetroId,
          },
        }),
      )
      .catch(error =>
        dispatch({
          type: LOAD_TABLE_DATA + FAIL,
          payload: { error },
        }),
      );
  };
}

export function changeVacanciesPage(page) {
  return {
    type: CHANGE_VACANCIES_PAGE,
    payload: { page },
  };
}

export function loadPage(address, page) {
  return dispatch => {
    dispatch({
      type: LOAD_PAGE_TABLE_DATA + START,
      payload: { isLoad: false },
    });

    const baseUrl = address;
    // console.log(paging);
    fetch(`${baseUrl}&page=${page}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(resp =>
        dispatch({
          type: LOAD_PAGE_TABLE_DATA + SUCCESS,
          payload: {
            data: resp.items,
            isLoad: true,
            page,
          },
        }),
      )
      .catch(error => {
        dispatch({
          type: LOAD_PAGE_TABLE_DATA + FAIL,
          payload: { error },
        });
      });
  };
}
