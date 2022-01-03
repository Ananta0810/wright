"use strict";
import { commands, ExtensionContext, window } from "vscode";
import { doTranslate } from "./main";
import { CodeTranslator } from "./translators/code_translator";

export function activate(context: ExtensionContext) {
    const translator: CodeTranslator = new CodeTranslator();

    let disposable = commands.registerCommand("wright.translate", () => {
        const editor = window.activeTextEditor;
        if (!editor) {
            return;
        }
        doTranslate(editor, translator);
    });
    const switchCamelCase = commands.registerCommand("wright.camelcase", () => {
        translator.setCamelcase(true);
    });

    const switchSnakeCase = commands.registerCommand("wright.snakecase", () => {
        translator.setCamelcase(false);
    });

    context.subscriptions.push(disposable);
    context.subscriptions.push(switchCamelCase);
    context.subscriptions.push(switchSnakeCase);
}

export function deactivate() {}
