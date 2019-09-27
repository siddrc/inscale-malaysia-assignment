import React from 'react';
import {DropDownComponent,DropDownComponentProps, Option} from './components/dropdown.component';
import {DisplaySingleMonthCalendar} from './components/display-single-month-calendar';
import { CreateSession ,Service, RequestConfig, CREATE_SESSION_REQUEST_CONFIG, PollSessionResultsService, getFlightSearchServiceURL, getFlightSearchServiceHeaders} from './services';
import { ConvertSchema,Transform, INameToValueMap } from './transformers';
import { DisplayDataInTable } from './components/display-data-in-table.component';
export type AppProperties = {
  
}
type AppState = {
   from:string;
   to:string;
   day:string;
   selectedDate:Date;
   daySelected:boolean;
   message:string;
   flightPrices:Array<any>,
   dataInTransit:boolean
}
export class App extends React.Component<AppProperties,AppState>{
  flightPricesService:FlightPricesService
  constructor(props:AppProperties){
    super(props);
    this.flightPricesService = new FlightPricesService();
    this.state = {
      from:"SIN-sky",
      to:"KUL-sky",
      day:"Please click on calendar above to select day of travel.",
      selectedDate:new Date(),
      daySelected:false,
      message:"",
      flightPrices:[],
      dataInTransit:false
    }

  }
  handleDayClickHandler(selectedDate:Date){
    this.setState({day:selectedDate.toLocaleDateString(),selectedDate,daySelected:true})
  }
  handleChangeOfFromLocation(event:any){
    if(this.state.from!== this.state.to)
    this.setState({from:event.target.value})
    else
    this.setState({message:"Please select different from and to"})
  } 
  handleChangeOfToLocation(event:any){
    if(this.state.from!== this.state.to)
    this.setState({to:event.target.value})
    else
    this.setState({message:"Please select different from and to"})
  }
  async fetchFlighStatuses(){
    try{
      this.setState({dataInTransit:true});
      const inboundDate = this.state.selectedDate.toISOString().split('T')[0]
      const flightPrices = await this.flightPricesService.getFlightPrices(inboundDate,this.state.from,this.state.to);
      this.setState({dataInTransit:false});
      this.setState({flightPrices})
    }catch(e){
      console.error(`${e.message}-${e.stack}`)
    }
  } 
  render(){
    const  options:Array<Option> = [{name:"SIN",value:"SIN-sky"},{name:"KUL",value:"KUL-sky"},
    {name:"SFO",value:"SFO-sky"}]
    const dropDownComponentPropsFromLocation:DropDownComponentProps={options,
      onChangeHandler:(event:any)=>this.handleChangeOfFromLocation(event)}
    const dropDownComponentPropsToLocation:DropDownComponentProps={options,onChangeHandler:(event:any)=>this.handleChangeOfToLocation(event)}
    return (<div>
      <div>{this.state.message}</div>
      <DropDownComponent {...dropDownComponentPropsFromLocation}/>
      <DropDownComponent {...dropDownComponentPropsToLocation}/>
      <DisplaySingleMonthCalendar handleDayClick={(day:Date)=>this.handleDayClickHandler(day)}/>
      <div>Selected Date For Travel:{this.state.day}</div>
      <button disabled={!this.state.daySelected} onClick={e=>this.fetchFlighStatuses()}>Fetch Flight Statuses</button>
      <DisplayDataInTable headers={["Prices (In USD)"]} data={this.state.flightPrices} keys={["Price"]} dataInTransit={this.state.dataInTransit} />
    </div>)
 }
}

class FlightPricesService{
  private readonly createSessionService:Service;
  private readonly pollSessionResultsService:Service;
  private readonly convertSchema:Transform;
  constructor(){
    this.createSessionService = new CreateSession();
    this.pollSessionResultsService = new PollSessionResultsService();
    this.convertSchema = new ConvertSchema();
  }
  async getFlightPrices(inboundDate:string,originPlace:string,destinationPlace:string):Promise<any>{
    try{
        const requestConfig:RequestConfig = CREATE_SESSION_REQUEST_CONFIG;
        requestConfig.formData = {
          "inboundDate": inboundDate,//"2019-09-23-format",
          "cabinClass": "business",
          "children": "0",
          "infants": "0",
          "country": "US",
          "currency": "USD",
          "locale": "en-US",
          "originPlace": originPlace,
          "destinationPlace": destinationPlace,
          "outBoundDate":inboundDate,
          "adults": "1"
      }
        const createSessionResponse = await this.createSessionService.getDataFromService(requestConfig);
        const token = this.getToken(createSessionResponse.headers);
        let payload = await this.getFlightPricesImpl(token);
        payload = payload["Itineraries"]; 
        payload = this.convertSchema.convert(payload,{rootNode:"PricingOptions",innerRootNode:"Price"});
        payload = payload.sort((a:{Price:string},b:{Price:string})=>{
          if(parseFloat(a.Price)=== parseFloat(b.Price)) return 0;
          if(parseFloat(a.Price)<parseFloat(b.Price)) return -1;
          else return 1;
          });
        return payload;
    }catch(e){
        throw e;
    }
  }
  private getToken(headers:any):string{
    const strings = headers.location.split("/");
    return strings[strings.length-1];
  }
  private async getFlightPricesImpl(token:string):Promise<INameToValueMap>{
    const requestConfig:RequestConfig = {
      "url":getFlightSearchServiceURL(token),
      "headers":getFlightSearchServiceHeaders(),
      "method":"GET",
    };
    let response = await this.pollSessionResultsService.getDataFromService(requestConfig);
    if(!response.ok && response.status!==200)
      throw new Error(`Error@client side`);
    response = await response.json();
    
    if(response && response.Status && response.Status === 'UpdatesPending')
        return await this.getFlightPricesImpl(token);
    
    return response;

  }
}