import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Map from './Map';
import { loader } from '../common/helpers';
import { loadVacancy } from '../reducer/vacancyCard';
import { FAILURE_STATUS, LOADING_STATUS } from '../common/constants';
import { useAppDispatch, useAppSelector } from '../common/hooks';

const VacancyPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { vacanciesList: vacancies, status } = useAppSelector(state => state.vacancies);
  const vacancy = vacancies.find(item => item.id === id);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!vacancy && id) {
      dispatch(loadVacancy(id));
    }
  }, [dispatch, id, vacancy]);

  if (status === LOADING_STATUS) {
    return (
      <div className="position-relative" style={{ minHeight: '150px' }}>
        {loader}
      </div>
    );
  }

  if (status === FAILURE_STATUS || !vacancy) {
    return (
      <div className="text-center my-3">
        <h4>Ошибка, что-то пошло не так...</h4>
        <button
          className="btn btn-outline-dark my-3"
          onClick={() => navigate('/')}
        >
          На главную
        </button>
      </div>
    );
  }

  return (
    <div className="mb-5">
      <h3>{vacancy.name}</h3>
      {vacancy.employer?.logo_urls && (
        <img
          src={vacancy.employer?.logo_urls?.original}
          className="float-sm-right"
          style={{ maxWidth: '200px' }}
          alt={vacancy.name}
        />
      )}
      <p>
        {vacancy.key_skills.map(skill => (
          <span key={skill.name} className="badge badge-success mr-2">
            {skill.name}
          </span>
        ))}
      </p>
      <p>
        {`З/п ${
          vacancy.salary
            ? (vacancy.salary?.from ? `от ${vacancy.salary?.from} ` : '') +
            (vacancy.salary?.to ? `до ${vacancy.salary?.to} ` : '') +
            vacancy.salary?.currency
            : 'не указана'
        }`}
      </p>
      <p dangerouslySetInnerHTML={{ __html: `${vacancy.description}` }} />
      {vacancy.address && vacancy.address?.lat && vacancy.address?.lng && (
        <Map data={[vacancy]} />
      )}
    </div>
  );
};

export default VacancyPage;