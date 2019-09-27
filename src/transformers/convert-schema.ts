import { Transform, TransformerConfig, INameToValueMap } from ".";

export class ConvertSchema implements Transform {
    convert(payloadToTransform:Array<any>,transformerConfig:TransformerConfig):INameToValueMap{
        const result = new Array<any>();
        payloadToTransform.forEach(datum=>{
          datum[transformerConfig.rootNode].forEach((innerData:any)=>{
            if(innerData[transformerConfig.innerRootNode])
                result.push({[transformerConfig.innerRootNode]:innerData[transformerConfig.innerRootNode]})
            })
        });
       return result;
    }
}