import * as vscode from 'vscode';
import { execFile } from 'child_process';
import * as path from 'path';

// Configure o caminho para o seu JAR Kotlin
const jarPath = path.join(__dirname, '..', 'path/to/your/kotlin-intellisense/build/libs/kotlin-intellisense-1.0-SNAPSHOT.jar');

export function activate(context: vscode.ExtensionContext) {
    const provider = {
        provideCompletionItems(document: vscode.TextDocument, position: vscode.Position): Thenable<vscode.CompletionItem[]> {
            return new Promise((resolve, reject) => {
                const code = document.getText();
                execFile('java', ['-jar', jarPath, 'autocomplete', code], (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${stderr}`);
                        reject();
                    }
                    const suggestions = stdout.split('\n').map(s => new vscode.CompletionItem(s.trim(), vscode.CompletionItemKind.Text));
                    resolve(suggestions);
                });
            });
        }
    };

    context.subscriptions.push(vscode.languages.registerCompletionItemProvider('kotlin', provider));

    const bugfixProvider = {
        provideCodeActions(document: vscode.TextDocument, range: vscode.Range, context: vscode.CodeActionContext): Thenable<vscode.CodeAction[]> {
            return new Promise((resolve, reject) => {
                const code = document.getText();
                execFile('java', ['-jar', jarPath, 'bugfix', code], (error, stdout, stderr) => {
                    if (error) {
                        console.error(`Error: ${stderr}`);
                        reject();
                    }
                    const suggestions = stdout.split('\n').map(s => {
                        const fix = new vscode.CodeAction(s.trim(), vscode.CodeActionKind.QuickFix);
                        fix.edit = new vscode.WorkspaceEdit();
                        fix.edit.replace(document.uri, range, s.trim());
                        return fix;
                    });
                    resolve(suggestions);
                });
            });
        }
    };

    context.subscriptions.push(vscode.languages.registerCodeActionsProvider('kotlin', bugfixProvider));
}

export function deactivate() {}
