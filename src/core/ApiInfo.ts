import * as express from 'express';
import { Environment } from './helpers/Environment';
import { SwaggerUI } from './SwaggerUI';
import { ApiMonitor } from './ApiMonitor';


export class ApiInfo {

    public static getRoute(): string {
        return process.env.APP_URL_PREFIX || '/api' + process.env.API_INFO_ROUTE || '/info';
    }

    public setup(app: express.Application): void {
        if (Environment.isTruthy(process.env.API_INFO_ENABLED || 'true')) {
            app.get(
                ApiInfo.getRoute(),
                (req: myExpress.Request, res: myExpress.Response) => {
                    const pkg = Environment.getPkg();
                    const links = {
                        links: {}
                    };
                    if (Environment.isTruthy(process.env.SWAGGER_ENABLED || 'true')) {
                        links.links['swagger'] =
                            `${app.get('host')}:${app.get('port')}${SwaggerUI.getRoute()}`;
                    }
                    if (Environment.isTruthy(process.env.MONITOR_ENABLED || 'true')) {
                        links.links['monitor'] =
                            `${app.get('host')}:${app.get('port')}${ApiMonitor.getRoute()}`;
                    }
                    return res.json({
                        name: pkg.name,
                        version: pkg.version,
                        description: pkg.description,
                        ...links
                    });
                });
        }
    }
}
