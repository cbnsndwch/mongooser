import { Schema, type SchemaDefinition } from 'mongoose';

import Mongooser from '../src/index';

const mongooser = new Mongooser(Schema);

describe('arrays', function () {
    it('should work for array schema props', function () {
        const schema: SchemaDefinition = {
            string: [String],
        };

        const json = mongooser.stringify(schema);
        
        expect(json).toEqual('{"string":["String"]}');
        
        expect(mongooser.parse(json)).toEqual(schema);
    });
});
