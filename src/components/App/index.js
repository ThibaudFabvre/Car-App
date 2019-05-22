import React from 'react';
import axio from 'axio';

class App extends React.Component {

    state = {
        stationList : '',
    }

    componentDidMount() {
        axio.get('http://localhost:27017/test/stations')
            .then((response) => {
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
                {stationList.map(station => {
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