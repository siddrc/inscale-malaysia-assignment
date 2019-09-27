import React from 'react';
import {
    render,
    cleanup,
    RenderResult,
    fireEvent
  } from '@testing-library/react';
import {App,AppProperties} from '../App';
import {DropDownComponent,DropDownComponentProps} from '../components/dropdown.component';
describe('App integration test suite',()=>{
    let component:RenderResult;
    let appProperties:AppProperties
    let appProps:AppProperties = {} 
    beforeEach(()=>{
        component = render(<App {...appProps}/>);
    })
    afterEach(()=>{
        cleanup();
    });
    it('should display 2 drop downs for locations',()=>{
        const {getAllByTestId} = component
        expect(getAllByTestId("main-select-dropdown").length).toBe(2)
    })
    it('should display calendar for one month',()=>{
        const {getAllByTestId} = component
        expect(getAllByTestId("main-calendar").length).toBe(1)
    })
})