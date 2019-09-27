import { RequestConfig, ResponseConfig,CreateSession } from "../../services"

describe("Create Session service, unit tests",()=>{
    
    it('should hit endpoint and get status 200 if all good',async(done)=>{
        const requestConfig:RequestConfig = {
            url:"http://httpbin.org/status/200",
            method:"GET",
            headers:{
                "Accept":"application/json"
            }
        }
        const response:ResponseConfig = {
            status:200
        }
        const unitResponse = await new CreateSession().getDataFromService(requestConfig);
        expect(unitResponse.status).toBe(response.status);
        done();
    });
})