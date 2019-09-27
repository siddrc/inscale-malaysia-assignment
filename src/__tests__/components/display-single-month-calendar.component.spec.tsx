import React from 'react';
import {
    render,
    cleanup,
    RenderResult,
    fireEvent
  } from '@testing-library/react';

import {restore,useFakeTimers, SinonFakeTimers} from 'sinon';
import {DisplaySingleMonthCalendar,DisplaySingleMonthCalendarProps} from '../../components/display-single-month-calendar';

describe(`Display single month component unit tests`,()=>{
    let component:RenderResult;
    let handleDayClick = ()=>{}
    let displaySingleMonthCalendarProps:DisplaySingleMonthCalendarProps = {handleDayClick};
    let fakeClock:SinonFakeTimers
    beforeEach(()=>{
        component = render(<DisplaySingleMonthCalendar {...displaySingleMonthCalendarProps}/>);
        fakeClock = useFakeTimers();
        fakeClock.setSystemTime(1569502638764);
    })
    afterEach(()=>{
        cleanup();
        displaySingleMonthCalendarProps = {handleDayClick:()=>{}};
        fakeClock.restore();
    });
    it('the function passed in props must be called when if today day is clicked',async done=>{
        let handleDayClick=()=>done();//this is to verify if done was clicked.
        displaySingleMonthCalendarProps =  {handleDayClick} ;
        component = render(<DisplaySingleMonthCalendar {...displaySingleMonthCalendarProps} />);
        const element = component.container.querySelector(".DayPicker-Day--start")
        fireEvent.click(element);
    })
    it('the function passed in props must be called when if a valid day is clicked',async done=>{
        let handleDayClick=()=>done();
        displaySingleMonthCalendarProps =  {handleDayClick} ;
        component = render(<DisplaySingleMonthCalendar {...displaySingleMonthCalendarProps} />);
        const element = component.container.querySelector("div.DayPicker-Month:nth-child(1) > div:nth-child(3) > div:nth-child(4) > div:nth-child(6)")
        fireEvent.click(element);
    });
    it('the function passed in props must throw an error when if a invalid day is clicked',()=>{
        let handleDayClick=()=>{};
        displaySingleMonthCalendarProps =  {handleDayClick} ;
        component = render(<DisplaySingleMonthCalendar {...displaySingleMonthCalendarProps} />);
        const element = component.container.querySelector("div.DayPicker-Month:nth-child(1) > div:nth-child(3) > div:nth-child(4) > div:nth-child(4)")
        fireEvent.click(element)
        const {getByTestId} = component;
        expect(getByTestId("errorZone")).toBeTruthy();
    })
    
});