import * as assert from 'assert';
import * as vscode from 'vscode';
import CssParseEngine from '../src/parse-engines/types/css-parse-engine';
import { getFile } from './util';

// Defines a Mocha test suite to group tests of similar kind together
suite('CSS Parsing Tests', () => {
  let parseEngine: CssParseEngine = new CssParseEngine();

  test('languageId is css', () => {
    assert.equal(parseEngine.languageId, 'css', 'CSS languageId is not css')
  })

  test('parse out each class name', async () => {
    const document = await vscode.workspace.openTextDocument(getFile('test.css'));
    const definitions = parseEngine.parse(document);

    assert.equal(definitions.length, 4);
    assert.deepEqual(definitions.map(d => d.className), [
      'class-1',
      'class-1',
      'class-2',
      'class-3',
    ])
  })
});