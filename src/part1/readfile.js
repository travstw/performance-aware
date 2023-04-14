import * as fs from 'node:fs/promises';

export function readFile(name) {
    return fs.readFile(name);
}
