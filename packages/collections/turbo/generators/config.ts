import type { PlopTypes } from "@turbo/gen";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

export default function generator(plop: PlopTypes.NodePlopAPI): void {
    // A generator to add a new shadcn component to the internal UI library
    plop.setGenerator("collection", {
        description: "Adds a new collection",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the collection?",
            },
        ],
        actions: [
            {
                type: "add",
                path: "src/{{name}}.ts",
                templateFile: "templates/collection.hbs",
            },
            {
                type: "append",
                path: "package.json",
                pattern: /"exports": {(?<insertion>)/g,
                template: '    "./{{name}}": "./src/{{name}}.ts",',
            },
        ],
    });
}
