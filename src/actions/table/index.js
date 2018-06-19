import {
  LOAD_TABLE_DATA,
  LOAD_PAGE_TABLE_DATA,
  CHANGE_VACANCIES_PAGE,
  START,
  SUCCESS,
  FAIL,
} from '../../constants';

export function loadData(params, push) {
  return dispatch => {
    dispatch({
      type: LOAD_TABLE_DATA + START,
      payload: { data: [], isLoad: false, isLoadData: true },
    });
    const baseUrl = `https://api.hh.ru/vacancies${params ? params : '?'}&area=1`;
    fetch(`${baseUrl}`)
      .then(resp => {
        push && push();
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
            params,
          },
        })
      )
      .catch(error =>
        dispatch({
          type: LOAD_TABLE_DATA + FAIL,
          payload: {
            isLoad: true,
            error
          },
        })
      );
  };
}

export function changeVacanciesPage(page) {
  return {
    type: CHANGE_VACANCIES_PAGE,
    payload: { page },
  };
}

export function loadPage(params, page) {
  return dispatch => {
    dispatch({
      type: LOAD_PAGE_TABLE_DATA + START,
      payload: { isLoad: false },
    });
    const baseUrl = `https://api.hh.ru/vacancies${params}&area=1&page=${page}`;
    fetch(`${baseUrl}`)
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
          payload: {
            isLoad: true,
            error
          },
        });
      });
  };
}
