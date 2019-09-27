import React from 'react';
export type DropDownComponentProps = {
    options:Array<Option>;
    onChangeHandler:Function
};
export type Option = {
    name:string;
    value:string;
}
type DropDownComponentState = {
    selectedOptionValue:string
}
export class DropDownComponent extends React.Component<DropDownComponentProps,DropDownComponentState>{
    constructor(props:DropDownComponentProps){
        super(props);
        this.state = {
            selectedOptionValue:""
        }
    }
    onChangeHandler(event:any){
        this.setState({"selectedOptionValue":event.target.value})
        this.props.onChangeHandler(event);
    }
    render(){
        return(this.props.options.length > 0 ?<select name="selectedOptionValue" data-testid="main-select-dropdown" 
        value={this.state.selectedOptionValue} 
        onChange={e=>this.onChangeHandler(e)}>
            {this.props.options.map((option,index)=><option data-testid="options-data" key={index} value={option.value}>{option.name}</option>)}
        </select>:<div data-testid="no-select-options-provided">No options were provided</div>)
    }
}