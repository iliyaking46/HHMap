import React, { useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import ReactPaginate from 'react-paginate';
import { loadData, loadPage, changeVacanciesPage } from '../reducer/table';
import { useAppDispatch, useAppSelector } from '../common/hooks';
import { FAILURE_STATUS, IDLE_STATUS, LOADING_STATUS } from '../common/constants';
import { loader } from '../common/helpers';
import { JobItem } from '../components/JobItem';

const JobsList = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const table = useAppSelector(state => state.table);

  const currentSearch = React.useMemo(() => new URLSearchParams(location.search).toString(), [location.search]);

  useEffect(() => {
    if (currentSearch === table.params) return;

    dispatch(loadData(currentSearch));
  }, [dispatch, currentSearch, table.params]);

  const handlePageClick = ({ selected }: { selected: number }) => {
    const params = currentSearch;
    const { data } = table;
    const isPageLoaded = data.find(item => item.page === selected);
    window.scrollTo(0, 0);
    if (isPageLoaded) {
      dispatch(changeVacanciesPage(selected));
    } else {
      dispatch(loadPage({ params, page: selected }));
    }
  };

  const { status, found, data, page, pages } = table;

  if (status === FAILURE_STATUS) {
    return (
      <div className="text-center mt-4">
        <h4>Ой, ошибочка...</h4>
        <button
          className="btn btn-outline-dark my-3"
          onClick={() => navigate('/')}
        >
          На главную
        </button>
      </div>
    );
  }

  if (status === LOADING_STATUS) {
    return (
      <div className="position-relative" style={{ minHeight: '150px' }}>
        {loader}
      </div>
    );
  }

  if (status === IDLE_STATUS) {
    return <h3 className="text-center my-5">Выполните поиск!</h3>;
  }

  if (!found) {
    return (
      <div className="mt-3">
        <h3 className="text-center">Ууупс.. ничего не найдено</h3>
        <div className="text-center">
          <img src={`${process.env.PUBLIC_URL}/no-jobs.jpg`} alt="no jobs" />
        </div>
      </div>
    );
  }

  const currPage = data.find(item => item.page === page);

  return (
    <div className="mt-3">
      <h3 className="text-center">Найдено {found} вакансий</h3>
      {currPage!.items.map(item => (
        <JobItem item={item} key={item.id} />
      ))}
      <div className="justify-content-center">
        <ReactPaginate
          previousLabel={'«'}
          nextLabel={'»'}
          disableInitialCallback
          breakLabel={<button className="page-link">...</button>}
          breakClassName={'page-item'}
          pageCount={pages}
          initialPage={page}
          marginPagesDisplayed={1}
          pageRangeDisplayed={4}
          onPageChange={handlePageClick}
          containerClassName={'pagination justify-content-center'}
          pageClassName={'page-item'}
          previousClassName={'page-item'}
          nextClassName={'page-item'}
          pageLinkClassName={'page-link'}
          previousLinkClassName={'page-link'}
          nextLinkClassName={'page-link'}
          activeClassName={'active'}
        />
      </div>
    </div>
  );
};


export default JobsList;
