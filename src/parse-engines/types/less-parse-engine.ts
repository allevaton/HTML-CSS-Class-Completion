import * as path from 'path';

import * as css from 'css';
import * as less from 'less';
import * as vscode from 'vscode';
import CssClassDefinition from '../../common/css-class-definition';
import ParseEngine from '../common/parse-engine';
import CssClassExtractor from '../common/css-class-extractor';

class LessParseEngine implements ParseEngine {
    public languageId: string = 'less';

    public async parse(textDocument: vscode.TextDocument): Promise<CssClassDefinition[]> {
        let definitions: CssClassDefinition[] = [];

        let code = textDocument.getText();
        let codeAst: css.Stylesheet;

        // TODO: LESS @imports prefixed with ~ will fail
        
        try {
            const { css: cssString } = await less.render(code, {
                // Fixes relative imports
                filename: path.resolve(textDocument.fileName)
            });
            codeAst = css.parse(cssString);
            return CssClassExtractor.extract(codeAst);
        } catch (error) {
            return [];
        }
    }
}

export default LessParseEngine;