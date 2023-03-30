import { Schema, type SchemaDefinition } from 'mongoose';

import Mongooser from '../src/index';

const mongooser = new Mongooser(Schema);

describe('functions', function () {
    it('should work for custom validators', function () {
        const schema: SchemaDefinition = {
            phone: {
                type: String,
                validate: {
                    validator: (v) => /\d{3}-\d{3}-\d{4}/.test(v),
                    message: '{VALUE} is not a valid phone number!',
                },
            },
        };

        const json = mongooser.stringify(schema);
        expect(json).toEqual(
            '{"phone":{"type":"String","validate":{"validator":"(v) => /\\\\d{3}-\\\\d{3}-\\\\d{4}/.test(v)","message":"{VALUE} is not a valid phone number!"}}}'
        );

        const desSchema: any = mongooser.parse(json);
        expect(desSchema.phone.validate.validator('222-222-4444')).toEqual(true);
        expect(desSchema.phone.validate.validator('222-2224445')).toEqual(false);
    });
});
