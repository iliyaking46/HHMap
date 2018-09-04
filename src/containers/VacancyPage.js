import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { fromJS } from 'immutable';
import Map from './Map';
import { loader } from '../helpers';
import { loadVacancy } from '../actions';

class VacancyPage extends PureComponent {
  static propTypes = {
    loadVacancy: PropTypes.func.isRequired,
    vacancies: PropTypes.objectOf(PropTypes.any).isRequired,
    isLoad: PropTypes.bool.isRequired,
    match: PropTypes.objectOf(PropTypes.any).isRequired,
  };

  componentDidMount() {
    window.scrollTo(0, 0);
    const { vacancies } = this.props;
    const vacancy = vacancies.find(
      item => item.get('id') === this.props.match.params.id,
    );
    if (!vacancy) {
      this.props.loadVacancy(this.props.match.params.id);
    }
  }

  renderBack = () => (
    <button
      className="btn btn-outline-dark mb-2 d-none d-lg-block"
      onClick={() => this.props.history.goBack()}
    >
      Назад
    </button>
  );

  render() {
    const { vacancies, isLoad, error } = this.props;
    const vacancy = vacancies.find(
      item => item.get('id') === this.props.match.params.id,
    );
    if (!isLoad) {
      return (
        <div className="position-relative" style={{ minHeight: '150px' }}>
          {loader}
        </div>
      );
    }

    if (error || !vacancy) {
      return (
        <div className="text-center my-3">
          <h4>Ошибка, что-то пошло не так...</h4>
          <button
            className="btn btn-outline-dark my-3"
            onClick={() => this.props.history.push('/')}
          >
            На главную
          </button>
        </div>
      );
    }

    return (
      <div className="mb-5">
        {this.renderBack()}
        <h3>{vacancy.get('name')}</h3>
        {vacancy.getIn(['employer', 'logo_urls']) && (
          <img
            src={vacancy.getIn(['employer', 'logo_urls', 'original'])}
            className="float-sm-right"
            style={{ maxWidth: '200px' }}
            alt={vacancy.get('name')}
          />
        )}
        <p>
          {vacancy.get('key_skills').map(skill => (
            <span key={skill.get('name')} className="badge badge-success mr-2">
              {skill.get('name')}
            </span>
          ))}
        </p>
        <p>
          {`З/п ${
            vacancy.get('salary')
              ? (vacancy.getIn(['salary', 'from'])
                  ? `от ${vacancy.getIn(['salary', 'from'])} `
                  : '') +
                (vacancy.getIn(['salary', 'to'])
                  ? `до ${vacancy.getIn(['salary', 'to'])} `
                  : '') +
                vacancy.getIn(['salary', 'currency'])
              : 'не указана'
          }`}
        </p>
        {/* eslint-disable-next-line */}
        <p dangerouslySetInnerHTML={{ __html: `${vacancy.get('description')}` }} />
        {vacancy.get('address') &&
          vacancy.getIn(['address', 'lat']) &&
          vacancy.getIn(['address', 'lng']) && <Map data={fromJS([vacancy])} />}
      </div>
    );
  }
}

export default connect(
  state => ({
    vacancies: state.getIn(['vacancyCard', 'vacancies']),
    isLoad: state.getIn(['vacancyCard', 'isLoad']),
    error: state.getIn(['vacancyCard', 'error']),
  }),
  { loadVacancy },
)(VacancyPage);
