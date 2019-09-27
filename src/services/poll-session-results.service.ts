import { Service, RequestConfig } from ".";

export class PollSessionResultsService implements Service{
  async getDataFromService(requestConfig:RequestConfig):Promise<any>{
      try{
        let response = await fetch(requestConfig.url,{
            method:requestConfig.method,
            body:JSON.stringify(requestConfig.body),
            headers:requestConfig.headers
        });
        return response;
    }catch(e){
        throw e;
    }
  }
}