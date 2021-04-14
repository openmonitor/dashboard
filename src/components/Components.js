import React, { Component } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Legend, Tooltip, ReferenceLine } from 'recharts';
import '../App.css';

export default class Instances extends Component{

    state = {
        comments: this.props.components.comments
    }

    render(){
        this.props.components.expectedTime = this.props.components.expectedTime.replace('ms', '');
        this.props.components.timeout = this.props.components.timeout.replace('ms', '');
        const frames = this.props.components.frames;
        const comments = this.props.components.comments;
        console.log(this.props.components.timeout);
        var dataMax = this.props.components.timeout;
        console.log(dataMax);
        for(var i=0; i < frames.length; i++){
            if(frames[i].responseTime === null){
                frames[i].responseTime = 0;
            /*}else if(frames[i].responseTime){
                frames[i].responseTime = frames[i].responseTime.replace('ms', '');
            */}
            var date = new Date(frames[i].timestamp);
            frames[i].timestamp = date.toUTCString();
            for(var j=0; j < comments.length; j++){
                if(comments[j].startFrame <= frames[i].id  && frames[i].id <= comments[j].endFrame){
                    frames[i].comment = comments[j].commentText
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

            <div style={{ height: "25vh", display: 'flex', width: "98%", margin: "5px", marginTop: "10px"}}>
                <div style={{flex: 1, width: "25%", backgroundColor: "#282c34", color: "whitesmoke" , borderStyle: "solid", borderRadius: "25px", borderColor: "#282c34"}} >
                    <div>
                        <div style={{fontSize: "calc(7px + 2vmin)", marginTop: "10px", marginBottom: "10px"}}>{this.props.components.name}</div>
                        <a href={this.props.components.ref} style={{color: "gold"}}>{this.props.components.ref}</a>
                        <div>System: {this.props.components.system}</div>
                        <div>Update every {this.props.components.frequency}</div>
                    </div>
                    <br></br>
                    <div>
                        <div>Expected Time: {this.props.components.expectedTime}ms Timeout: {this.props.components.timeout}ms</div>
                    </div>
                </div>
                <div style={{flex: 2, width: "75%", marginTop: "10px"}}>
                    <ResponsiveContainer>
                        <LineChart 
                            width={500}
                            height={500}
                            data={frames}
                            margin={{ top: 10, right: 5, bottom: 5, left: 5 }}>

                            <defs>
                                <linearGradient id="gradient" x1="0" y1="0" x2="0" y2="100%">
                                    <stop offset="1%" stopColor="darkorange" />
                                    <stop offset="15%" stopColor="orange" />
                                    <stop offset={expectedTimePercentage} stopColor="yellow" />
                                    <stop offset="99%" stopColor="green" />
                                    <stop offset="100%" stopColor="red" />
                                </linearGradient>
                            </defs>

                            <CartesianGrid stroke="#ccc" strokeDasharray="3 3" />
                            <XAxis dataKey="timestamp" stroke="white"/>
                            <YAxis unit="ms" stroke="white" domain={[0, dataMax]}/>
                            <Tooltip content={<CustomTooltip />}/>
                            <ReferenceLine y={this.props.components.timeout} label="Timeout" stroke="red" strokeDasharray="3 3" />
                            <ReferenceLine y={this.props.components.expectedTime} stroke="lightblue" label={{value:"Expected Time (" + this.props.components.expectedTime + "ms)", position:"top", fill: 'lightblue'}} strokeDasharray="3 3" />
                            <Legend />
                            <Line type="monotone" dataKey="responseTime" stroke="url(#gradient)" activeDot={{ r: 4 }} />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                
                <br/>
                
                </div>
        )
    }
}

function CustomTooltip({active, payload, label}) {
    if(active){
       return(
            <div className="tooltip">
                <p>{label}</p>
                <p>ResponseTime: {payload[0].value}ms</p>
                <p>CPU usage: {payload[0].payload.cpu}%</p>
                <p>{payload[0].payload.comment}</p>
            </div>
       ) 
    }
    return null;
}