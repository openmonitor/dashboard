import { useEffect, useState, useRef } from "react";
import Systems from './Systems';
import Components from './Components';

export default function FetchDataFunction(props) {

    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const[components, setComponents] = useState([]);
    const[systems, setSystems] = useState([]);
    const[items, setItems] = useState([]);
    const ref = useRef(true);

    useEffect(() => {
        setTimeout(() => {
            console.log(new Date().toLocaleString().replace(',','') + ': fetching')
            fetch("https://openmonitor.monitor-api.zeekay.dev")
                .then(res => res.json())
                .then(
                    (result) => {
                        setIsLoaded(true);
                        setComponents(result.components);
                        setSystems(result.systems);
                        setItems(result);
                    },
                    (error) => {
                        setIsLoaded(true);
                        setError(error);
                    }
                )
            ref.current = false;
        }, ((ref.current === true) ? 0 : 10000));
    }, [items])

    if(error){
        return <div style={{color: "red", marginTop: "50px", fontSize: "calc(10px + 1.5vmin)"}}>Error: {error.message}!</div>;
    }else if(!isLoaded){
        return <div style={{color: "whitesmoke", marginTop: "50px", fontSize: "calc(10px + 1.5vmin)"}}>loading...</div>;
    }else {
        var componentKeys = [];
        var componentValues = [];
        Object.keys(components).forEach(item => componentKeys.push(item));
        Object.values(components).forEach(item => componentValues.push(item));

        var componentsLocal = [];
        for( var i=0; i < componentKeys.length; i++){
            componentsLocal.push(<Components key={componentKeys[i]} components={componentValues[i]}/>)
        }

        var systemKeys = [];
        var systemValues = [];
        Object.keys(systems).forEach(item => systemKeys.push(item));
        Object.values(systems).forEach(item => systemValues.push(item));

        var systemsLocal = [];
        var singleComponents = [];
        for( var j=0; j < systemKeys.length; j++){
            var systemComponents = [];
            for(var x=0; x < componentsLocal.length; x++){
                if(systems[j].system === componentsLocal[x].props.components.system){
                    systemComponents.push(componentsLocal[x]);
                }
            }
            systemsLocal.push(<Systems key={systemKeys[j]} systems={systemValues[j]} components={systemComponents}/>)
        }
        for (var y=0; y < componentsLocal.length; y++){
            if(componentsLocal[y].props.components.system === undefined){
                singleComponents.push(componentsLocal[y]);
            }
        }

        return(
            <div >
                {systemsLocal}
                {singleComponents}
            </div>
        )
    }
}