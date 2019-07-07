const GLOBAL_REG_LIST = '_hk_map_regions';
const LOCAL_REG_VAR = '_hk_map_region';

Blockly.Blocks['map_foreach_region'] = {
    init() {
        this
            .appendDummyInput()
            .appendField('для каждого субъекта');
        this
            .appendStatementInput('DO')
            .appendField('выполнить');
    }
};

Blockly.JavaScript['map_foreach_region'] = block => {
    let code = `Object.keys(${GLOBAL_REG_LIST}).forEach(function(rg) {`;
    code += `let ${LOCAL_REG_VAR} = ${GLOBAL_REG_LIST}[rg];`;
    code += `$set(${LOCAL_REG_VAR}, 'color', null);`;
    code += `$set(${LOCAL_REG_VAR}, 'info', []);`;
    code += Blockly.JavaScript.statementToCode(block, 'DO');
    code += '});';
    return code;
};

Blockly.Blocks['map_color'] = {
    init() {
        this
            .appendValueInput('VALUE')
            .setCheck('Number')
            .appendField('назначить цвет');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.JavaScript['map_color'] = block => {
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    return `$set(${LOCAL_REG_VAR}, 'color', ${value});`;
};

Blockly.Blocks['map_infobox'] = {
    init() {
        this
            .appendValueInput('VALUE')
            .appendField('отобразить');
        this
            .appendDummyInput()
            .appendField('как')
            .appendField(new Blockly.FieldTextInput(''), 'LABEL');
        this
            .appendDummyInput()
            .appendField('ед.')
            .appendField(new Blockly.FieldTextInput(''), 'UNITS');
        this.setPreviousStatement(true);
        this.setNextStatement(true);
    }
};

Blockly.JavaScript['map_infobox'] = block => {
    const value = Blockly.JavaScript.valueToCode(block, 'VALUE', Blockly.JavaScript.ORDER_NONE);
    const label = block.getFieldValue('LABEL');
    const units = block.getFieldValue('UNITS');
    let code = LOCAL_REG_VAR + '.info.push(';
    code += `{label: "${label.replace('"', '\"')}", value: ${value} + '' + '${units}'}`;
    code += ');';
    return code;
};

Blockly.Blocks['map_region'] = {
    init() {
        this
            .appendDummyInput()
            .appendField('субъект');
        this.setOutput(true, 'String');
    }
};

Blockly.JavaScript['map_region'] = () => {
    return [`${LOCAL_REG_VAR}.title`, Blockly.JavaScript.ORDER_NONE];
};