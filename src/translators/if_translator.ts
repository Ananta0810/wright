"use strict";
import "../stringify/string.extensions";
import { Translator } from "./abstract_translator";
import { NotKeyword } from "./changeable_with_syntax_keywords/not";
import { Translation } from "./translation";
export class IfTranslor extends Translator {
    constructor() {
        super();
    }

    translate(text: string): Translation {
        const indent = text.getIndent();
        text = text.trim();
        let content: string = (indent + this.getContent(text)).indentLines();
        return new Translation(content);
    }

    private getContent(text: string): string {
        text = text.replace("if", "");
        text = text.clearSpace();
        let content: string = this.dict["if"]["syntax"];
        content = this.fillContentCondition(content, text);
        content = content.replace("$indent", this.indent);
        return content;
    }

    private validateVariableDeclaration(condition: string): boolean {
        return /^[a-zA-Z0-9_]*$/.test(condition.trim());
    }

    private fillContentCondition(content: string, text: string): string {
        let condition: string = this.translateCondition(text);

        if (condition.startsWith("not")) {
            content = this.translateContentWithNotKeyword(content, condition);
        } else {
            content = content.split("$condition").join(condition);
        }

        const canDeclareVariable: boolean = this.validateVariableDeclaration(condition);
        if (!canDeclareVariable) {
            const variableDeclarationLineNumber: number = 0;
            content = content.removeLine(variableDeclarationLineNumber);
        }
        return content;
    }

    private translateContentWithNotKeyword(content: string, condition: string): string {
        const notKeyword: NotKeyword = new NotKeyword();
        const notKeywordSyntax: string =
            this.dict["keywords"]["changeableWithSyntax"]["not"];

        let conditionDeclaration: string = condition.replace("not", "");
        let conditionInsideFunctionCalling = notKeyword.translate(
            condition,
            notKeywordSyntax
        );

        content = content.replace("$condition", conditionDeclaration.trim());
        content = content.replace("$condition", conditionInsideFunctionCalling.trim());
        return content;
    }

    private translateCondition(condition: string): string {
        return this.translateSentence(condition.trim(), this.dict["if"]["exceptions"]);
    }
}
