import { readFile } from './readfile.js';
import { decode } from './decode.js';

async function loadFileAndDecode(filename) {
    const buffer = await readFile(filename);
    const bytes = new Uint8Array(buffer);
    
    const instructions = decode(bytes);
    printInstructions(instructions);
}

function printInstructions(instructions) {
    console.log('bits 16\n');
    console.log(instructions.join('\n'));
}

loadFileAndDecode('../../assets/perfaware/part1/listing_0038_many_register_mov');

