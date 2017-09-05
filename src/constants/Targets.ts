/**
 * constants.Targets
 * ------------------------------------------------
 *
 * This is for our IOC so have a unique key/target for
 * our controllers, services and repositories
 *
 * This file is generated with the task `$ npm run console update:targets`.
 */

export const Targets = {
    Service:     {
        MortageService: 'MortageService'
    },
    Listener:     {
        mortage: {
            MortageCalculatedListener: 'MortageCalculatedListener'
        }
    },
    Controller:     {
        MortageController: 'MortageController'
    }
};
