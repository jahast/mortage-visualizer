import { inject, named } from 'inversify';
import { Types, Core } from '../../../constants';
import { Logger as LoggerType } from '../../../core/Logger';


export class MortageCalculatedListener implements interfaces.Listener {

    public static Event = Symbol('MortageCalculatedListener');

    public log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) Logger: typeof LoggerType
    ) {
        this.log = new Logger(__filename);
    }

    public act(param: any): void {
        this.log.info('Receive event MortageCalculatedListener', param);
    }

}
