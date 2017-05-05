'use strict';

import * as _ from 'lodash';
import * as vscode from 'vscode';
import ParseEngineRegistry from './parse-engines/parse-engine-registry';

class Fetcher {
    static async findAllParseableDocuments(): Promise<vscode.Uri[]> {
        let exclude = 'node_modules/**/node_modules/**/*';

        let allFiles = await Promise.all(ParseEngineRegistry.supportedLanguagesIds.map(languageId => {
            return vscode.workspace.findFiles(`**/*.${languageId}`, exclude);
        }));

        let uris = _.flatten(allFiles);

        return uris;
    }
}

export default Fetcher;