import { Api, StackContext, use } from "sst/constructs";
import { StorageStack } from "./StorageStack";

export function ApiStack({ stack }: StackContext) {
    const { table } = use(StorageStack);

    // create API
    const api = new Api(stack, "Api", {
        defaults: {
            function: {
                bind: [table],
            },
        },
        routes: {
            "POST /notes": "packages/functions/src/create.main",
        },
    });
    // show API endpoint in output
    stack.addOutputs({
        ApiEndpoint: api.url,
    });
    // return API resource
    return {
        api
    };
}