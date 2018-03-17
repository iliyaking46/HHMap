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
    const { searchText, searchMetroId } = this.props.app;
    if (
      searchText !== this.props.table.searchText ||
      searchMetroId !== this.props.table.searchMetroId
    ) {
      this.props.loadData(searchText, searchMetroId);
    }
  }

  handlePageClick = ({ selected }) => {
    const { address, data } = this.props.table;
    const isDownload = data.find(item => item.page === selected);
    window.scrollTo(0, 0);
    if (isDownload) {
      this.props.changeVacanciesPage(selected);
    } else {
      this.props.loadPage(address, selected);
    }
  };

  render() {
    const { data, isLoadData, isLoad, found, page, pages } = this.props.table;
    const currPage = data.find(item => item.page === page);
    if (!isLoadData) {
      return 'А ты поиск сначала сделай!';
    }
    return isLoad && currPage ? (
      <div className="mt-3">
        <h3 className="text-center">Найдено {found} вакансий</h3>

        {currPage.items.map(item => <JobItem item={item} key={item.id} />)}

        {/* <td>{new Date(item.created_at).toLocaleString()}</td>
          */}
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
    table: state.table,
    app: state.app,
  }),
  { loadData, loadPage, changePage, changeVacanciesPage },
)(JobsList);
