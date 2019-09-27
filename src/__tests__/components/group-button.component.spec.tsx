import React from 'react';
import {
    render,
    cleanup,
    RenderResult,
    fireEvent
  } from '@testing-library/react';
import {GroupButtonComponent,GroupButtonComponentProps, Button} from '../../components/group-button.component';
describe(`Group button unit tests`,()=>{
    let component:RenderResult;
    let buttons:Array<Button> = new Array<Button>();
    let onClickHandler = ()=>{}
    let groupButtonComponentProps:GroupButtonComponentProps = {buttons,onClickHandler} 
    beforeEach(async ()=>{
        component = await render(<GroupButtonComponent {...groupButtonComponentProps}/>);
    })
    afterEach(()=>{
        cleanup();
        groupButtonComponentProps = {buttons:[],onClickHandler:()=>{}} 
    });
    it('to render it must take an array of button data',()=>{
        const {queryAllByTestId} = component;
        expect(queryAllByTestId('group-button').length).toEqual(0);
    });
    it('if "x" number of buttons are passed,it must render those many buttons only',()=>{
        let buttons:Array<Button> = new Array<Button>();
        buttons.push({label:'test',value:'test'}) 
        groupButtonComponentProps =  {buttons,onClickHandler:()=>{}} ;
        component = render(<GroupButtonComponent {...groupButtonComponentProps}/>);
        const {queryAllByTestId} = component;
        expect(queryAllByTestId('group-button').length).toEqual(1);
    });
    it('if "x" number of buttons are passed,it must render those many buttons only',()=>{
        let buttons:Array<Button> = new Array<Button>();
        buttons.push({label:'test',value:'test'}) 
        groupButtonComponentProps =  {buttons,onClickHandler:()=>{}} ;
        component = render(<GroupButtonComponent {...groupButtonComponentProps}/>);
        expect(component).toMatchSnapshot();
    });
    it('the button label must match the buttons array passed',()=>{
        let buttons:Array<Button> = new Array<Button>();
        buttons.push({label:'testLabel',value:'test'},{label:'testButtonLabel-1',value:'testButtonValue'}) 
        groupButtonComponentProps =  {buttons,onClickHandler:()=>{}} ;
        component = render(<GroupButtonComponent {...groupButtonComponentProps} />);
        const {getByText} = component;
        expect(getByText('testLabel')).toBeTruthy();
    });
    it('the button label must match the buttons array passed-snapshot test',()=>{
        let buttons:Array<Button> = new Array<Button>();
        buttons.push({label:'testLabel',value:'test'},{label:'testButtonLabel-1',value:'testButtonValue'}) 
        groupButtonComponentProps =  {buttons,onClickHandler:()=>{}} ;
        component = render(<GroupButtonComponent {...groupButtonComponentProps} />);
        expect(component).toMatchSnapshot();
    });
    it('the function passed in props must be called when any of the button in group is clicked',done=>{
        let someOnClickHandler=()=>done();
        const buttons:Array<Button> = new Array<Button>();
        buttons.push({label:'testLabel',value:'test'})
        groupButtonComponentProps =  {buttons,onClickHandler:()=>someOnClickHandler()} ;
        component = render(<GroupButtonComponent {...groupButtonComponentProps} />);
        const {getByText} = component;
        const node = getByText('testLabel');
        fireEvent.click(node);
    })
})