#!/usr/bin/env node
/**
 * Stop hook — refuses to let a chief-of-staff run end half-finished.
 *
 * The premise, borrowed from the design this repo is modelled on: instructions
 * get dropped, file checks do not. Everything below is deterministic.
 *
 * Arms only while `state/.run-active` exists, so ordinary sessions in this repo
 * are unaffected. The morning-brief skill writes that file at the start of a run
 * and removes it once the log is complete.
 *
 * Exit 0 = allow stop. Exit 2 = block, and stderr goes back to Claude.
 */

const fs = require('fs');
const path = require('path');

const REQUIRED_SECTIONS = [
    '## Open questions',
    '## Action',
    '## Meeting',
    '## Info',
    '## Skip',
    '## Follow-through',
];

function readStdin() {
    try {
        return fs.readFileSync(0, 'utf8');
    } catch {
        return '';
    }
}

function main() {
    let payload = {};
    try {
        payload = JSON.parse(readStdin() || '{}');
    } catch {
        // Malformed payload is not the run's fault. Don't block on it.
        process.exit(0);
    }

    // Already blocked once and Claude is retrying — never loop.
    if (payload.stop_hook_active) process.exit(0);

    const root = payload.cwd || process.cwd();
    const marker = path.join(root, 'state', '.run-active');
    if (!fs.existsSync(marker)) process.exit(0);

    const date = (fs.readFileSync(marker, 'utf8').trim() || '')
        .match(/^\d{4}-\d{2}-\d{2}$/)?.[0]
        || new Date().toISOString().slice(0, 10);

    const logPath = path.join(root, 'state', 'triage-log', `${date}.md`);
    const problems = [];

    if (!fs.existsSync(logPath)) {
        problems.push(`\`state/triage-log/${date}.md\` does not exist.`);
    } else {
        const log = fs.readFileSync(logPath, 'utf8');

        for (const section of REQUIRED_SECTIONS) {
            if (!log.includes(section)) {
                problems.push(`The log is missing its \`${section}\` section.`);
            }
        }

        const unchecked = log
            .split('\n')
            .filter((line) => /^\s*-\s*\[\s*\]/.test(line))
            .map((line) => line.trim());

        if (unchecked.length) {
            problems.push(
                `${unchecked.length} follow-through item(s) still unchecked:\n` +
                unchecked.map((u) => `    ${u}`).join('\n')
            );
        }
    }

    if (!problems.length) {
        // Log is complete but the marker survived — the run forgot to clear it.
        // Not worth blocking a finished run over; clean up and let it go.
        try { fs.unlinkSync(marker); } catch { /* nothing useful to do */ }
        process.exit(0);
    }

    process.stderr.write(
        'This chief-of-staff run is not finished. Before stopping:\n\n' +
        problems.map((p) => `  - ${p}`).join('\n') +
        '\n\nComplete the log at `state/triage-log/' + date + '.md` (structure is in ' +
        '`state/README.md`), tick every follow-through box, remove ' +
        '`state/.run-active`, then commit and push.\n'
    );
    process.exit(2);
}

main();
