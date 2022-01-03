import { DocumentSymbol, Range, Selection, SnippetString, TextEditor } from "vscode";
import { FunctionFinder } from "./function_finder";
export class ExplorerUtils {
    private constructor() {}

    static findFunctionsInCurrentFile(
        document: string,
        symbols: Array<DocumentSymbol>
    ): Array<DocumentSymbol> {
        let functionsInFile: Array<DocumentSymbol> = [];
        if (!symbols) {
            return functionsInFile;
        }

        const functionFinder = new FunctionFinder();
        for (const fnc of functionFinder.find(symbols)) {
            if (document.includes(fnc.name)) {
                functionsInFile.push(fnc);
            }
        }
        return functionsInFile;
    }

    static findCurrentFunction(
        editor: TextEditor,
        symbols: Array<DocumentSymbol>
    ): DocumentSymbol | null {
        const currentLineNumber: number = editor.selection.active.line;
        for (const symbol of symbols) {
            if (
                symbol.range.start.line <= currentLineNumber &&
                currentLineNumber <= symbol.range.end.line
            ) {
                return symbol;
            }
        }
        return null;
    }

    static goToLine({
        lineNumber,
        editor,
        endOfLine = true,
    }: {
        lineNumber: number;
        editor: TextEditor;
        endOfLine: boolean;
    }): void {
        if (lineNumber >= editor.document.lineCount) {
            return;
        }
        const range = editor.document.lineAt(lineNumber).range;
        editor.selection = new Selection(endOfLine ? range.end : range.start, range.end);
        editor.revealRange(range);
    }

    static insertSnippetToEditor({
        editor,
        text,
        lineNumber,
        endOfLine = true,
    }: {
        editor: TextEditor;
        text: string;
        lineNumber: number;
        endOfLine: boolean;
    }): void {
        ExplorerUtils.goToLine({ lineNumber, editor, endOfLine });
        editor.insertSnippet(new SnippetString(text));
    }
    static insertTextToEditor({
        editor,
        text,
        range,
    }: {
        editor: TextEditor;
        text: string;
        range: Range;
    }): void {
        editor.edit((editBuilder) => {
            editBuilder.insert(range.end, text);
        });
    }
}
