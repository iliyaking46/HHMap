import React from 'react';
import { Link } from 'react-router-dom';
import { VacancyItem } from '../reducer/table';


export const JobItem = ({ item }: { item: VacancyItem }) => (
  <div className="card mb-3">
    <div className="card-body">
      {item.employer?.logo_urls && (
        <img
          src={item.employer?.logo_urls?.['90']}
          className="float-right vacancy-sm-icon"
          alt={item.employer?.name}
        />
      )}
      <h5 className="card-title">
        <Link to={`/vacancy/${item.id}`} className="card-link">
          {item.name}
        </Link>
      </h5>
      <h6 className="card-subtitle mb-2 text-muted mb-3 mt-2">
        {item.employer?.name}
        {item.address && item.address?.metro
          ? `, ${item.address?.metro?.station_name}`
          : ''}
      </h6>
      <h6 className="card-subtitle mb-2 text-muted">
        {`З/п ${
          item.salary
            ? (item.salary?.from ? `от ${item.salary?.from} ` : '') +
            (item.salary?.to ? `до ${item.salary?.to} ` : '') +
            item.salary?.currency
            : 'не указана'
        }`}
      </h6>
      {item.snippet && <p
        className="card-text"
        dangerouslySetInnerHTML={{
          __html:
            item.snippet.requirement && window.innerWidth < 768
              ? `${item.snippet?.requirement.substring(0, 70)}...`
              : item.snippet?.requirement,
        }}
      />}
      {item.snippet && <p
        className="card-text"
        dangerouslySetInnerHTML={{
          __html:
            item.snippet.responsibility && window.innerWidth < 768
              ? `${item.snippet?.responsibility.substring(0, 70)}...`
              : item.snippet?.responsibility,
        }}
      />}
    </div>
  </div>
);
