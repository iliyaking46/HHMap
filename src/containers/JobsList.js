import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { loader } from '../helpers';
import { JobItem } from '../components/JobItem';
import { loadData, loadPage, changeVacanciesPage } from '../actions/table';

class JobsList extends PureComponent {
  static propTypes = {
    table: PropTypes.objectOf(PropTypes.any).isRequired,
    location: PropTypes.objectOf(PropTypes.any).isRequired,
    loadData: PropTypes.func.isRequired,
    changeVacanciesPage: PropTypes.func.isRequired,
    loadPage: PropTypes.func.isRequired,
  };

  componentDidMount() {
    const params = this.props.location.search;
    const { table } = this.props;
    if (params !== table.get('params') && !table.get('isLoadData')) {
      // console.log(params, this.props.table.get('params'), 'from mount');
      this.props.loadData(params);
    }
  }

  handlePageClick = ({ selected }) => {
    const { table } = this.props;
    const params = this.props.location.search;
    const data = table.get('data');
    const isDownload = data.find(item => item.get('page') === selected);
    window.scrollTo(0, 0);
    if (isDownload) {
      this.props.changeVacanciesPage(selected);
    } else {
      this.props.loadPage(params, selected);
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
  }),
  { loadData, loadPage, changeVacanciesPage },
)(JobsList);
