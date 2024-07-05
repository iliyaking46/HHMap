import { configureStore } from '@reduxjs/toolkit';
import headerReducer from './reducer/header';
import tableReducer from './reducer/table';
import vacanciesReducer from './reducer/vacancyCard';
import ymapReducer from './reducer/ymap';

export const store = configureStore({
  reducer: {
    header: headerReducer,
    table: tableReducer,
    ymap: ymapReducer,
    vacancies: vacanciesReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch