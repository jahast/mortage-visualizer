/**
 * APPLICATION CONFIGURATION
 * ----------------------------------------
 *
 * This is the place to add any other express module and register
 * all your custom middlewares and routes.
 */

import * as path from 'path';
import * as morgan from 'morgan';
import * as helmet from 'helmet';
import * as express from 'express';
import * as bodyParser from 'body-parser';
import * as compression from 'compression';
import { Logger } from '../core/Logger';
import { App, Configurable } from '../core/App';

export class AppConfig implements Configurable {
    public configure(app: App): void {

        const logger = new Logger();

        app.Express

            // Helmet helps you secure your Express apps by setting various HTTP headers. It's not a silver bullet, but it can help!
            .use(helmet())
            .use(helmet.noCache())
            .use(helmet.hsts({
                maxAge: 31536000,
                includeSubdomains: true
            }))

            // Compress response bodies for all request that traverse through the middleware
            .use(compression())

            // Parse incoming request bodies in a middleware before your handlers, available under the req.body property.
            .use(bodyParser.json())
            .use(bodyParser.urlencoded({
                extended: true
            }))

            // Serve static files like images from the public folder
            .use(express.static(path.join(__dirname, '..', 'public'), { maxAge: 31557600000 }))
            .get('/', express.static(path.join(__dirname, '..', 'client', 'dist')))

            // HTTP request logger middleware for node.js
            .use(morgan('dev', {
                stream: {
                    write: logger.info.bind(logger)
                }
            }));
    }
}
