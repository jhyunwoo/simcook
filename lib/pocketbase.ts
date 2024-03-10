import PocketBase from "pocketbase";

const pb = new PocketBase('https://simcook.api.moveto.kr');

if (process.env.NODE_ENV === "development") pb.autoCancellation(false);

export  {pb};
