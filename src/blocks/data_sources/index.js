const LOCAL_REG_VAR = '_hk_map_region';

const yearList = () => {
    let cur = 2007;
    return Array.apply(null, Array(12)).map(() => [cur + '',(cur++) + '']);
};

Blockly.Blocks['src_road_official_quality'] = {
    init() {
        this
            .appendDummyInput()
            .appendField('% соответствия дорог ГОСТ')
            .appendField('за')
            .appendField(new Blockly.FieldDropdown(yearList()), 'YEAR');
        this.setOutput(true, 'Number');
    }
};

Blockly.JavaScript['src_road_official_quality'] = block => {
    let out = '(function() {';
    out += `let dt = _hk_data['${block.id}'][0].find(item => item.region === ${LOCAL_REG_VAR}.title);`;
    out += 'return dt ? dt.quality : null;';
    out += '})()';
    return [out, Blockly.JavaScript.ORDER_FUNCTION_CALL];
};