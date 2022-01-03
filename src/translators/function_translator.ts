"use strict";
import "../stringify/string.extensions";
import { Translator } from "./abstract_translator";
import { Translation } from "./translation";

export class FunctionTranslator extends Translator {
    constructor() {
        super();
    }

    translate(text: string): Translation {
        const indent = text.getIndent();
        text = text.trim();
        let functionContent: { call: string; declaration: string } =
            this._getContent(text);
        let content: string = (indent + functionContent.call).indentLines();
        let extraFunction: string = functionContent.declaration;
        return new Translation(content, extraFunction);
    }

    private _getContent(text: string): { call: string; declaration: string } {
        text = text.replace("fn", "");
        text = text.clearSpace();
        let typeOfFunction: string = this._getTypeOfFunction(text);
        text = this._removeFunctionTypeFromText(text).clearSpace();

        let functionName: string = this.applyTextCase(text.clearSpace());
        let syntaxs: { [k: string]: string } = this.dict["function"];

        let functionCalling: string = syntaxs["call"]
            .split("$functionName")
            .join(functionName)
            .replace("$type", typeOfFunction);

        let functionDecalarion: string = syntaxs["declaration"]
            .split("$functionName")
            .join(functionName);
        functionDecalarion = functionDecalarion.replace("$type", typeOfFunction);
        functionDecalarion = functionDecalarion.replace("$indent", this.indent);

        return {
            call: functionCalling,
            declaration: functionDecalarion,
        };
    }

    protected _removeFunctionTypeFromText(text: string): string {
        if (text.startsWith("_")) {
            return text.replace("_", "");
        }
        if (text.startsWith("__")) {
            return text.replace("__", "");
        }
        return text;
    }

    private _getTypeOfFunction(text: string) {
        let types: { [k: string]: string } = this.dict["function"]["types"];
        if (text.startsWith("_")) {
            return types["protected"];
        }
        if (text.startsWith("__")) {
            return types["private"];
        }
        return types["public"];
    }

    doSomeThing(): void {}
}
