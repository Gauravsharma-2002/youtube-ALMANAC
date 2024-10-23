import { Router } from "express";

import { transcodeAndReturn } from "../controller/youtube.transcoder";

const route = Router();

route.post("/", transcodeAndReturn);

export default route;
