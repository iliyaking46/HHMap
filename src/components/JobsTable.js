// import React from 'react';
import { Link } from "react-router-dom";
import React, { Component } from 'react';
import { connect } from 'react-redux';

import { loadPage } from '../actions/main'

// export const JobsTable = ({ data, paramOfData }) => {
  
class JobsTable extends Component {

  paginFunc = () => {
    if (this.props.paramOfData.page == 1) {
      let df = this.props.paramOfData
      return <button onClick={() => this.props.loadPage(df, 0)}>Дальше</button>
              //  this.props.loadPage(this.props.paramOfData.address, df.page)
    } else if (this.props.paramOfData.page == this.props.paramOfData.pages) {
      let df = this.props.paramOfData
          return <button onClick={() => this.props.loadPage(df, 2)}>Назад</button>

    } else {
        let df = this.props.paramOfData
        return (
          <div>
            <button onClick={() => this.props.loadPage(df, 2)}>Назад</button>
            <button  onClick={() => this.props.loadPage(df, 0)}>Дальше</button>
          </div>
        )
    }
      
    }

  render() {
    return (
      <div className="mt-3" >
        <h2 className="text-center" >Найдено {this.props.paramOfData.found} вакансий</h2>
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
            {
              this.props.data.map(item => {
                return (
                  <tr key={item.id}>
                    <td><Link to={`vacancies/${item.id}`}>{item.name}</Link></td>
                    <td>{item.employer.name}</td>
                    <td>
                      {
                        (item.salary != null && item.salary.from != null &&
                        `от ${item.salary.from} ${item.salary.currency}`) || 
                        'не указана'
                      }
                    </td>
                    <td>
                      {
                        (item.salary != null && item.salary.to != null &&
                        `до ${item.salary.to} ${item.salary.currency}`) || 
                        'не указана'
                      }
                    </td>
                    <td>{new Date(item.created_at).toLocaleString()}</td>
                  </tr>
                )
              })
            }
          </tbody>
        </table>
        <div>
          {
            this.paginFunc()
            }
        </div>
      </div>
    )
  } 
}

// export default JobsTable;

export default connect(state => ({
  table: state,
}), { loadPage })(JobsTable)
