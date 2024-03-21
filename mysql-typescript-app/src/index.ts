
import { App } from "./app";
import { port } from "../config";

async function main() {
    const app = new App(port)
    await app.listen()
    
}
main()
