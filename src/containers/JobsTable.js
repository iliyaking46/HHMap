import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ReactPaginate from 'react-paginate';
import { loader } from '../helpers';
import { loadData, loadPage, changeVacanciesPage } from '../actions/table';
import { changePage } from '../actions/main';

class JobsTable extends Component {
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
    const data  = table.get('data');
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
    const currPage = data.size > 0
      ? data.find(item => item.get('page') === page)
      : 0
    if (!isLoadData) {
      return 'А ты поиск сначала сделай!';
    }
    return isLoad && currPage ? (
      <div className="mt-3">
        <h2 className="text-center">Найдено {found} вакансий</h2>
        <table className="table table-bordered">
          <thead>
            <tr className="thead-light">
              <th>Название</th>
              <th>Работодатель</th>
              <th>Зарплата от</th>
              <th>Зарплата до</th>
              <th>Создана</th>
            </tr>
          </thead>
          <tbody>
            {currPage.get('items').map(item => (
              <tr key={item.get('id')}>
                <td>
                  <Link to={`vacancies/${item.get('id')}`}>{item.get('name')}</Link>
                </td>
                <td>{item.getIn(['employer', 'name'])}</td>
                <td>
                  {(item.get('salary') &&
                    item.getIn(['salary', 'from']) &&
                    `от ${item.getIn(['salary', 'from'])} ${item.getIn(['salary', 'currency'])}`) ||
                    'не указана'}
                </td>
                <td>
                  {(item.get('salary') &&
                    item.getIn(['salary', 'to']) &&
                    `до ${item.getIn(['salary', 'to'])} ${item.getIn(['salary', 'currency'])}`) ||
                    'не указана'}
                </td>
                <td>{new Date(item.get('created_at')).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="justify-content-center">
          <ReactPaginate
            previousLabel={'Назад'}
            nextLabel={'Далее'}
            disableInitialCallback
            breakLabel={<button className="page-link">...</button>}
            breakClassName={'page-item'}
            pageCount={pages}
            initialPage={page}
            marginPagesDisplayed={2}
            pageRangeDisplayed={5}
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
      loader
    );
  }
}
export default connect(
  state => ({
    table: state.get('table'),
    app: state.get('app'),
  }),
  { loadData, loadPage, changePage, changeVacanciesPage },
)(JobsTable);
