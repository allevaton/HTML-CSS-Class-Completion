import * as css from 'css';
import * as vscode from 'vscode';
import CssClassDefinition from '../../common/css-class-definition';
import ParseEngine from '../common/parse-engine';
import CssClassExtractor from '../common/css-class-extractor';

class CssParseEngine implements ParseEngine {
    public languageId: string = 'css';

    public async parse(textDocument: vscode.TextDocument): Promise<CssClassDefinition[]> {
        let code: string = textDocument.getText();
        let codeAst: css.Stylesheet = css.parse(code);

        return CssClassExtractor.extract(codeAst);
    }
}

export default CssParseEngine;