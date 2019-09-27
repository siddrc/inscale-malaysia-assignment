import React from 'react';
import {
    render,
    cleanup
  } from '@testing-library/react';
import {DisplayDataInTable,DisplayDataInTableProps} from '../../components/display-data-in-table.component'
  
afterEach(()=>{
    cleanup();
});
describe('Display data in table component unit test cases',()=>{
    it('for no data is should display no data found test-id',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[],
            headers:[],
            keys:[]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        const {getByTestId} = component;
        expect(getByTestId("no-data-found")).toBeTruthy();
    });
    it('for no data is should display no data found test-id-snapshot test',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[],
            headers:[],
            keys:[]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        expect(component).toMatchSnapshot()
    });
    it('for given header data, it should display those many header cells',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"}],
            headers:["Header1","Header2"],
            keys:[]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        const {getAllByTestId} = component;
        expect(getAllByTestId("header-cells").length).toEqual(2);
    });
    it('for given header data, it should display those many header cells-snapshot test',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"}],
            headers:["Header1","Header2"],
            keys:[]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        expect(component).toMatchSnapshot()
    });
    it('for given header data, it should display the correct header',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"}],
            headers:["Header1","Header2"],
            keys:[]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        const {getAllByTestId} = component;
        expect(getAllByTestId("header-cells")[0].textContent).toEqual("Header1");
    });
    it('for given header data, it should display the correct header-snapshot test',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"}],
            headers:["Header1","Header2"],
            keys:[]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        expect(component).toMatchSnapshot()
    });
    it('for a given data, it will not display data if no keys are present',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"}],
            headers:["Header1","Header2"],
            keys:[]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        const {getAllByTestId} = component;
        expect(getAllByTestId("no-keys-defined").length).toEqual(displayDataInTableProps.data.length)
    })
    it('for a given data, it will not display data if no keys are present-snapshot test',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"}],
            headers:["Header1","Header2"],
            keys:[]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        expect(component).toMatchSnapshot()
    })
    it('for a given data, it must display data',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"}],
            headers:["Header1","Header2"],
            keys:["key"]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        const {getAllByTestId} = component;
        expect(getAllByTestId("data-cells").length).toEqual(1);
    })
    it('for a given data, it must display data-snapshot test',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"}],
            headers:["Header1","Header2"],
            keys:["key"]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        expect(component).toMatchSnapshot()
    })
    it('for a given data, it will not display, if keys are present by incorrect',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"},{"key":"value"}],
            headers:["Header1","Header2"],
            keys:["key1"]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        const {getAllByTestId} = component;
        expect(getAllByTestId("incorrect-keys-defined").length).toEqual(2)
    });
    it('for a given data, it will not display, if keys are present by incorrect-snapshot test',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"},{"key":"value"}],
            headers:["Header1","Header2"],
            keys:["key1"]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        expect(component).toMatchSnapshot()
    });
    it('for a given data, it display the correctly as per the snapshot',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"},{"key":"value"}],
            headers:["Header1","Header2"],
            keys:["key"]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        expect(component).toMatchSnapshot()
    })
    it('for a given data in correct conditions, the number of rows must match length of data array',()=>{
        const displayDataInTableProps:DisplayDataInTableProps = {
            data:[{"key":"value"},{"key":"value"}],
            headers:["Header1","Header2"],
            keys:["key"]
        };
        const component = render(<DisplayDataInTable {...displayDataInTableProps}/>);
        const {getAllByTestId} = component;
        expect(getAllByTestId("all-data-rows").length).toBe(displayDataInTableProps.data.length);
    })
})