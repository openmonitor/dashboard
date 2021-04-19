import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, ReferenceLine, ScatterChart, Scatter, Cell } from 'recharts';
import '../App.css';

const renderColorfulLegendText = (value) => {
    const { color } = "white";
    console.log('formatter')

    return <span style={{ color }}>{value}</span>;
};

export default class Instances extends Component{

    getColor(frame){
        if(frame.responseTime >= this.props.components.timeout){
            return "red";
        }else if(frame.responseTime >= this.props.components.expectedTime){
            return "orange";
        }else{
            return "green"
        }
    }

    render(){
        this.props.components.expectedTime = this.props.components.expectedTime.replace('ms', '');
        this.props.components.timeout = this.props.components.timeout.replace('ms', '');
        const frames = this.props.components.frames;
        const comments = this.props.components.comments;
        for(var i=0; i < frames.length; i++){
            frames[i].timeout = this.props.components.timeout;
            if(frames[i].responseTime === null || frames[i].responseTime >= this.props.components.timeout){
                frames[i].responseTime = this.props.components.timeout;
            }
            if(frames[i].cpu === null){
                frames[i].cpu = 0;
            }
            var date = new Date(frames[i].timestamp);
            frames[i].timestamp = date.toUTCString();
            for(var j=0; j < comments.length; j++){
                if(comments[j].startFrame <= frames[i].id  && frames[i].id <= comments[j].endFrame){
                    frames[i].comment = comments[j].commentText
                    frames[i].commentId = comments[j].comment
                }
            }
        }

        const expectedTimePercentage = (100 - (this.props.components.expectedTime / this.props.components.timeout) * 100) + "%";
        const timestampXAxis = []

        /*for(var i=0; i < frames.length; i++){
            var date = new Date(frames[i].timestamp);
            console.log(date);
            var day = date.getDay();
            var date = date.getDate();
            var month = date.getMonth() + 1;
            var hours = date.getHours();
            var minutes = date.getMinutes();
            var seconds = date.getSeconds();
            
            timestampXAxis[i] = day + " " + date + "." + month + "., " + hours + ":" + minutes + ":" + seconds;
            console.log(timestampXAxis[i]);
        }*/

        return(

            <div style={{ height: "25vh", display: 'flex', justifyContent: "space-between", textAlign: "center", width: "98%", margin: "5px", marginTop: "10px"}}>
                <div style={{flex: 1, width: "25%", backgroundColor: "#282c34", color: "whitesmoke" , borderStyle: "solid", borderRadius: "25px", borderColor: "#282c34"}} >
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
                        <div >
                            <p style={{fontSize: "calc(7px + 2vmin)", marginTop: "10px", marginBottom: "10px"}}>{this.props.components.name}</p>
                            <a href={this.props.components.ref} style={{color: "gold"}}>{this.props.components.ref}</a>
                            <br/>
                            <p>System: {this.props.components.system}</p>
                            <p>Update every {this.props.components.frequency}</p>
                        </div>
                        <br/>
                        <div>
                            <div style={{color: "lightgray"}}>Expected Time: {this.props.components.expectedTime}ms Timeout: {this.props.components.timeout}ms</div>
                        </div>
                    </div>
                </div>
                <div style={{flex: 2, width: "75%", marginTop: "10px"}}>
                    <ResponsiveContainer>
                        <ScatterChart
                        width={500}
                        height={500}
                        margin={{ top: 10, right: 5, bottom: 5, left: 5 }}>

                            <defs>
                                <linearGradient id="gradient" x1="0" y1="100%" x2="0" y2="0">
                                    <stop offset="0%" stopColor="green" />
                                    <stop offset="50%" stopColor="orange" />
                                    <stop offset="100%" stopColor="red" />
                                </linearGradient>
                            </defs>


                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" stroke="white"/>
                            <YAxis unit="ms" stroke="white" dataKey="responseTime"/>
                            <Tooltip content={<CustomTooltip />} />
                            <ReferenceLine y={this.props.components.timeout} label={{value:"Timeout", position:"bottom", fill: 'red'}} stroke="red" strokeDasharray="3 3" />
                            <ReferenceLine y={this.props.components.expectedTime} stroke="lightblue" label={{value:"Expected Time (" + this.props.components.expectedTime + "ms)", position:"bottom", fill: 'lightblue'}} strokeDasharray="3 3" />
                            <Legend formatter={renderColorfulLegendText}/>
                            <Scatter name="ResponseTime" data={frames} fill="url(#gradient)">
                                {frames.map((entry, index) => (
                                    <Cell key={`cell-${frames[index].id}`} fill={this.getColor(frames[index])} />
                                ))}
                            </Scatter>
                        </ScatterChart>
                    </ResponsiveContainer>
                </div>
                
                <br/>
                
                </div>
        )
    }
}

function CustomTooltip({active, payload}) {
    if(active){
       const timestamp = new Date(payload[0].payload.timestamp).toLocaleString()
       let responseTime = payload[0].payload.responseTime
       if (responseTime === payload[0].payload.timeout) {
           responseTime = "Timeout"
       } else {
           responseTime = responseTime + "ms"
       }
       return(
            <div className="tooltip">
                <p>{timestamp}</p>
                <p className={"tooltip-entry"}>ResponseTime: {responseTime}</p>
                <p className={"tooltip-entry"}>CPU usage: {payload[0].payload.cpu}%</p>
                {payload[0].payload.comment !== undefined &&
                    <p className={"tooltip-entry"}>Comment: {payload[0].payload.comment}</p>
                }
                {payload[0].payload.comment !== undefined &&
                    <p className={"tooltip-entry"}>Comment ID: {payload[0].payload.commentId}</p>
                }
                <p className={"tooltip-entry"}>Frame ID: {payload[0].payload.id}</p>
            </div>
       ) 
    }
    return null;
}