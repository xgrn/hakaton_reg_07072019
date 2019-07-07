<template>
    <div class="bl-wrapper">
        <div class="bl-buttons">
            <div v-for="(item, ind) in reports"
                 class="project-tab"
                 :class="{'active': id === item.id}"
                 :style="{width: `calc(100% / ${reports.length})`}"
                 @click="_load(item.id)"
            >{{ item.title }}</div>
        </div>
        <div class="toolbar">
            <input type="text" v-model="title" class="name" />
            <div class="action-buttons">
                <a href="#" @click.prevent="_save" class="save"></a>
                <a href="#" @click.prevent="_execute" class="run"></a>
            </div>
        </div>
        <div v-once>
            <div id="bl-workspace"></div>
            <xml id="toolbox" style="display: none" ref="toolbox">
                <category name="Настройки мониторинга">
                    <block type="controls_if"></block>
                    <block type="controls_repeat_ext"></block>
                    <block type="logic_compare"></block>
                    <block type="math_number"></block>
                    <block type="math_arithmetic"></block>
                </category>
                <category name="Источники данных">
                    <block type="src_road_official_quality"></block>
                </category>
                <category name="Настройки карты">
                    <block type="map_region"></block>
                    <block type="map_foreach_region"></block>
                    <block type="map_color"></block>
                    <block type="map_infobox"></block>
                </category>
            </xml>
        </div>
    </div>
</template>

<script>
    import '../blocks'
    import DataLoader from '../loader'

    export default {
        name: "blockly",
        props: {
            regions: {type: Object, required: true}
        },
        data() {
            return {
                id: null,
                title: 'Безымянный',
                ws: null,
                reports: []
            }
        },
        created() {
            this._populate();
        },
        async mounted() {
            await this.$nextTick();
            this.ws = Blockly.inject('bl-workspace', {toolbox: this.$refs.toolbox})
        },
        methods: {
            async _save() {
                const xml = Blockly.Xml.workspaceToDom(this.ws);
                const res = await this.$http.post(
                    '/api/report',
                    {id: this.id, title: this.title, report: Blockly.Xml.domToText(xml)}
                );
                this.id = res.data.data.id;
                this._populate();
            },
            async _load(id) {
                this.id = id;
                const res = await this.$http.get('/api/report/' + this.id);
                this.ws.clear();
                this.title = res.data.data.title;
                const xml = Blockly.Xml.textToDom(res.data.data.report);
                Blockly.Xml.domToWorkspace(xml, this.ws);
            },
            async _populate() {
                const res = await this.$http.get('/api/reports');
                this.reports = res.data.data;
            },
            async _execute() {
                const _hk_data = await DataLoader(this.ws.getAllBlocks().filter(block => block.type.indexOf('src_') === 0));
                Blockly.JavaScript.addReservedWords('code');
                const _hk_map_regions = this.regions;
                const $set = this.$set;
                try {
                    const code = Blockly.JavaScript.workspaceToCode(this.ws);
                    eval(code);
                } catch (e) {
                    throw e;
                }
            }
        }
    }
</script>

<style scoped>
     #bl-workspace {
         height: 600px;
         width: 100%;
         background: #ebecec;
     }

     .bl-wrapper {
         position: relative;
     }

     .toolbar {
         background: #ddd;
         padding: 10px 0 10px 290px;
         width: 100%;
         box-sizing: border-box;
         position: absolute;
         z-index: 10;
     }

     .name {
         font-size: 1.5em;
         padding: 5px 10px;
         border: none;
         border-radius: 3px;
     }

    .project-tab {
        text-transform: uppercase;
        display: inline-block;
        max-width: 200px;
        background: linear-gradient(90deg, rgba(44,75,152,1) 0%, rgba(0,136,206,1) 100%);
        border-radius: 15px 15px 0 0;
        padding: 10px 20px;
        box-sizing: border-box;
        cursor: pointer;
        margin-left: -20px;
        position: relative;
        color: #fff;
        letter-spacing: 1px;
    }

    .project-tab:first-child {
        margin-left: 0;
        border-left: none;
    }

    .project-tab.active {
        z-index: 1;
        background: linear-gradient(90deg, rgba(229,33,75,1) 0%, rgba(241,136,72,1) 100%);
        color: #023951;
    }

    .action-buttons {
        float: right;
        padding-right: 10px;
    }

    .action-buttons a {
        display: inline-block;
        width: 38px;
        height: 38px;
        background-size: cover;
    }

    .action-buttons a.save {
        background-image: url("~../assets/img/save.svg");
    }

     .action-buttons a.run {
         background-image: url("~../assets/img/run.svg");
     }

    #bl-workspace >>> .blocklyTreeRoot {
        padding: 0;
    }

    #bl-workspace >>> .blocklyTreeRow {
        padding: 10px!important;
        text-transform: uppercase;
        background: linear-gradient(90deg, rgba(44,75,152,1) 0%, rgba(0,136,206,1) 100%);
        color: #fff;
        margin: 0;
    }

    #bl-workspace >>> .blocklyTreeIcon {
        display: none!important;
    }

    #bl-workspace >>> .blocklyTreeRow:after {
        content: '';
        visibility: hidden;
        display: inline-block;
        width: 15px;
        height: 10px;
        background-image: url('~../assets/img/expanded.svg');
        background-size: contain;
        background-repeat: no-repeat;
        margin-left: 10px;
        transform: rotate(-90deg);
    }

     #bl-workspace >>> .blocklyTreeSelected:after {
         visibility: visible;
     }

    #bl-workspace >>> [aria-expanded=true] .blocklyTreeRow .blocklyTreeRow {
        background: #999;
    }
</style>