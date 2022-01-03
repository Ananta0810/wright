"use strict";
import "../stringify/string.extensions";
import { Translator } from "./abstract_translator";
import { Translation } from "./translation";

export class ForTranslator extends Translator {
    constructor() {
        super();
    }

    translate(text: string): Translation {
        const indent = text.getIndent();
        text = text.trim();
        let content: string = (indent + this._getContent(text)).indentLines();
        return new Translation(content);
    }

    private _getContent(text: string): string {
        text = text.replace("for", "");
        let conditionType: string = this._getConditionType(text);
        let condition: string = this._translateConditionBaseOnType(text, conditionType);

        const syntax: string = this.dict["for"]["syntax"];
        let content: string = syntax.split("$condition").join(condition);
        content = content.replace("$indent", this.indent);
        return content;
    }

    private _getConditionType(text: string): string {
        let isPluralNoun: boolean = text.endsWith("s") || text.endsWith("es");
        if (isPluralNoun || text.includes("list")) {
            return "iterator";
        }
        return "loop";
    }

    private _translateConditionBaseOnType(text: string, type: string): string {
        let condition: string = this.dict["for"][type];
        if (type === "loop") {
            return condition.replace("$value", text.trim());
        }
        return this._translateIteratorCondition(condition, text);
    }

    private _translateIteratorCondition(condition: string, text: string): string {
        let parent: string = this.applyTextCase(text).trim();
        let child: string = this._getChildOfParent(text).trim();
        if (condition.includes("type")) {
            let type: string = child.pascalcase();
            condition = condition.split("$type").join(type);
        }
        condition = condition.replace("$parent", parent);
        condition = condition.replace("$child", child);
        return condition;
    }

    private _getChildOfParent(parent: string): string {
        parent = parent.toLowerCase();
        if (parent.endsWith("es")) {
            return this.applyTextCase(parent.slice(0, parent.lastIndexOf("es")));
        }
        if (parent.endsWith("s")) {
            return this.applyTextCase(parent.slice(0, parent.lastIndexOf("s")));
        }
        let child: string = parent.toLowerCase().replace(/list of|list/, "");
        child = this.applyTextCase(child).trim();
        return child;
    }
}
