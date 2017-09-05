import { inject, named } from 'inversify';
import { Types, Core } from '../../constants';
import { Logger as LoggerType } from '../../core/Logger';

export class MortageService {

    private log: LoggerType;

    constructor(
        @inject(Types.Core) @named(Core.Logger) public Logger: typeof LoggerType
    ) {
        this.log = new Logger(__filename);
    }

    public calculateMortageSeries(params: models.MortageParameters): models.MortageDataPoint[] {

        const interest = params.Interest! / (12 * 100);
        const totalLoan = params.TotalLoan!;
        const numOfMonths = params.NumberOfMonths!;

        const monthIndices = this.range(0, numOfMonths - 1);

        const singleDeduction: number = totalLoan / numOfMonths;

        const mortageDeductionsPerMonth = monthIndices.map(() => singleDeduction);

        const interestsPerMonth = monthIndices.map((idx) => interest * (totalLoan - (idx) * singleDeduction));

        const mortageDataPoints = monthIndices.map(i => {
            return {
                MonthIndex: i,
                Interest: interestsPerMonth[i],
                LoanDeduction: mortageDeductionsPerMonth[i]
            } as models.MortageDataPoint;
        });

        return mortageDataPoints;
    }

    private range(start: number, end: number): number[] {
        const returnable: number[] = new Array();

        for (let i = start; i <= end; i++) {
            returnable.push(i);
        }

        return returnable;
    }
}
