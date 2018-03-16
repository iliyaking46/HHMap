import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Map from './Map';
import { loader } from '../helpers';
import { loadVacancy } from '../actions/vacancy';
// import {Map, fromJS} from 'immutable';

class VacancyPage extends React.Component {
  static propTypes = {
    loadVacancy: PropTypes.func.isRequired,
    vacancies: PropTypes.arrayOf(PropTypes.any).isRequired,
    isLoad: PropTypes.bool.isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  componentWillMount() {
    const vacancy = this.props.vacancies.find(
      item => item.id === this.props.match.params.id,
    );
    if (!vacancy) {
      this.props.loadVacancy(this.props.match.params.id);
    }
  }

  render() {
    const { vacancies, isLoad } = this.props;
    const vacancy = vacancies.find(
      item => item.id === this.props.match.params.id,
    );
    if (!isLoad || !vacancy) {
      return loader;
    }
    return (
      <div className="mb-5">
        <h1>{vacancy.name}</h1>
        {vacancy.employer.logo_urls && (
          <img
            src={vacancy.employer.logo_urls.original}
            className="float-right"
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
        <p>{vacancy.name}</p>
        <p>
          {`З/п ${
            vacancy.salary
              ? (vacancy.salary.from != null
                  ? `от ${vacancy.salary.from} `
                  : '') +
                (vacancy.salary.to != null ? `до ${vacancy.salary.to} ` : '') +
                vacancy.salary.currency
              : 'не указана'
          }`}
        </p>
        <p dangerouslySetInnerHTML={{ __html: `${vacancy.description}` }} />
        {vacancy.address && <Map data={[vacancy]} />}
      </div>
    );
  }
}
export default connect(
  state => ({
    vacancies: state.vacancyCard.vacancies,
    isLoad: state.vacancyCard.isLoad,
  }),
  { loadVacancy },
)(VacancyPage);
