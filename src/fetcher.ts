'use strict';

import * as vscode from 'vscode';
import ParseEngineRegistry from './parse-engines/parse-engine-registry';

class Fetcher {
    static async findAllParseableDocuments(): Promise<vscode.Uri[]> {
        let exclude = 'node_modules/**/node_modules/**/*';

        let allFiles = await Promise.all(ParseEngineRegistry.supportedLanguagesIds.map(languageId => {
            return vscode.workspace.findFiles(`**/*.${languageId}`, exclude);
        }));

        let uris = allFiles.reduce((prev, next) => ([
            ...prev,
            ...next
        ]), [])

        return uris;
    }
}

export default Fetcher;