import { dirname } from "path";
import { fileURLToPath } from "url";
import { FlatCompat } from "@eslint/eslintrc";
import { Linter } from "eslint";
import importPlugin from 'eslint-plugin-import';
import { defineConfig, globalIgnores } from 'eslint/config';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const FS_LAYERS = [ 'entities', 'features', 'widgets', 'app', 'processes', 'pages', 'shared' ];

const FS_SEGMENTS = [ 'ui', 'types', 'model', 'lib', 'api', 'config', 'assets' ];

const getUpperLayers = (layer: string) => FS_LAYERS.slice(0, FS_LAYERS.indexOf(layer));
const FS_SLICED_LAYERS_REG = [
  ...getUpperLayers('shared'),
  ...getUpperLayers('shared').map((layer) => `*${layer}`),
].join('|');
const FS_SEGMENTS_REG = [...FS_SEGMENTS, ...FS_SEGMENTS.map((seg) => `${seg}.*`)].join('|');

export const nextjsConfigPlugins: Linter.Config['plugins'] = {
  import: importPlugin,
};

const nextjsConfigRules: Linter.Config['rules'] = {
  'import/no-internal-modules': [
    'error',
    {
      allow: [
        /**
         * Allow not segments import from slices
         * @example
         * 'entities/user/ui' // Pass
         * 'entities/user' // Also Pass
         */
        `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/*(${FS_SEGMENTS_REG})`,

        /**
         * Allow slices with structure grouping
         * @example
         * 'features/auth/form' // Pass
         */
        `**/*(${FS_SLICED_LAYERS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

        /**
         * Allow not segments import in shared segments
         * @example
         * 'shared/ui/button' // Pass
         */
        `**/*shared/+(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

        /**
         * Allow not segments import in shared segments one level deeper
         * @example
         * 'shared/ui/primitives/Button' // Pass
         * 'shared/model/actions/websocket' // Pass
         */
        `**/*shared/+(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})/!(${FS_SEGMENTS_REG})`,

        /**
         * Allow import from segments in shared
         * @example
         * 'shared/ui' // Pass
         */
        `**/*shared/*(${FS_SEGMENTS_REG})`,

        /** allow global modules */
        `**/node_modules/**`,

        /**
         * allow custom shared segments with _prefix
         */
        `**/*shared/_*`,
        `**/*shared/_*/*`,
      ],
    }
  ]
};

export default defineConfig([
  globalIgnores([
    "node_modules/**",
    ".next/**",
    "out/**",
    "build/**",
    "next-env.d.ts",
  ]),
  {
    extends: compat.extends("next/core-web-vitals", "next/typescript", 'next', 'prettier'),
    plugins: nextjsConfigPlugins,
    rules: nextjsConfigRules,
  }
]);