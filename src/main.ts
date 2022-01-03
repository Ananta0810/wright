import { commands, DocumentSymbol, TextEditor } from "vscode";
import { CodeTranslator } from "./translators/code_translator";
import { Translation } from "./translators/translation";
import { ExplorerUtils } from "./vscode_explorer/vscode_explorer_utils";

export function doTranslate(editor: TextEditor, translator: CodeTranslator) {
    let translation: Translation = getTranslation(editor, translator);
    if (!translation) {
        return;
    }
    const currentLineNumber: number = editor.selection.active.line;

    ExplorerUtils.insertSnippetToEditor({
        editor,
        text: translation.content,
        lineNumber: currentLineNumber,
        endOfLine: false,
    });
    if (translation.hasFunction()) {
        insertFunction(editor, translation.extraFunction);
    }
}

function insertFunction(editor: TextEditor, functionContent: string) {
    commands
        .executeCommand<DocumentSymbol[]>(
            "vscode.executeDocumentSymbolProvider",
            editor.document.uri
        )
        .then((symbols) => {
            symbols = ExplorerUtils.findFunctionsInCurrentFile(
                editor.document.getText(),
                symbols
            );
            const currentFunction = ExplorerUtils.findCurrentFunction(editor, symbols);
            if (!currentFunction) {
                return;
            }
            let functionIndent: string = editor.document
                .lineAt(currentFunction.range.start.line)
                .text.getIndent();
            functionContent = (functionIndent + functionContent).indentLines();
            ExplorerUtils.insertTextToEditor({
                editor,
                text: "\n\n" + functionContent,
                range: currentFunction.range,
            });
        });
}

function getTranslation(editor: TextEditor, translator: CodeTranslator): Translation {
    let fileName: string = editor.document.fileName;

    // Ex: fileName: abc.py ==> language is 'py'
    let language: string = fileName.slice(fileName.lastIndexOf(".") + 1);

    let text: string = editor.document.lineAt(editor.selection.active.line).text;
    return translator.translate(text, language);
}
