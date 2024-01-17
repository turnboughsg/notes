import { Bucket, StackContext, Table } from "sst/constructs";

export function StorageStack({ stack }: StackContext) {
  // create S3 bucket and DynamoDB table
  const bucket = new Bucket(stack, "Uploads");
  const table = new Table(stack, "Notes", {
    fields: {
      userId: "string",
      noteId: "string",
      },
      primaryIndex: { partitionKey: "userId", sortKey: "noteId" },
  });
  // return resources to allow other stacks to reference them
  return {
    bucket,
    table
  };
}