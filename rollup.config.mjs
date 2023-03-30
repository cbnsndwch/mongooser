import { defineConfig } from 'rollup';
import rollupTypescript from '@rollup/plugin-typescript';

import pkg from './package.json' assert { type: 'json' };

// we need to tell Rollup the names of imported packages
// so that it knows how to generate the correct code for them
const external = [
    ...Object.keys(pkg.dependencies || {}),
    ...Object.keys(pkg.peerDependencies || {}),
    ...Object.keys(pkg.optionalDependencies || {}),
];

/**
 * CommonJS (for Node) and ES module (for bundlers) build.
 * (We could have three entries in the configuration array
 * instead of two, but it's quicker to generate multiple
 * builds from a single configuration where possible, using
 * an array for the `output` option, where we can specify
 * `file` and `format` for each target)
 */
export default defineConfig({
    input: 'src/index.ts',
    external,
    plugins: [rollupTypescript({

    })],
    output: [
        { file: pkg.main, sourcemap: true, format: 'cjs' },
        { file: pkg.module, sourcemap: true, format: 'es' },
    ],
});
