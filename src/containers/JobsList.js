import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { loader } from '../helpers';
import { JobItem } from '../components/JobItem';
import { loadData, loadPage, changeVacanciesPage } from '../actions/table';
import { changePage } from '../actions/main';

class JobsList extends PureComponent {
  static propTypes = {
    app: PropTypes.objectOf(PropTypes.any).isRequired,
    table: PropTypes.objectOf(PropTypes.any).isRequired,
    loadData: PropTypes.func.isRequired,
    changeVacanciesPage: PropTypes.func.isRequired,
    loadPage: PropTypes.func.isRequired,
    changePage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    this.props.changePage('home');
    // этот код для сверки с текущим состоянием, если есть какая
    //  то дата, которая уже была загружена, то не надо грузить еще раз
    const { app } = this.props;
    const searchText = app.get('searchText');
    const searchMetroId = app.get('searchMetroId');
    const { table } = this.props;
    if (
      searchText !== table.get('searchText') ||
      searchMetroId !== table.get('searchMetroId')
    ) {
      this.props.loadData(searchText, searchMetroId);
    }
  }

  handlePageClick = ({ selected }) => {
    const { table } = this.props;
    const address = table.get('address');
    const data = table.get('data');
    const isDownload = data.find(item => item.get('page') === selected);
    window.scrollTo(0, 0);
    if (isDownload) {
      this.props.changeVacanciesPage(selected);
    } else {
      this.props.loadPage(address, selected);
    }
  };

  render() {
    const { table } = this.props;
    const data = table.get('data');
    const isLoadData = table.get('isLoadData');
    const isLoad = table.get('isLoad');
    const found = table.get('found');
    const page = table.get('page');
    const pages = table.get('pages');
    const currPage =
      data.size > 0 ? data.find(item => item.get('page') === page) : 0;
    if (!isLoadData) {
      return <h3 className="text-center my-5">Выполните поиск!</h3>;
    }
    return isLoad && currPage ? (
      <div className="mt-3">
        <h3 className="text-center">Найдено {found} вакансий</h3>

        {currPage
          .get('items')
          .map(item => <JobItem item={item} key={item.get('id')} />)}

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
            onPageChange={this.handlePageClick}
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
    ) : (
      <div className="position-relative" style={{ minHeight: '150px' }}>
        {loader}
      </div>
    );
  }
}
export default connect(
  state => ({
    table: state.get('table'),
    app: state.get('app'),
  }),
  { loadData, loadPage, changePage, changeVacanciesPage },
)(JobsList);
