import { Schema, type SchemaDefinition } from 'mongoose';


import Mongooser from '../src/index';

const mongooser = new Mongooser(Schema);

describe('regexes', function () {
    it('should work for regexes', function () {
        const schema: SchemaDefinition = {
            name: {
                type: String,
                match: /^a/,
            },
        };
        const json = mongooser.stringify(schema);
        
        expect(json).toEqual('{"name":{"type":"String","match":"__REGEXP /^a/"}}');
        expect(mongooser.parse(json)).toEqual(schema);
    });

    it('should work for arrays', function () {
        const schema = {
            string: [String],
        };
        const json = mongooser.stringify(schema);
        expect(json).toEqual('{"string":["String"]}');
        expect(mongooser.parse(json)).toEqual(schema);
    });
});
