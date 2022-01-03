import { Translator } from "./abstract_translator";
import { Translation } from "./translation";
import { TranslatorFactory } from "./translators";

export class CodeTranslator {
    camelcase: boolean = true;

    translate(text: string, language: string): Translation {
        let factory: TranslatorFactory = new TranslatorFactory();
        let signal: string = text.getFirstWord();
        let translator: Translator = factory.getTranslator(signal);
        let dictionary: { [k: string]: any } = factory.getDictionary(language);
        translator.setDictionary(dictionary);
        translator.setCamelcase(this.camelcase);
        return translator.translate(text);
    }

    setCamelcase(a0: boolean): void {
        this.camelcase = a0;
    }
}
