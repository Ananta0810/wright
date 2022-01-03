"use strict";
import "../stringify/string.extensions";
import { FunctionKeywordTranslator } from "./functions/function_types";
import { Translation } from "./translation";

export abstract class Translator {
    dict: { [k: string]: string | any };
    isCamelcase: boolean;
    indent: string;
    constructor() {
        this.dict = {};
        this.isCamelcase = true;
        this.indent = "    ";
    }
    abstract translate(text: string): Translation;

    setDictionary(dictionary: { [key: string]: string | any }): void {
        this.dict = dictionary;
    }

    setCamelcase(a0: boolean): void {
        this.isCamelcase = a0;
    }

    protected applyTextCase(text: string): string {
        return this.isCamelcase ? text.camelcase() : text.snakecase();
    }

    protected translateSentence(
        text: string,
        exceptions?: Set<string> | null | undefined
    ) {
        text = this._translateLanguageKeyword(text);
        text = this._translateFunctionsKeyword(text, exceptions);
        text = this._translateWordsWhichIsNotKeyword(text);
        text = text.clearSpace();
        return text;
    }

    private _translateLanguageKeyword(text: string): string {
        const keywords: { [k: string]: string } = this.dict["keywords"]["changeable"];
        for (var [keyword, replacemenet] of Object.entries(keywords)) {
            keyword = ` ${keyword}`;
            if (!text.includes(keyword)) {
                continue;
            }
            if (this._functionKeywordIsStartOfTheLongWord(keyword, text)) {
                continue;
            }
            replacemenet = ` ${replacemenet}`;
            text = text.replace(keyword, replacemenet);
        }
        return text;
    }

    private _functionKeywordIsStartOfTheLongWord(keyword: string, text: string): boolean {
        let stringAfterKeyword: string = text.getStringAfter(keyword);
        return stringAfterKeyword.charAt(0).isLetter();
    }

    private _translateWordsWhichIsNotKeyword(text: string): string {
        const words: Array<string> = this._getWordsWhichIsNotKeyword(text);
        for (const word of words) {
            let hasSpaceToApplyCaseText: boolean = word.trim().indexOf(" ") !== -1;
            if (!hasSpaceToApplyCaseText) {
                continue;
            }
            text = text.replace(word, this.applyTextCase(word));
        }
        return text;
    }

    private _translateFunctionsKeyword(
        text: string,
        exceptions?: Set<string> | null | undefined
    ): string {
        let functions: { [k: string]: string } = this.dict.functions;
        const functionKeywordTranslator: FunctionKeywordTranslator =
            new FunctionKeywordTranslator();

        for (const [functionName, syntax] of Object.entries(functions)) {
            if (!text.includes(functionName)) {
                continue;
            }
            if (exceptions && exceptions.has(functionName)) {
                continue;
            }
            text = functionKeywordTranslator.translate(text, functionName, syntax);
        }
        return text;
    }

    private _getRegexForKeywords(): RegExp {
        const keywords: Array<string> = this.dict["keywords"]["unchangeable"];
        let regexAsString: string = "[^a-zA-Z0-9 ]";
        for (const keyword of keywords) {
            regexAsString += "|" + keyword;
        }
        return new RegExp(regexAsString);
    }

    private _getWordsWhichIsNotKeyword(text: string): Array<string> {
        const keywordsRegex: RegExp = this._getRegexForKeywords();
        let wordsWhichIsNotKeyword: Array<string> = text.split(keywordsRegex);
        wordsWhichIsNotKeyword = wordsWhichIsNotKeyword.filter((word) =>
            String(word).trim()
        );
        return wordsWhichIsNotKeyword;
    }
}
