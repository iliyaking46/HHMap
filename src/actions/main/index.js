import {LOAD_DATA, START, SUCCESS, FAIL
} from '../../constants'

export function loadData(metroId, textSearch) {
  return (dispatch) => {
    
    dispatch({
        type: LOAD_DATA + START,
        payload: {data: [], isLoadData: false}
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
        console.log('найдено вакансий: ', resp.found, '; страниц', resp.pages);
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
                  payload: {data: [...data.items], isLoadData: true}
              })
            )
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
