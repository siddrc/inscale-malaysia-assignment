import React from "react";
export type DisplayDataInTableProps  = {
  headers:Array<string>;
  data:Array<any>;
  keys:Array<string>,
  dataInTransit:boolean
}
export class DisplayDataInTable extends React.Component<DisplayDataInTableProps>{
    render(){
        if(this.props.dataInTransit)
         return(<h3>Loading...please wait</h3>)
        else
        return (
            this.props.data.length>0?<table className="table table-striped">
                <tbody>
                <tr>
                   {this.props.headers.map((header,index)=><th data-testid="header-cells" key={index}>{header}</th>)} 
                </tr>
                {this.props.data.map((datum,index)=><tr key={index} data-testid="all-data-rows">
                      { this.props.keys.length > 0?
                            this.props.keys.map((key,index)=>
                                datum[key]?<td data-testid="data-cells" key={`inner${index}`}>
                                {datum[key]}</td>:<td key={`inner${index}`} data-testid="incorrect-keys-defined"></td>
                        ):<td key={`inner${index}`} data-testid="no-keys-defined">No keys defined</td>
                        }
                    </tr>
                )}
                </tbody>
            </table>:<div data-testid="no-data-found">No data found</div>
        )
    }
}