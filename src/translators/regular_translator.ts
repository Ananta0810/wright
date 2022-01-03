"use strict";
import "../stringify/string.extensions";
import { Translator } from "./abstract_translator";
import { Translation } from "./translation";

export class RegularTranslor extends Translator {
    constructor() {
        super();
    }

    translate(text: string): Translation {
        const indent = text.getIndent();
        text = text.trim();
        let content: string = (indent + this.translateSentence(text)).indentLines();
        return new Translation(content);
    }
}
