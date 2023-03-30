import { Schema, type SchemaDefinition } from 'mongoose';

import Mongooser from '../src/index';

const mongooser = new Mongooser(Schema);

describe('Mongoose Types', function () {
    it('should be able to serialize and deserialize string', function () {
        const schema: SchemaDefinition = {
            string: String,
        };
        const json = mongooser.stringify(schema);
        expect(json).toEqual('{"string":"String"}');
        expect(mongooser.parse(json)).toEqual(schema);
    });

    it('should be able to serialize and deserialize number', function () {
        const schema: SchemaDefinition = {
            num: Number,
        };
        const json = mongooser.stringify(schema);
        expect(json).toEqual('{"num":"Number"}');
        expect(mongooser.parse(json)).toEqual(schema);
    });

    it('should be able to serialize and deserialize date', function () {
        const schema: SchemaDefinition = {
            num: Date,
        };
        const json = mongooser.stringify(schema);
        expect(json).toEqual('{"num":"Date"}');
        expect(mongooser.parse(json)).toEqual(schema);
    });

    it('should be able to serialize and deserialize Buffer', function () {
        const schema: SchemaDefinition = {
            num: Buffer,
        };
        const json = mongooser.stringify(schema);
        expect(json).toEqual('{"num":"Buffer"}');
        expect(mongooser.parse(json)).toEqual(schema);
    });

    it('should be able to serialize and deserialize boolean', function () {
        const schema: SchemaDefinition = {
            num: Boolean,
        };
        const json = mongooser.stringify(schema);
        expect(json).toEqual('{"num":"Boolean"}');
        expect(mongooser.parse(json)).toEqual(schema);
    });

    it('should be able to serialize and deserialize mixed', function () {
        const schema: SchemaDefinition = {
            mixed: Schema.Types.Mixed,
        };
        const json = mongooser.stringify(schema);
        expect(json).toEqual('{"mixed":"Mixed"}');
        expect(mongooser.parse(json)).toEqual(schema);
    });

    it('should be able to serialize and deserialize ObjectId', function () {
        const schema: SchemaDefinition = {
            id: Schema.Types.ObjectId,
        };
        const json = mongooser.stringify(schema);
        expect(json).toEqual('{"id":"ObjectId"}');
        expect(mongooser.parse(json)).toEqual(schema);
    });
});
