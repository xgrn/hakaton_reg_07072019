const Express = require('express');
const ReportStorage = require('./src/report/ReportStorage');
const DataLoader = require('./src/data/loader');
const BodyParser = require('body-parser');

const app = new Express();

app.use('/static', Express.static('dist'));
app.use('/blockly', Express.static('blockly'));
app.use(BodyParser.json());

app.get('/', (req, res, next) => {
    res.sendFile(__dirname + '/index.html', next);
});

app.post('/api/report', async (req, res, next) => {
    const id = await ReportStorage.save(req.body.id, req.body.title, req.body.report);
    res.send({status: 'ok', data: {id: id}});
    next();
});

app.get('/api/report/:id', async (req, res, next) => {
    res.send({
        status: 'ok',
        data: await ReportStorage.get(req.params.id)
    });
    next();
});

app.get('/api/reports', async (req, res, next) => {
    res.send({
        status: 'ok',
        data: await ReportStorage.loadAll()
    });
    next();
});

app.get('/api/data/:loader', async (req, res, next) => {
    res.send({
        status: 'ok',
        data: await DataLoader.load(req)
    });
    next();
});

app.listen(3080, function() {
    console.log('Server started on 3080');
});