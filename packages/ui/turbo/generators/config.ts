import type { PlopTypes } from "@turbo/gen";
import { execSync } from "child_process";
import process from "node:process";
import path from "path";

// Learn more about Turborepo Generators at https://turbo.build/repo/docs/core-concepts/monorepos/code-generation

const addShadcnComponent: PlopTypes.CustomActionFunction = async (answers) => {
    const { name } = answers;
    try {
        // Get the current working directory
        const currentDir = process.cwd();
        // Change to the directory containing components.json and package.json
        const uiPackageDir = path.resolve(__dirname, "..", "..");
        process.chdir(uiPackageDir);

        execSync(`npx shadcn-ui@latest add ${name}`, {
            stdio: "inherit",
        });
        // Change back to the original directory
        process.chdir(currentDir);

        console.log(`Successfully added ${name} component`);
        return `Added ${name} component`;
    } catch (error) {
        console.error(`Failed to add ${name} component:`, error);
        throw error;
    }
};

export default function generator(plop: PlopTypes.NodePlopAPI): void {
    // A generator to add a new shadcn component to the internal UI library
    plop.setGenerator("sui", {
        description: "Adds a new shadcn component",
        prompts: [
            {
                type: "input",
                name: "name",
                message: "What is the name of the shadcn component?",
            },
        ],
        actions: [
            addShadcnComponent,
            {
                type: "append",
                path: "package.json",
                pattern: /"exports": {(?<insertion>)/g,
                template:
                    '    "./{{kebabCase name}}": "./src/components/ui/{{kebabCase name}}.tsx",',
            },
        ],
    });
}
