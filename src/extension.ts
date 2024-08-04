import * as vscode from 'vscode';

export function activate(context: vscode.ExtensionContext) {
    let insertCurrentWeekCommand = vscode.commands.registerCommand('extension.insertCurrentWeek', async () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const currentWeek = getWeekRange(new Date());
            editor.edit(editBuilder => {
                editBuilder.insert(editor.selection.active, currentWeek);
            });
        }
    });

	let insertNextWeekCommand = vscode.commands.registerCommand('extension.insertNextWeek', async () => {
		const editor = vscode.window.activeTextEditor;
		if (editor) {
			const nextWeek = getWeekRange(new Date(Date.now() + 7 * 24 * 60 * 60 * 1000));
			editor.edit(editBuilder => {
				editBuilder.insert(editor.selection.active, nextWeek);
			});
		}
	});

    context.subscriptions.push(insertCurrentWeekCommand);
	context.subscriptions.push(insertNextWeekCommand);
}

export function getWeekRange(day: Date): string {
    const dayOfWeek = day.getDay();
    const diff = day.getDate() - dayOfWeek + (dayOfWeek === 0 ? -6 : 1);
    const monday = new Date(day.setDate(diff));
	const sunday = new Date(day.setDate(diff + 6));
    const yearStart = new Date(day.getFullYear(), 0, 1);
    const weekNumber = Math.ceil((((monday.getTime() - yearStart.getTime()) / 86400000) + 1) / 7);
    return `${monday.toISOString().split('T')[0]}--${sunday.toISOString().split('T')[0]} W${weekNumber}`;
}

export function deactivate() {}