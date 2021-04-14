import React, { Component } from 'react';
import Systems from './Systems';
import Components from './Components';

export default class FetchData extends Component{

    state = {
        loading: true,
        components: null,
        systems: null
    }

    componentDidMount(){
        this.fetchData();
    }

    async fetchData(){
        const url= "https://openmonitor.monitor-api.zeekay.dev";
        const response = await fetch(url);
        const data = await response.json();
        if(response.ok){
            this.setState({components: data.components, systems: data.systems, loading: false});
            Object.keys(this.state.components).forEach(item => console.log(item));
        }
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

        var components = [];
        for( var i=0; i < componentKeys.length; i++){
            components.push(<Components key={componentKeys[i]} components={componentValues[i]}/>)
        }

        var systemKeys = [];
        var systemValues = [];
        Object.keys(this.state.systems).forEach(item => systemKeys.push(item));
        Object.values(this.state.systems).forEach(item => systemValues.push(item));

        var systems = [];
        var systemComponents = [];
        var singleComponents = [];
        for( var j=0; j < systemKeys.length; j++){
            for(var x=0; x < components.length; x++){
                if(systemKeys[j] === components[x].props.components.system){
                    systemComponents.push(components[x]);
                    console.log(systemComponents[x])
                }
            }
            
            systems.push(<Systems key={systemKeys[j]} systems={systemValues[j]} components={systemComponents}/>)
        }
        for (var y=0; y < components.length; y++){
            if(components[y].props.components.system === undefined){
                singleComponents.push(components[y]);
            }
        }
        console.log(systems);
        console.log(singleComponents);

        return(
            <div style={{/*, backgroundColor: "#505050"*/}}>
                {systems}
                {singleComponents}
            </div>
        )
        
    }

}