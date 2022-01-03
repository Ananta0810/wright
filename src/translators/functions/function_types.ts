"use strict";
import "../../stringify/string.extensions";
import { FunctionKeyword } from "./abstract_function";
import { FunctionProperties } from "./function_param_finder";

class NiladicFunction extends FunctionKeyword {
    translate(text: string, keyword: string, sample: string): string {
        keyword = " " + keyword.trim();
        if (!text.includes(keyword)) {
            return text;
        }
        if (this.functionKeywordIsStartOfTheLongWord(keyword, text)) {
            return text;
        }
        let element: string = text.getStringBefore(keyword);
        let theRest: string = text.getStringAfter(keyword);
        let result: string = sample;
        let properties: FunctionProperties = this.getFunctionProperties(sample);

        result = result.replace(properties.element, element);
        return result + theRest;
    }
}

class MonadicFunction extends FunctionKeyword {
    translate(text: string, keyword: string, sample: string): string {
        keyword = " " + keyword.trim();
        if (!text.includes(keyword)) {
            return text;
        }
        if (this.functionKeywordIsStartOfTheLongWord(keyword, text)) {
            return text;
        }
        let element: string = text.getStringBefore(keyword);
        let param: string = text.getStringAfter(keyword);
        let result: string = sample;
        let properties: FunctionProperties = this.getFunctionProperties(sample);

        result = result.replace(properties.element, element);
        result = result.replace(properties.params[0], param);
        return result;
    }
}

export class FunctionKeywordTranslator {
    typesOfFunction: Array<FunctionKeyword> = [
        new NiladicFunction(),
        new MonadicFunction(),
    ];

    translate(text: string, keyword: string, sample: string): string {
        let countOfParam: number = this.getNumbersOfParameter(sample);
        if (countOfParam >= this.typesOfFunction.length) {
            countOfParam = this.typesOfFunction.length - 1;
        }
        let functionTranslator: FunctionKeyword = this.typesOfFunction[countOfParam];
        return functionTranslator.translate(text, keyword, sample);
    }

    private getNumbersOfParameter(functionSyntax: string): number {
        let totalElement: number = 1;
        let total: number = functionSyntax.split("$").length - 1 - totalElement;
        return total;
    }
}
