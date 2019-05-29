import React from 'react';
import axios from 'axios';

class App extends React.Component {

    constructor() {
        super();

    }

    state = {
        stationList: [],
    }

    componentDidMount() {
        axios.get('http://localhost:27017/test/stations')
            .then((response) => {
                console.log('Successfully loaded station list ')
                this.setState({stationList: response.data});
            })
            .catch(() => {
                console.log('Could not get station list');
            }
        );
    }

    render() {
        return(
            <>
                {this.state.stationList.map(station => {
                    <>
                        <h2>{station.name}</h2>
                        <ul>
                            {station.cars.map(car => {
                                <li>
                                    <h3>{car.name}</h3>
                                    <p>{car.available ? 'AVAILABLE' : 'NOT AVAILABLE'}</p>
                                </li>
                            })}
                        </ul>
                    </>
                })}
            </>
        );
    }

}


export default App;