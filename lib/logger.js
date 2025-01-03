const chalk = require('chalk');

module.exports = (m) => {
    const icons = {
        chat: '→',
        type: '★',
        name: '♥',
        subject: '•'
    };
    
    const createBox = (content) => {
        const lines = content.split('\n');
        const width = Math.max(...lines.map(line => line.length)) + 2;
        const top = '╭' + '─'.repeat(width) + '╮';
        const bottom = '╰' + '─'.repeat(width) + '╯';
        const boxed = lines.map(line => '│ ' + line + ' '.repeat(width - line.length - 1) + '│');
        return [top, ...boxed, bottom].join('\n');
    };

    let content = [];
    
    content.push(`${icons.chat} ${chalk.gray('Source')}  ${chalk.cyan.bold(m.isGroup ? 'Group Chat' : 'Private Chat')}`);
    content.push(`${icons.type} ${chalk.gray('Type')}    ${chalk.magenta.bold(m.type)}`);
    content.push(`${icons.name} ${chalk.gray('Name')}    ${chalk.yellow.bold(m.pushName)}`);
    
    if (m.isGroup) {
        content.push(`${icons.subject} ${chalk.gray('Subject')}  ${chalk.green.bold(m.metadata.subject)}`);
    }

    const title = chalk.cyan.bold('✧━━━ Chat Information Dashboard ━━━✧');
    const boxContent = content.join('\n');
    const styledBox = createBox(boxContent);
    const separator = chalk.cyan('━'.repeat(50));
    const timestamp = chalk.gray(`[${new Date().toLocaleTimeString()}]`);

    const finalDisplay = `
${separator}
${title}
${chalk.cyan(styledBox)}
${timestamp}
${separator}
`;

    console.log(finalDisplay);
};