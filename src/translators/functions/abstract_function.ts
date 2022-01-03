import { FunctionProperties, FunctionPropertiesFinder } from "./function_param_finder";

export abstract class FunctionKeyword {
    constructor() {}

    abstract translate(text: string, keyword: string, sample: string): string;

    protected functionKeywordIsStartOfTheLongWord(
        keyword: string,
        text: string
    ): boolean {
        let stringAfterKeyword: string = text.getStringAfter(keyword);
        return stringAfterKeyword.charAt(0).isLetter();
    }

    protected getFunctionProperties(text: string): FunctionProperties {
        let functionPropertiesFinder = new FunctionPropertiesFinder();
        return functionPropertiesFinder.find(text);
    }
}
