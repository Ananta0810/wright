export class Translation {
    content: string;
    extraFunction: string;

    constructor(content: string = '', extraFunction: string = '') {
        this.content = content;
        this.extraFunction = extraFunction;
    }

    hasFunction(): boolean {
        return this.extraFunction !== '';
    }
}
