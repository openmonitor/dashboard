import React, { Component } from 'react';
import Services from './Services';
import Components from './Components';

export default class FetchData extends Component{

    state = {
        loading: true,
        components: null,
        services: null
    }

    async componentDidMount(){
        const url= "https://openmonitor.monitor-api-dev.zeekay.dev/";
        const response = await fetch(url);
        const data = await response.json();
        this.setState({components: data.components, services: data.services, loading: false});
        //Object.keys(this.state.components).forEach(item => console.log(item));
    }


    render() {

        if(this.state.loading){
            return(
                <div>
                    loading...
                </div>
            )
        }

        if(!this.state.components){
            return(
                <div>
                    No displayable Data received.
                </div>
            )
        }
        var componentKeys = [];
        var componentValues = [];
        Object.keys(this.state.components).forEach(item => componentKeys.push(item));
        Object.values(this.state.components).forEach(item => componentValues.push(item));
        console.log(componentKeys);
        console.log(componentValues);

        var components = []
        for( var i=0; i < componentKeys.length; i++){
            components.push(<Components key={componentKeys[i]} components={componentValues[i]}/>)
        }
        console.log(components);


            return(
                <div>
                    {components}
                </div>
            )
        
    }

}