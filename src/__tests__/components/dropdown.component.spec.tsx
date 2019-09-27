import React from 'react';
import {
    render,
    cleanup,
    RenderResult,
    fireEvent,
    waitForElement,
    getByLabelText,
    getByText
  } from '@testing-library/react';
import {DropDownComponent,DropDownComponentProps, Option} from '../../components/dropdown.component';
describe(`Dropdown component unit tests`,()=>{
    const DOWN_ARROW = { keyCode: 40 };
    let component:RenderResult;
    let onChangeHandler = ()=>{};
    let options = Array<Option>();
    let dropDownComponentProps:DropDownComponentProps = {options,onChangeHandler} 
    afterEach(()=>{
        cleanup();
        dropDownComponentProps = {options:new Array<Option>(),onChangeHandler:()=>{}} 
    });
    it('to render it must take an array of options data',()=>{
        const component = render(<DropDownComponent {...dropDownComponentProps}/>);
        const {getByTestId} = component;
        expect(getByTestId("no-select-options-provided")).toBeTruthy();
    });
    it('to render it must take an array of options data',()=>{
        options.push({name:"test",value:"test"})
        options.push({name:"test",value:"test"})
        dropDownComponentProps.options = options;
        const component = render(<DropDownComponent {...dropDownComponentProps}/>);
        const {getAllByTestId} = component;
        expect(getAllByTestId("options-data").length).toBe(2);
    });
    it('to render it must take an array of options data-snapshot test',()=>{
        options.push({name:"test",value:"test"})
        options.push({name:"test",value:"test"})
        const component = render(<DropDownComponent {...dropDownComponentProps}/>);
        expect(component).toMatchSnapshot();
    });
    
    it('the option label must match the options array passed',()=>{
        options.push({name:"testOptionName",value:"testOptionValue"}) 
        dropDownComponentProps =  {options,onChangeHandler} ;
        component = render(<DropDownComponent {...dropDownComponentProps} />);
        const {getByText} = component;
        expect(getByText('testOptionName')).toBeTruthy();
    });
    it('the function passed in props must be called when select option is changed',done=>{
        onChangeHandler = ()=>done();
        options.push({name:"testOptionName",value:"testOptionValue"});
        dropDownComponentProps = {options,onChangeHandler} ;
        component = render(<DropDownComponent {...dropDownComponentProps} />);
        fireEvent.change(component.getByTestId("main-select-dropdown"))
     });
})