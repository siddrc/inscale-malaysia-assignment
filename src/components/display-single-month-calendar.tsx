import React, { Fragment } from 'react';
import DayPicker from 'react-day-picker';
import 'react-day-picker/lib/style.css';
const moment = require("moment");
export type DisplaySingleMonthCalendarProps = {
    handleDayClick:Function;
}
type DisplaySingleMonthCalendarState = {
  from:Date,
  to:Date,
  enteredTo:Date,
  error?:string
}
export class DisplaySingleMonthCalendar extends React.Component<DisplaySingleMonthCalendarProps,DisplaySingleMonthCalendarState>{
  DISPLAY_ONE_MONTH:number = 1;
  constructor(props:DisplaySingleMonthCalendarProps){
    super(props);
    this.state = this.getInitialState();
  }
  private getInitialState():DisplaySingleMonthCalendarState {
    const from = new Date();
    from.setHours(0);
    from.setMinutes(0);
    const to =  new Date(moment().add(this.DISPLAY_ONE_MONTH, 'month'));
    return {
      enteredTo:from,
      from,
      to
    }
  }
  private handleDayClick(day:Date) {
    const { from, to } = this.state;
    try{
    if (from && to && day >= from && day <= to) {
            try{
              this.setState({error:""})
              this.props.handleDayClick(day);
            }catch(e){
                console.error(`ERROR:handleDayClick:${e}-${e.stack}`);
                throw new Error(`ERROR:handleDayClick:${e}-${e.stack}`)
            }
        }else{
            throw new Error(`Invalid date clicked`);
        }
    }catch(e){
        this.setState({error:"Invalid date clicked."})
    } 
  }
  render(){
    const { from, enteredTo } = this.state;
    const modifiers = { start: from, end: enteredTo };
    const disabledDays = { before: this.state.from,after:this.state.to };
      return (<div data-testid="main-calendar">
          <DayPicker
          canChangeMonth={false}
          className="Range"
          numberOfMonths={2}
          fromMonth={from}
          disabledDays={disabledDays}
          modifiers={modifiers}
          onDayClick={day=>this.handleDayClick(day)}
        />
        {this.state.error?<div data-testid="errorZone">{this.state.error}</div>:<Fragment/>}
      </div>)
  }
}