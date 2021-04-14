import React, { Component } from 'react';

export default class Services extends Component{

    render(){
        return(
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <div style={{width: "98%", backgroundColor: "#282c34", color: "whitesmoke" , borderStyle: "solid", borderRadius: "15px", borderColor: "#282c34", marginTop: "20px"}} >
                    <div style={{fontSize: "calc(10px + 2vmin)", marginTop: "10px", marginBottom: "10px"}}>{this.props.systems.name}</div>
                    <a href={this.props.systems.ref} style={{ display: "inline-block", marginBottom: "5px", fontSize: "calc(7px + 1vmin)",  color: "gold"}}>{this.props.systems.ref}</a>
                </div>
                <div style={{width: "98%"}}>
                    {this.props.components}
                </div>
            </div>
        )
    }

}