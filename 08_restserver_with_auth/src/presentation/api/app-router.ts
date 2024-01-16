import { Router } from 'express';
import { routes } from './v1/router';

export class AppRouter {
    static get v1() {
        const router = Router();

        router.use("/v1", routes);

        return router;
    };
}

