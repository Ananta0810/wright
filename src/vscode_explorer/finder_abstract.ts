"use strict";
import { DocumentSymbol } from "vscode";
export abstract class Finder {
    abstract find(symbols: DocumentSymbol[]): DocumentSymbol[];
}
