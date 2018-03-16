import { createStore, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from 'reducer';

export default function configureStore(initialState = {}) {
  const middlewares = [ReduxThunk];
  const enhancers = [
    applyMiddleware(...middlewares),
    // применяет мидлвеары
  ];
  const composeEnhancers = composeWithDevTools({
    // other compose enhancers if any
    // Specify here other options if needed
  });
  // createStore(rootReducer, composeWithDevTools(applyMiddleware(ReduxThunk)))
  const store = createStore(
    rootReducer,
    initialState,
    composeEnhancers(...enhancers),
  );

  if (module.hot) {
    // Enable Webpack hot module replacement for reducers
    module.hot.accept('../reducer', () => {
      /* eslint-disable global-require */
      const nextReducer = require('../reducer').default;
      store.replaceReducer(nextReducer);
    });
  }

  return store;
}
