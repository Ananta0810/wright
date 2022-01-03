"use strict";
import { DocumentSymbol, SymbolKind } from "vscode";
import { Finder } from "./finder_abstract";

export class FunctionFinder extends Finder {
    find(symbols: DocumentSymbol[]): DocumentSymbol[] {
        var functions = symbols.filter(
            (symbol) =>
                symbol.kind === SymbolKind.Function ||
                symbol.kind === SymbolKind.Method ||
                symbol.kind === SymbolKind.Constructor
        );
        return functions.concat(
            symbols
                .map((symbol) => this.find(symbol.children))
                .reduce((a, b) => a.concat(b), [])
        );
    }
}
