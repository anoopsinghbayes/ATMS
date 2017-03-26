'use strict';Object.defineProperty(exports, "__esModule", { value: true });var _extends = Object.assign || function (target) {for (var i = 1; i < arguments.length; i++) {var source = arguments[i];for (var key in source) {if (Object.prototype.hasOwnProperty.call(source, key)) {target[key] = source[key];}}}return target;};var _graphql = require('graphql');













var randomName = function randomName(len) {
    var text = '',
    possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    for (var i = 0; i < len; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));}
    return text;
};

var mapToObject = function mapToObject(mainObj, prop, instance) {
    switch (instance) {
        case 'ObjectID':
            mainObj[prop] = { type: _graphql.GraphQLString };
            break;
        case 'String':
            mainObj[prop] = { type: _graphql.GraphQLString };
            break;
        case 'Date':
            mainObj[prop] = { type: _graphql.GraphQLString };
            break;
        case 'Mixed':
            mainObj[prop] = { type: _graphql.GraphQLString };
            break;
        case 'Boolean':
            mainObj[prop] = { type: _graphql.GraphQLBoolean };
            break;
        case 'Buffer':
            mainObj[prop] = { type: _graphql.GraphQLBoolean };
            break;
        case 'Number':
            mainObj[prop] = { type: _graphql.GraphQLInt };
            break;
        case 'Array':
            mainObj[prop] = { type: new _graphql.GraphQLList(_graphql.GraphQLString) };
            break;}

    return mainObj;
};

var MTGQL = function MTGQL(args) {
    if (args.schema && args.schema.paths) {
        var GQLS = {
            name: args.name,
            description: args.description,
            fields: {},
            args: {

                id: {
                    type: _graphql.GraphQLID,
                    description: 'The id of the video.' },

                title: {
                    type: _graphql.GraphQLString,
                    description: 'The title of the video.' },

                duration: {
                    type: _graphql.GraphQLInt,
                    description: 'The duration of the video (in seconds).' },

                watched: {
                    type: _graphql.GraphQLBoolean,
                    description: 'Whether or not the viewer has watched the video.' } } },




        tmpArgsObj = _extends({}, args.schema.paths),
        newSchemaObject = {},
        noChildSchema = {};

        for (var key in tmpArgsObj) {
            if (tmpArgsObj[key].hasOwnProperty('schema')) {
                newSchemaObject[key] = tmpArgsObj[key];
                tmpArgsObj[key] = {};
            }
        }
        for (var _key in tmpArgsObj) {
            if (tmpArgsObj.hasOwnProperty(_key) && !tmpArgsObj[_key].schema) {
                noChildSchema[_key] = tmpArgsObj[_key];
            }
        }
        Object.keys(noChildSchema).forEach(function (k) {
            if (!noChildSchema[k].hasOwnProperty('schema')) {
                var path = k.split('.'),
                last = path.pop();

                if (path.length) {
                    path.reduce(function (r, a) {return r[a] = r[a] || {};}, noChildSchema)[last] = noChildSchema[k];
                    path.reduce(function (r, a) {return r[a] = r[a] || {};}, noChildSchema)[last].path = last;
                    delete noChildSchema[k];
                }
            }
        });
        for (var _key2 in noChildSchema) {
            if (noChildSchema.hasOwnProperty(_key2) && !newSchemaObject.hasOwnProperty(_key2)) {
                newSchemaObject[_key2] = noChildSchema[_key2];
            }
        }

        for (var _key3 in newSchemaObject) {
            if (newSchemaObject.hasOwnProperty(_key3)) {
                if (!newSchemaObject[_key3].hasOwnProperty('instance')) {
                    var subArgs = {
                        name: _key3 + 'SubType_' + randomName(10),
                        description: 'sub-object type for ' + _key3,
                        class: 'GraphQLObjectType',
                        schema: { paths: newSchemaObject[_key3] },
                        exclude: args.exclude };

                    GQLS.fields[_key3] = { type: MTGQL(subArgs) };
                } else if (newSchemaObject[_key3].schema) {
                    var _subArgs = {
                        name: newSchemaObject[_key3].path + 'SubType_' + randomName(10),
                        description: 'sub-object type for ' + args.name,
                        class: 'GraphQLObjectType',
                        schema: newSchemaObject[_key3].schema,
                        exclude: args.exclude },

                    typeElement = MTGQL(_subArgs);
                    GQLS.fields[_key3] = { type: new _graphql.GraphQLList(typeElement) };
                } else if (
                newSchemaObject[_key3] &&
                newSchemaObject[_key3].path &&
                newSchemaObject[_key3].instance &&
                newSchemaObject[_key3].path !== '__v' && !newSchemaObject[_key3].schema)
                {
                    GQLS.fields = mapToObject(GQLS.fields,
                    newSchemaObject[_key3].path,
                    newSchemaObject[_key3].instance,
                    newSchemaObject,
                    args.exclude);

                }
            }
        }

        if (args.exclude) {
            args.exclude.forEach(function (prop) {
                if (GQLS.fields[prop]) {
                    delete GQLS.fields[prop];
                }
            });
        }

        if (args.props) {
            Object.keys(args.props).forEach(function (prop) {
                GQLS.fields[prop] = args.props[prop];
            });
        }

        if (args.class === 'GraphQLObjectType') {
            return new _graphql.GraphQLObjectType(GQLS);
        } else if (args.class === 'GraphQLInputObjectType') {
            return new _graphql.GraphQLInputObjectType(GQLS);
        } else if (args.class === 'GraphQLInterfaceType') {
            return new _graphql.GraphQLInterfaceType(GQLS);
        } else if (args.class === 'GraphQLUnionType') {
            return new _graphql.GraphQLUnionType(GQLS);
        } else if (args.class === 'GraphQLEnumType') {
            return new _graphql.GraphQLEnumType(GQLS);
        } else {
            return new SyntaxError('Enter correct graphQL class name.');
        }
    }
};exports.default =

MTGQL;
//# sourceMappingURL=mtgql.js.map