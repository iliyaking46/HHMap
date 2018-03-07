import React from 'react';
import Map from './Map'

// import {Map, fromJS} from 'immutable';

export default class MovieCardPage extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      vacancy: undefined,
    }
    fetch(`https://api.hh.ru/vacancies/${props.match.params.id}`)
      .then(response => response.json())
      .then(response => this.setState({ vacancy: response }))
  }

  render() {
    const { vacancy } = this.state;
    console.log(this.state);

    if (!vacancy) {
      return null;
    }
    return <div>
        <h1>{vacancy.name}</h1>
        <img src={vacancy.employer.logo_urls && vacancy.employer.logo_urls.original} style={{maxWidth: '200px'}} alt={vacancy.name} />
        <p>{vacancy.name}</p>
        {/* <p dangerouslySetInnerHTML={() => {return {__html: vacancy.description}}} /> */}
        <p dangerouslySetInnerHTML={{ __html: `${vacancy.description}` }} />
        <Map data={[vacancy]}/>
    </div>
  }
}