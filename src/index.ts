import type { SchemaType, SchemaDefinition } from 'mongoose';

type JsonReplacer = (this: any, key: string, value: any) => any;
type MongooserOptions = {
    Types: Record<string, string | typeof SchemaType>;
};

const DEFAULT_OPTIONS: MongooserOptions = {
    Types: {
        Mixed: 'Mixed',
        ObjectId: 'ObjectId',
    },
};

export default class Mongooser {
    constructor(private readonly options: MongooserOptions = DEFAULT_OPTIONS) {}

    stringify(schema: SchemaDefinition) {
        return JSON.stringify(schema, replacer);
    }

    parse(serializedSchema: string) {
        const schemaSpec = JSON.parse(serializedSchema, createReviver(this.options));
        return schemaSpec;
    }
}

const createReviver = (options: MongooserOptions): JsonReplacer =>
    function (key: string, value: any) {
        if (globalThis.hasOwnProperty(value)) {
            return globalThis[value];
        }

        switch (value) {
            case 'Mixed':
                return options.Types.Mixed;
            case 'ObjectId':
                return options.Types.ObjectId;
            default:
                break;
        }

        if (key === 'validator') {
            return new Function('return( ' + value + ' );')();
        }

        if (value?.toString && value.toString().indexOf('__REGEXP ') === 0) {
            var m = value.split('__REGEXP ')[1].match(/\/(.*)\/(.*)?/);
            return new RegExp(m[1], m[2] || '');
        }
        return value;
    };

const replacer: JsonReplacer = function (key: string, value: any) {
    if (value instanceof RegExp) {
        return '__REGEXP ' + value.toString();
    }

    if (typeof value === 'function') {
        return key === 'validator' ? value.toString() : value.name;
    }

    return value;
};
