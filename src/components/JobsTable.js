import React from 'react';

export const JobsTable = (props) => {
  const { data } = props;
  const items = [].slice.call(data.items)
  console.log(data);
  console.log(data.items);
  
  return (
    <div className="mt-3" >
      <h2 className="text-center" >Найдено {data.found} вакансий (макс. 10)</h2>
      <table className="table table-bordered">
        <thead>
          <tr className="thead-light">
            <th>Название</th>
            <th>Работодатель</th>
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
