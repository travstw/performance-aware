

const opcodes = new Map([
    [0b100010, 'mov']
]);

const registers = new Map([
    [0b000, ['al', 'ax']],
    [0b001, ['cl', 'cx']],
    [0b010, ['dl', 'dx']],
    [0b011, ['bl', 'bx']],
    [0b100, ['ah', 'sp']],
    [0b101, ['ch', 'bp']],
    [0b110, ['dh', 'si']],
    [0b111, ['bh', 'di']]
]);

export function decode(bytes) {
    const instructions = [];

    // this will only work if mod === 11 ... will need to refactor when/if we care about the other bytes
    for (let i = 0; i < bytes.length; i+=2) {
        const [opcode, d, w] = decodeOpcode(bytes[i]);
        const [mod, toReg, fromReg] = decodeRegisters(bytes[i + 1]);
        instructions.push(getInstruction(opcode, w, toReg, fromReg));
    }

    return instructions;
}

function decodeOpcode(byte) {
    const opcode = byte >> 2;
    const d = byte >> 1 & 0b1;
    const w = byte & 0b1;

    return [opcode, d, w];
}

function decodeRegisters(byte) {
    const mod = byte >> 6;
    const toReg = byte & 0b111;
    const fromReg = byte >> 3 & 0b111;
    
    
    return [mod, toReg, fromReg];
}

function getInstruction(opcode, w, toReg, fromReg) {
    const opcodeName = opcodes.get(opcode);
    const toRegName = registers.get(toReg)[w];
    const fromRegName = registers.get(fromReg)[w];
        
    return `${opcodeName} ${toRegName}, ${fromRegName}`;
}