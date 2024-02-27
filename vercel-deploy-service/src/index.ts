import {createClient,commandOptions} from "redis";
import { copyFinalDist, downloadS3Folder } from "./aws";
import { buildProject } from "./utils";
const subscriber = createClient();
subscriber.connect();

async function main() {
    while(1){
        const response = await subscriber.brPop(
            commandOptions({isolated:true}),
            'build-queue',
            0
        );
        console.log(response);
        // @ts-ignore
        const id = response.element;

        await downloadS3Folder(`repos/${id}`);
        console.log("Downloaded")
        await buildProject(id);
        console.log("Built project")
        await copyFinalDist(id);

    }
}
main();
