import connectMongoDB from "./lib/mongodb";

export async function register() {
  await connectMongoDB();
}
