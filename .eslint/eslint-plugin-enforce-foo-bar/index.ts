import { RuleDefinition } from "@eslint/core";

import fooBarRule from "./enforce-foo-bar";
const plugin = { rules: { "enforce-foo-bar": fooBarRule as RuleDefinition } };

export default plugin;