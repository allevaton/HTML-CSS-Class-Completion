'use strict';

import * as css from 'css';
import * as less from 'less';
import * as vscode from 'vscode';
import CssClassDefinition from '../../common/css-class-definition';
import ParseEngine from '../common/parse-engine';

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
        } catch (error) {
            return [];
        }

        // go through each of the rules...
        codeAst.stylesheet.rules.forEach((rule: css.Rule) => {
            // ...of type rule
            if (rule.type === 'rule') {
                // go through each of the selectors of the current rule 
                rule.selectors.forEach((selector: string) => {
                    let classNameRegex: RegExp = /[.]([\w-]+)/g;
                    let item: RegExpExecArray = null;

                    while (item = classNameRegex.exec(selector)) {
                        definitions.push(new CssClassDefinition(item[1]));
                    }
                });
            }
        });

        return definitions;
    }
}

export default LessParseEngine;