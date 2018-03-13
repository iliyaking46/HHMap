import {
  LOAD_DATA, START, SUCCESS, FAIL
} from '../../constants'

export function loadData(metroId, textSearch, paging) {
  return (dispatch) => {

    dispatch({
      type: LOAD_DATA + START,
      payload: { data: [], isLoadData: false }
    })

    const metro = metroId ? 'metro=' + metroId : '';
    const text = textSearch ? `text=${textSearch.split(' ').join('+')}` : '';
    const addUrl = [metro, text].join('&');
    //   const baseUrl = `https://api.hh.ru/vacancies?area=1&per_page=100&${addUrl}`;
    const baseUrl = `https://api.hh.ru/vacancies?area=1&${addUrl}`;
    //${paging}
    //&page=0&per_page=20
    console.log(paging);

    fetch(`${baseUrl}`)
      .then(resp => {
        if (resp.ok) {
          /*     const hghg = resp.found
               const pagin = 2
               dispatch({
                 type: LOAD_DATA + SUCCESS,
                 payload: { data: resp.reverse().reduce((newArr, nextArr) => [...newArr, ...nextArr], []), isLoadData: true, found: hghg }
                 
               })*/
          return resp.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(resp => {
        //   console.log(resp.pages);
        console.log(resp.found);
        const hghg = resp.found
        const gfgf = resp.pages
        //   const pagin = 2
        const apiPromises = [];
        //     const pages = resp.pages;
        //       for (let i = 0; i < pages; i++) { apiPromises.push(fetch(`${baseUrl}&page=${i}`).then(resp => resp.json().then(resp => resp.errors ? [] : resp.items))) }
        apiPromises.push(fetch(`${baseUrl}&page=${0}`).then(resp => resp.json().then(resp => resp.errors ? [] : resp.items)))
        console.log(`${baseUrl}&page=${paging}`)
        Promise.all(apiPromises).then(data => dispatch({
          type: LOAD_DATA + SUCCESS,
          payload: { data: data.reverse().reduce((newArr, nextArr) => [...newArr, ...nextArr], []), isLoadData: true, paramOfData: { found: hghg, page: paging, pages: gfgf, address: baseUrl } }
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



export function loadPage(paging, decr) {
  return (dispatch) => {

    dispatch({
      type: LOAD_DATA + START,
      payload: { data: [], isLoadData: false }
    })

    const baseUrl = paging.address
    console.log(paging);
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
