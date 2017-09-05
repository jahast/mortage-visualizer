import { inject, named } from 'inversify';
import { controller, httpGet, response, queryParam } from 'inversify-express-utils';
import { Types, Targets } from '../../constants';
import { MortageService } from '../services/MortageService';

@controller('/mortage')
export class MortageController {

    constructor( @inject(Types.Service) @named(Targets.Service.MortageService) private mortageService: MortageService) { }

    @httpGet('/')
    public async calculateMortage(
        @response() res: myExpress.Response,
        @queryParam('TotalLoan') TotalLoan: number,
        @queryParam('NumberOfMonths') NumberOfMonths: number,
        @queryParam('Interest') Interest: number
        ): Promise<any> {
            const mortageParams: models.MortageParameters = { Interest, TotalLoan, NumberOfMonths };
            const datapoints = this.mortageService.calculateMortageSeries(mortageParams);
            return res.found(datapoints, { message: 'Success!' });
    }
}
