# Mongooser

A mongoose schema serializer/deserializer for NodeJS and the browser. Useful, when you need to send your schema over the network, (e.g.: to your admin frontend)

> &nbsp;
> This package is partially based on the abandoned [mongoose-schema-serializer](https://github.com/capaj/mongoose-schema-serializer) package, which at the time of this writing had not received any updates in over 7 years.
> &nbsp;

## Installation

```sh
npm i @cbnsndwch/mongooser
```

OR

```sh
yarn add @cbnsndwch/mongooser
```

OR

```sh
pnpm install @cbnsndwch/mongooser
```

## Usage

in Node:

```typescript
import { Schema } from 'mongoose';
import Mongooser from '@cbnsndwch/mongooser';

const mongooser = new Mongooser(Schema);
const serializedSchema = mongooser.stringify(schema);

// save serialized schema to DB or send it to the client directly
```

then on frontend:

```typescript
import Mongooser from '@cbnsndwch/mongooser';

// will deserialize `ObjectId` and `Mixed` as strings.
const mongooser = new Mongooser();

// `schema` is a plain object that satisfies the `SchemaDefinition` interface from mongoose
// you can use it to validate documents on the browser, but that's about it
// see https://mongoosejs.com/docs/browser.html for details and suppoerted features
const schema = mongooser.parse(serializedSchema);
```
