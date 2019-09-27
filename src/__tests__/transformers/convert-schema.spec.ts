import { TransformerConfig,ConvertSchema, Transform } from "../../transformers"

describe(`Convert Schema, unit test cases`,()=>{
    
    it('should take one array of jsons and convert it to another/custom format/array of json',()=>{
        const source = [
            {
                "Test":[{
                    "node1":"value1",
                    "node2":"value2",
                    "test" : "testValue1"
                }]
            },
            {
                "Test":[{
                    "node1":"value1",
                    "node2":"value2",
                    "test" : "testValue2"
                }]
            }
        ];
        const transformerOptions:TransformerConfig = {
            rootNode:"Test",
            innerRootNode:"test"
        }
        const convertSchema:Transform = new ConvertSchema();
        const convertedData=convertSchema.convert(source,transformerOptions);
        expect(convertedData).toStrictEqual([{
            "test" : "testValue1"
        },{
            "test" : "testValue2"
        }])

    })
    it('should not include the json data if for that json innerRootNode is absent',()=>{
        const source = [
            {
                "Test":[{
                    "node1":"value1",
                    "node2":"value2",
                    "test" : "testValue1"
                }]
            },
            {
                "Test":[{
                    "node1":"value1",
                    "node2":"value2"
                }]
            }
        ];
        const transformerOptions:TransformerConfig = {
            rootNode:"Test",
            innerRootNode:"test"
        }
        const convertSchema:Transform = new ConvertSchema();
        const convertedData=convertSchema.convert(source,transformerOptions);
        expect(convertedData).toStrictEqual([{
            "test" : "testValue1"
        }]);
    })
})