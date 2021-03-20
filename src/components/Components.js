import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip } from 'recharts';

export default class Instances extends Component{

    render(){

        console.log(this.props.components);
        this.props.components.expectedTime = this.props.components.expectedTime.replace('ms', '');
        this.props.components.timeout = this.props.components.timeout.replace('ms', '');
        const frames= this.props.components.frames;
        for(var i=0; i< frames.length; i++){
            if(frames[i].responseTime){
                frames[i].responseTime = frames[i].responseTime.replace('ms', '');
            }else{
                frames[i].responseTime = 0;
            }
            var date = new Date(frames[i].timestamp);
            frames[i].timestamp = date.toUTCString();
        }
        console.log(frames);
    
        return(

            <div style={{ height: "25vh", display: 'flex', borderStyle: "groove", borderColor: "darkgray", borderWidth: "2px", margin: "5px"}}>
                <div style={{flex: 1, width: "25%", backgroundColor: "#151b47", color: "whitesmoke" , borderStyle: "solid", borderRadius: "25px", borderColor: "#192264"}} >
                    <div style={{fontSize: "calc(7px + 2vmin)", marginTop: "10px", marginBottom: "10px"}}>{this.props.components.name}</div>
                    <a href="{this.props.components.ref}" style={{color: "gold"}}>{this.props.components.ref}</a>
                    <div>System: {this.props.components.system}</div>
                    <div>Update every {this.props.components.frequency}</div>
                    <div>Expected Time: {this.props.components.expectedTime}</div>
                    <div>Timeout: {this.props.components.timeout}</div>
                </div>
                <div style={{flex: 2, width: "75%"}}>
                    <ResponsiveContainer>
                        <LineChart 
                            width={500}
                            height={500}

                            data={frames}
                            margin={{ top: 10, right: 5, bottom: 5, left: 5 }}>
                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp"/>
                            <YAxis unit="ms" domain={['dataMin', 'dataMax+10']}/>
                            <Tooltip payload={[{ name: "timestamp", value: "responseTime", unit: 'ms' }]}/>
                            <Legend />
                            <Line type="monotone" dataKey="responseTime" stroke="#8884d8" activeDot={{ r: 8 }} />  
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                
                <br/>
                
                </div>
        )
    }

}