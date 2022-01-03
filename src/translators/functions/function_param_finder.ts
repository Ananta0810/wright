export class FunctionProperties {
    element: string;
    params: Array<string>;

    constructor(element: string, params: Array<string>) {
        this.element = element;
        this.params = params;
    }
}

export class FunctionPropertiesFinder {
    find(text: string): FunctionProperties {
        let properties: Array<string> = this.getProperties(text);

        const element: string = this.getElement(properties);
        properties = properties.filter((property) => property !== element);

        const params: Array<string> = this.getParams(properties);
        return new FunctionProperties(element, params);
    }

    private getProperties(text: string): Array<string> {
        let properties: Array<string> = text.split(/[ .()]/);
        properties = properties.filter((property) => property.includes("$"));
        if (properties.length === 0) {
            throw new Error("Wrong syntax for function");
        }
        return properties;
    }

    private getElement(properties: Array<string>): string {
        let element: string = properties[0];
        for (const property of properties) {
            if (!property.startsWith("$0")) {
                continue;
            }
            return property;
        }
        return element;
    }

    private getParams(properties: Array<string>): Array<string> {
        return properties.filter((property) => !property.startsWith("$0"));
    }
}
