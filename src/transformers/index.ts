import {ConvertSchema} from './convert-schema'
export type TransformerConfig = {
        rootNode:string;
        innerRootNode:string;
}
export interface INameToValueMap
{
    [key: string]: any;
}
export interface Transform {
    //data will be Itineraries directly
    // you will extract PricingOptions and from each PricingOption extract Price.
    /*data will look like [
        {
            [innerRootNode]:...
        },
        {
            [innerRootNode]:...
        },
        {
            [innerRootNode]:...
        }
    ]*/
    convert(data:any,transformerConfig:TransformerConfig):INameToValueMap;
}
export {ConvertSchema}