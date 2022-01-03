"use strict";
interface String {
    snakecase(): string;
    camelcase(): string;
    pascalcase(): string;
    clearSpace(): string;
    indentLines(): string;
    isLetter(): boolean;
    splitByWord(word: string): Array<string>;
    contains(word: string): boolean;
    getIndent(): string;
    getKey(): string;
    getFirstWord(): string;
    getLine(index: number): string;
    removeLine(index: number): string;
    getStringBefore(str: string): string;
    getStringAfter(str: string): string;
    getStringBetween(str: string, otherStr: string): string;
    hasWordOf(list: Array<string>): boolean;
}

String.prototype.snakecase = function (): string {
    if (this.trim().length === 0) {
        return this + "";
    }
    if (!/[a-zA-Z]/g.test(this + "")) {
        return this + "";
    }

    let stringWithoutIndent: string = this.trim();
    let stringWithoutIndentSnakeCase: string = stringWithoutIndent
        .splitByWord(" ")
        .join("_");
    return this.toLowerCase().replace(stringWithoutIndent, stringWithoutIndentSnakeCase);
};

String.prototype.camelcase = function (): string {
    if (this.trim().length === 0) {
        return this + "";
    }
    if (!/[a-zA-Z]/g.test(this + "")) {
        return this + "";
    }

    let stringWithoutIndent = this.trim();
    let stringWithoutIndentCamelCase = stringWithoutIndent
        .toLowerCase()
        .splitByWord(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join("");

    stringWithoutIndentCamelCase =
        stringWithoutIndentCamelCase[0].toLowerCase() +
        stringWithoutIndentCamelCase.slice(1);
    return this.replace(stringWithoutIndent, stringWithoutIndentCamelCase);
};

String.prototype.pascalcase = function (): string {
    if (this.trim().length === 0) {
        return this + "";
    }
    if (!/[a-zA-Z]/g.test(this + "")) {
        return this + "";
    }

    let stringWithoutIndent = this.trim();
    let stringWithoutIndentPascalCase = stringWithoutIndent
        .toLowerCase()
        .splitByWord(" ")
        .map((word) => word[0].toUpperCase() + word.slice(1))
        .join("");

    return this.replace(stringWithoutIndent, stringWithoutIndentPascalCase);
};

String.prototype.clearSpace = function (): string {
    if (this.length === 0) {
        return this + "";
    }
    let temp: string = this + "";
    temp = temp.trim();
    temp = temp.replace("( ", "(");
    temp = temp.replace(" )", ")");
    return temp.replace(/\s{2,}/g, " ");
};

String.prototype.indentLines = function (): string {
    if (this.length === 0) {
        return this + "";
    }
    const indent: string = this.getIndent();
    const lines: Array<string> = this.trim().split("\n");
    return indent + lines.join("\n" + indent);
};

String.prototype.isLetter = function (): boolean {
    if (this.length === 0) {
        return false;
    }
    let temp: string = this + "";
    return temp.toLowerCase() !== temp.toUpperCase();
};

String.prototype.splitByWord = function (word: string): Array<string> {
    let temp = this + "";
    if (this.startsWith(word)) {
        temp = temp.slice(word.length);
    }
    if (this.endsWith(word)) {
        temp = temp.slice(0, this.length - word.length);
    }
    if (this.includes(" " + word + " ")) {
        word = " " + word + " ";
    } else if (this.includes(" " + word)) {
        word = " " + word;
    } else if (this.includes(word + " ")) {
        word = word + " ";
    }
    return temp.split(word).filter((_word) => _word);
};

String.prototype.contains = function (word: string): boolean {
    if (this.includes(" " + word + " ")) {
        return true;
    }
    if (this.includes(" " + word) && this.startsWith(word)) {
        return true;
    }
    if (this.includes(word + " ") && this.endsWith(word)) {
        return true;
    }
    return false;
};

String.prototype.getIndent = function (): string {
    if (this.length === 0) {
        return "";
    }
    let indent: string = "";
    for (var i = 0; i < this.length; i++) {
        if (this[i] !== " ") {
            break;
        }
        indent += this[i];
    }
    return indent;
};

String.prototype.getKey = function (): string {
    if (this.trim().toLowerCase().endsWith("s")) {
        return this.trim().slice(0, -1);
    }
    return "element";
};

String.prototype.getFirstWord = function (): string {
    if (this.length === 0) {
        return this + "";
    }
    if (!this.trim().includes(" ")) {
        return this + "";
    }
    return this.trim().slice(0, this.trim().indexOf(" "));
};
String.prototype.getLine = function (index: number): string {
    if (this.length === 0) {
        return this + "";
    }
    let lines: Array<string> = this.split("\n");
    lines = lines.filter((line) => line.trim());
    if (lines.length === 0) {
        return this + "";
    }
    return lines[index];
};
String.prototype.removeLine = function (index: number): string {
    if (this.length === 0) {
        return this + "";
    }
    let lines: Array<string> = this.split("\n");
    lines = lines.filter((line) => line.trim());
    if (lines.length === 0) {
        return this + "";
    }
    lines.splice(index, 1);
    return lines.join("\n");
};

String.prototype.getStringBefore = function (str: string): string {
    if (this.length === 0) {
        return this + "";
    }
    if (str.length === 0) {
        return this + "";
    }
    if (!this.includes(str)) {
        return "";
    }
    const slicePosition: number = this.indexOf(str);
    if (slicePosition <= 0) {
        return "";
    }
    return this.slice(0, slicePosition);
};

String.prototype.getStringAfter = function (str: string): string {
    if (this.length === 0) {
        return this + "";
    }
    if (str.length === 0) {
        return this + "";
    }
    if (!this.includes(str)) {
        return "";
    }
    return this.slice(this.indexOf(str) + str.length);
};

String.prototype.getStringBetween = function (str: string, otherStr: string): string {
    if (this.length === 0) {
        return this + "";
    }

    if (!this.includes(str)) {
        return this.includes(otherStr) ? str.slice(0, str.lastIndexOf(otherStr)) : "";
    }

    if (!this.includes(otherStr)) {
        return this.slice(this.indexOf(str) + str.length);
    }

    return this.substring(this.lastIndexOf(str) + str.length, this.lastIndexOf(otherStr));
};

String.prototype.hasWordOf = function (list: Array<string>): boolean {
    if (this.length === 0) {
        return false;
    }
    var words = this.splitByWord(" ");
    for (let word of words) {
        if (word in list) {
            return true;
        }
    }
    return false;
};
