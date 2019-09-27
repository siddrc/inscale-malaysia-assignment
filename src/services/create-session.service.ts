import { Service, RequestConfig, ResponseConfig } from ".";
const unirest = require("unirest");
export class CreateSession implements Service{
    getDataFromService(requestConfig:RequestConfig):Promise<ResponseConfig>{
        return new Promise((resolve,reject)=>{
            const req = unirest(requestConfig.method, requestConfig.url);
                        req.headers(requestConfig.headers);
                        req.form(requestConfig.formData);
                    req.end((res:any)=>{
                        if (res.error) {
                            return reject(res);
                        }else{
                            return resolve(res);
                        }
                    });
               });
    }
}