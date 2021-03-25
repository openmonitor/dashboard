import React, { Component } from 'react';
import Instances from './Components';

export default class Services extends Component{

    render(){
        return(
            <div>
                <div style={{width: "100%", backgroundColor: "#151b47", color: "whitesmoke" , borderStyle: "solid", borderRadius: "15px", borderColor: "#192264", marginTop: "10px"}} >
                    <div style={{fontSize: "calc(10px + 2vmin)", marginTop: "10px", marginBottom: "10px"}}>{this.props.systems.name}</div>
                    <a href="{this.props.systems.ref}" style={{ display: "inline-block", marginBottom: "5px", fontSize: "calc(7px + 1vmin)",  color: "gold"}}>{this.props.systems.ref}</a>
                </div>
                    <div>
                    {this.props.components}
                </div>
            </div>
        )
    }

}