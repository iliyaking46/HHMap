import React from 'react';
import Map from './Map'

// import {Map, fromJS} from 'immutable';

export default class MovieCardPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      vacancy: undefined,
      loaded: false
    }
    fetch(`https://api.hh.ru/vacancies/${props.match.params.id}`)
      .then(response => response.json())
      .then(response => this.setState({ vacancy: response }))
  }

  render() {
    const { vacancy } = this.state;
    const loader = <div className="indicator"><svg width="16px" height="12px"><polyline id="back" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline><polyline id="front" points="1 6 4 6 6 11 10 1 12 6 15 6"></polyline></svg></div>;
    if (!vacancy) {
      return loader;
    }
    return <div className="mb-5">
        <h1>{vacancy.name}</h1>
        {vacancy.employer.logo_urls && <img src={vacancy.employer.logo_urls.original} style={{maxWidth: '200px'}} alt={vacancy.name} />}
        <p>
          {vacancy.key_skills.map(skill => <span key={skill.name} className="badge badge-success mr-2">{skill.name}</span> )}
        </p>
        <p>{vacancy.name}</p>
        <p dangerouslySetInnerHTML={{ __html: `${vacancy.description}` }} />
        {vacancy.address && <Map data={[vacancy]}/>}
    </div>
  }
}