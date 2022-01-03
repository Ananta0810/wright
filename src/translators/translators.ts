import * as java from "../dictionaries/java";
import * as javascript from "../dictionaries/javascript";
import * as python from "../dictionaries/python";
import * as typescript from "../dictionaries/typescript";
import { Translator } from "./abstract_translator";
import { ForTranslator } from "./for_translator";
import { FunctionTranslator } from "./function_translator";
import { IfTranslor } from "./if_translator";
import { RegularTranslor } from "./regular_translator";

export class TranslatorFactory {
    translators: { [k: string]: Translator } = {
        default: new RegularTranslor(),
        if: new IfTranslor(),
        for: new ForTranslator(),
        fn: new FunctionTranslator(),
    };
    dictionaries: { [k: string]: any } = {
        js: javascript.dict,
        ts: typescript.dict,
        py: python.dict,
        java: java.dict,
    };

    getDictionary(type: string): { [k: string]: any } {
        if (!(type in this.dictionaries)) {
            throw new Error("Wright doesn't support this language.");
        }
        return this.dictionaries[type];
    }

    getTranslator(type: string): Translator {
        if (!(type in this.translators)) {
            return this.translators["default"];
        }
        return this.translators[type];
    }
}
