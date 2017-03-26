'use strict';var _express = require('express');var _express2 = _interopRequireDefault(_express);
var _graphqlServerExpress = require('graphql-server-express');
var _graphql = require('graphql');
var _bodyParser = require('body-parser');var _bodyParser2 = _interopRequireDefault(_bodyParser);
var _cors = require('cors');var _cors2 = _interopRequireDefault(_cors);
var _http = require('http');
var _subscriptionsTransportWs = require('subscriptions-transport-ws');
var _schemaPrinter = require('graphql/utilities/schemaPrinter');


var _subscriptions = require('./data/subscriptions');
var _schema = require('./data/schema');var _schema2 = _interopRequireDefault(_schema);

var _graphqlType = require('./data/graphqlType');function _interopRequireDefault(obj) {return obj && obj.__esModule ? obj : { default: obj };}var mongoose = require('mongoose');
console.log('hi');
var GRAPHQL_PORT = 8080;
var WS_PORT = 8090;


var graphQLServer = (0, _express2.default)().use('*', (0, _cors2.default)());

var db = mongoose.connect("mongodb://localhost:27017/test");

graphQLServer.use('/graphql', _bodyParser2.default.json(), (0, _graphqlServerExpress.graphqlExpress)({
  schema: _schema2.default,
  context: {} }));


graphQLServer.use('/graphiql', (0, _graphqlServerExpress.graphiqlExpress)({
  endpointURL: '/graphql' }));


graphQLServer.use('/schema', function (req, res) {
  res.set('Content-Type', 'text/plain');
  res.send((0, _schemaPrinter.printSchema)(_schema2.default));
});

graphQLServer.listen(GRAPHQL_PORT, function () {return console.log('GraphQL Server is now running on http://localhost:' +
  GRAPHQL_PORT + '/graphql');});


// WebSocket server for subscriptions
var websocketServer = (0, _http.createServer)(function (request, response) {
  response.writeHead(404);
  response.end();
});

websocketServer.listen(WS_PORT, function () {return console.log( // eslint-disable-line no-console
  'Websocket Server is now running on http://localhost:' + WS_PORT);});


// eslint-disable-next-line
new _subscriptionsTransportWs.SubscriptionServer(
{ subscriptionManager: _subscriptions.subscriptionManager },
websocketServer);
//# sourceMappingURL=server.js.map