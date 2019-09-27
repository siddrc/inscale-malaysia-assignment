import {PollSessionResultsService, RequestConfig} from '../../services'
describe('Poll session results service unit tests',()=>{
    it("should fetch what you data from service with status 200", async done => {
        const requestConfig:RequestConfig = {
            url:"http://httpbin.org/status/200",
            method:"GET"
         }
        let response = await new PollSessionResultsService().getDataFromService(requestConfig);
        expect(response.status).toEqual(200);
        done();
      });
      it("if received other than 200, should throw error, unit test case for server error", async done => {
        const requestConfig:RequestConfig = {
            url:"http://httpbin.org/status/500",
            method:"GET"
         }
        const response = await new PollSessionResultsService().getDataFromService(requestConfig)
        expect(response.status).toBe(500)
        done();
      });
      it("what if fetch error's out, due to some typo", async done => {
          try{
            const requestConfig:RequestConfig = {
                url:"htt//httpbin.org/status/500",
                method:"GET"
             }
             await new PollSessionResultsService().getDataFromService(requestConfig)
          }catch(e){
            expect(e.message).toStrictEqual("Network request failed")
            done();
          }
      });
})