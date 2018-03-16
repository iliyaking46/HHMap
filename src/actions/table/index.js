import { LOAD_TABLE_DATA, START, SUCCESS, FAIL } from '../../constants';

export function loadData(searchText, searchMetroId) {
  return dispatch => {
    dispatch({
      type: LOAD_TABLE_DATA + START,
      payload: { data: [], isLoadData: false },
    });
    const metro = searchMetroId ? `&metro=${searchMetroId}` : '';
    const text = searchText ? `&text=${searchText.split(' ').join('+')}` : '';
    const baseUrl = `https://api.hh.ru/vacancies?area=1&${text}${metro}`;
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
            isLoadData: true,
            paramOfData: {
              found: data.found,
              page: data.page,
              pages: data.pages,
              address: baseUrl,
              searchText,
              searchMetroId,
            },
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

export function loadPage(paging, decr) {
  return dispatch => {
    dispatch({
      type: LOAD_TABLE_DATA + START,
      payload: { data: [], isLoadData: false },
    });

    const baseUrl = paging.address;
    // console.log(paging);
    fetch(`${baseUrl}&page=${paging.page - decr}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        }
        throw new Error('Something went wrong ...');
      })
      .then(resp =>
        dispatch({
          type: LOAD_TABLE_DATA + SUCCESS,
          payload: {
            data: resp.items,
            isLoadData: true,
            paramOfData: {
              found: paging.found,
              page: paging.page - decr,
              pages: paging.pages,
              address: baseUrl,
            },
          },
        }),
      )
      .catch(error => {
        dispatch({
          type: LOAD_TABLE_DATA + FAIL,
          payload: { error },
        });
      });
  };
}
