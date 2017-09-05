import * as express from 'express';
import * as monitor from 'express-status-monitor';
import { Environment } from './helpers/Environment';


export class ApiMonitor {

    public static getRoute(): string {
        return process.env.MONITOR_ROUTE || '/status';
    }

    public setup(app: express.Application): void {
        if (Environment.isTruthy(process.env.MONITOR_ENABLED || 'true')) {
            app.use(monitor());
            app.get(ApiMonitor.getRoute(), monitor().pageRoute);
        }
    }
}
