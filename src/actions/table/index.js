import {
  LOAD_DATA, START, SUCCESS, FAIL
} from '../../constants'

export function loadData(searchText, searchMetroId) {
  return (dispatch) => {

    dispatch({
      type: LOAD_DATA + START,
      payload: { data: [], isLoadData: false }
    })

    const metro = searchMetroId ? '&metro=' + searchMetroId : '';
    const text = searchText ? `&text=${searchText.split(' ').join('+')}` : '';
    const baseUrl = `https://api.hh.ru/vacancies?area=1&${text}${metro}`;
    fetch(`${baseUrl}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(data => {
        console.log(data);
        return dispatch({
          type: LOAD_DATA + SUCCESS,
          payload: { data: data.items, isLoadData: true, paramOfData: { found: data.found, page: data.page, pages: data.pages, address: baseUrl } }
        })
        //       for (let i = 0; i < pages; i++) { apiPromises.push(fetch(`${baseUrl}&page=${i}`).then(resp => resp.json().then(resp => resp.errors ? [] : resp.items))) }
        // apiPromises.push(fetch(`${baseUrl}&page=${0}`).then(resp => resp.json().then(resp => resp.errors ? [] : resp.items)))


        // Promise.all(apiPromises).then(data => dispatch({
        //   type: LOAD_DATA + SUCCESS,
        //   payload: { data: data.reverse().reduce((newArr, nextArr) => [...newArr, ...nextArr], []), isLoadData: true, paramOfData: { found: hghg, page: paging, pages: gfgf, address: baseUrl } }
        // })
        // )
      })
      .catch(error => {
        return dispatch({
          type: LOAD_DATA + FAIL,
          payload: { error }
        })
      })
  }
}

export function loadPage(paging, decr) {
  return (dispatch) => {

    dispatch({
      type: LOAD_DATA + START,
      payload: { data: [], isLoadData: false }
    })

    const baseUrl = paging.address
    // console.log(paging);
    fetch(`${baseUrl}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(resp => {
        //    console.log(resp.found);
        const hghg = resp.found

        const apiPromises = [];
        apiPromises.push(fetch(`${baseUrl}&page=${paging.page - decr}`).then(resp => resp.json().then(resp => resp.errors ? [] : resp.items)))
        console.log('fffffffffffffffffffffffffffffffffffffffffffffffff', `${baseUrl}&page=${paging.page - decr}`)
        //  paging = paging + 1
        Promise.all(apiPromises).then(data => dispatch({
          type: LOAD_DATA + SUCCESS,
          payload: { data: data.reverse().reduce((newArr, nextArr) => [...newArr, ...nextArr], []), isLoadData: true, paramOfData: { found: hghg, page: paging.page - decr, pages: paging.pages, address: baseUrl } }
        })
        )
      })
      .catch(error => {
        dispatch({
          type: LOAD_DATA + FAIL,
          payload: { error }
        })
      })
  }
}
