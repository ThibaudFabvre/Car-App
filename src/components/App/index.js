import React from 'react';
import axio from 'axio';

class App extends React.Component {

    componentDidMount() {
        axio.get('/stations')
    }

    render() {
        return(
            <>

            </>
        );
    }

}


export default App;