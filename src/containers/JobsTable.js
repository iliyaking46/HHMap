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
            {currPage.items.map(item => (
              <tr key={item.id}>
                <td>
                  <Link to={`vacancies/${item.id}`}>{item.name}</Link>
                </td>
                <td>{item.employer.name}</td>
                <td>
                  {(item.salary != null &&
                    item.salary.from != null &&
                    `от ${item.salary.from} ${item.salary.currency}`) ||
                    'не указана'}
                </td>
                <td>
                  {(item.salary != null &&
                    item.salary.to != null &&
                    `до ${item.salary.to} ${item.salary.currency}`) ||
                    'не указана'}
                </td>
                <td>{new Date(item.created_at).toLocaleString()}</td>
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
    table: state.table,
    app: state.app,
  }),
  { loadData, loadPage, changePage, changeVacanciesPage },
)(JobsTable);
