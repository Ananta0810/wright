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
