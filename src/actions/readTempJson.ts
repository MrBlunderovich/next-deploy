"use server";

import fs from "fs/promises";

export default async function readTempJson() {
  try {
    const pathToTempJson =
      process.env.NODE_ENV === "production"
        ? "/app/db/temp.json"
        : "./db/devTemp.json";

    const data = await fs.readFile(pathToTempJson, "utf-8");

    console.log(JSON.parse(data));
    return JSON.parse(data).key;
  } catch (error) {
    return "failed to read temp.json";
  }
}
