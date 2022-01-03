"use strict";
import "../../stringify/string.extensions";
import { FunctionKeyword } from "../functions/abstract_function";
export class NotKeyword extends FunctionKeyword {
    keyword: string = "not";

    translate(text: string, sample: string): string {
        let before: string = text.getStringBefore(this.keyword).trim();
        let after: string = text.getStringAfter(this.keyword).trim();
        if (!/[a-zA-Z0-9 [](){}]/.test(after)) {
            after = `(${after})`;
        }

        let result: string = sample;
        result = result.replace("$before", before);
        result = result.replace("$after", after);
        return result;
    }
}
