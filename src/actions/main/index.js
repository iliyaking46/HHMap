import {
  LOAD_DATA, START, SUCCESS, FAIL
} from '../../constants'

export function loadData1(metroId, textSearch) {
  return (dispatch) => {

    dispatch({
      type: LOAD_DATA + START,
      payload: { data: [], isLoadData: false }
    })

    const metro = metroId ? 'metro=' + metroId : '';
    const text = textSearch ? `text=${textSearch.split(' ').join('+')}` : '';
    const addUrl = [metro, text].join('&');
    const baseUrl = `https://api.hh.ru/vacancies?area=1&per_page=100&${addUrl}`;
    console.log(baseUrl);

    let pagesRequired = 0;

    fetch(`${baseUrl}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(resp => {
        console.log(resp, ' найдено вакансий: ', resp.found, '; страниц', resp.pages);
        pagesRequired = resp.pages;
        for (let i = 0; i < pagesRequired; i++) {
          fetch(`${baseUrl}&page=${i}`)
            .then(response => {
              if (response.ok) {
                return response.json();
              } else {
                throw new Error('Something went wrong ...');
              }
            })
            .then(data => dispatch({
              type: LOAD_DATA + SUCCESS,
              payload: { data: [...data.items], isLoadData: true }
            }))
        }
      })
      .catch(error => {
        dispatch({
          type: LOAD_DATA + FAIL,
          payload: { error }
        })
      })
  }
}


export function loadData(metroId, textSearch) {
  return (dispatch) => {

    dispatch({
      type: LOAD_DATA + START,
      payload: { data: [], isLoadData: false }
    })

    const metro = metroId ? 'metro=' + metroId : '';
    const text = textSearch ? `text=${textSearch.split(' ').join('+')}` : '';
    const addUrl = [metro, text].join('&');
    const baseUrl = `https://api.hh.ru/vacancies?area=1&per_page=100&${addUrl}`;
    console.log(baseUrl);

    let pagesRequired = 0;

    fetch(`${baseUrl}`)
      .then(resp => {
        if (resp.ok) {
          return resp.json();
        } else {
          throw new Error('Something went wrong ...');
        }
      })
      .then(resp => {
        console.log(resp.pages);
        const apiPromises = [];
        pagesRequired = resp.pages;
        for (let i = pagesRequired; i > 0; i--) { apiPromises.push(fetch(`${baseUrl}&page=${i}`).then(resp => resp.json().then(resp => resp.errors ? [] : resp.items))) }
        Promise.all(apiPromises).then(data => dispatch({
          type: LOAD_DATA + SUCCESS,
          payload: { data: data.reverse().reduce((newArr, nextArr) => [...newArr, ...nextArr], []), isLoadData: true }
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
