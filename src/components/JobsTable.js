import React from 'react';

export const JobsTable = (props) => {
  const { data } = props;
  const items = data;
  
  return (
    <div className="mt-3" >
      <h2 className="text-center" >Найдено {data.found} вакансий, отображено ({data.per_page})</h2>
      <table className="table table-bordered">
        <thead>
          <tr className="thead-light">
            <th>Название</th>
            <th>Работодатель</th>
            <th>Зарплата от</th>
            <th>Зарплата до</th>
            <th>Создана</th>
            <th>Ссылка</th>
          </tr>
        </thead>
        <tbody>
          {
            items.map(item => {
              return (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.employer.name}</td>
                  <td>
                    {
                      (item.salary != null && item.salary.from != null &&
                      "от "+item.salary.from+" "+item.salary.currency) || 
                      "не указана"
                    }
                  </td>
                  <td>
                    {
                      (item.salary != null && item.salary.to != null &&
                      "до "+item.salary.to+" "+item.salary.currency) || 
                      "не указана"
                    }
                  </td>
                  <td>{new Date(item.created_at).toLocaleString()}</td>
                  <td><a href={item.alternate_url} target='_blank' >Ссылка на вакансию</a></td>
                </tr>
              )
              
            })
          }
        </tbody>
      </table>
    </div>
    
  )
} 

export default JobsTable;
