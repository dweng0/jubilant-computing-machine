import { TestResults, Logger } from "interface";
    
export const getLogger = (verbose: boolean): Logger => { 
    const logging: Array<string> = [];
    const logger: Logger = {
        log: (message: string) => {},
        logs: logging
    }
    if(verbose) {
        logger.log = (message: string) => {
            console.log(message);
            logging.push(message);
        }
    }
    
    return logger;
}

/**
 * Checks if a condition passes test
 * @param testCandidate the thing to test for
 * @param testCondition the thing to test
 * @param index the index of the test conditions array
 * @param testConditions the additional conditions
 * @param verbose default false. adds logging.
 */
export const passesTest = (testCondition: string, index: number, testConditions: Array<string>, verbose:boolean =false): TestResults => {
            const { log } = getLogger(verbose);

            const results: TestResults = {
                newIndexPosition: index,
                passed: false
            }
            
            // if we have no condition 
            if(!testCondition) { 
                log('no test condition provided, exiting');
                return results;
            } 

            // otherwise get number of chars to test this condition
            const toIndex = (index + testCondition.length);
            const testCandidate = testConditions.slice(index, toIndex).join("");

            //and test
            log(`Testing ${testCandidate} against ${testCondition}`);
            results.passed = (testCandidate === testCondition);
            if (results.passed) {
                results.newIndexPosition = toIndex;
                log(`Passed test! setting new index position from ${index} to ${toIndex}`);
            }
            
            
            return results;
}