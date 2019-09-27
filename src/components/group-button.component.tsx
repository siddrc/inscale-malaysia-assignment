import React from 'react';
export type Button = {
    label:string;
    value:string;
}
export type GroupButtonComponentProps = {
    buttons:Array<Button>,
    onClickHandler:Function
}
type GroupButtonComponentState = {
    
}
export class GroupButtonComponent extends React.Component<GroupButtonComponentProps,GroupButtonComponentState>{
    render(){
        return(
            <div className="btn-group" role="group">
                {this.props.buttons.map((button,index)=>{
                    return(<button key={index} value={button.value} 
                        data-testid="group-button" 
                        type="button" 
                        className="btn btn-primary" onClick={e=>this.props.onClickHandler(e)}>{button.label}</button>)
                })}
            </div>)
    }
}