import { passesTest } from 'functionals';
import { Token, TokenRule } from 'interface';
const test = "<div><p>hi<p><div>";

const buffer = (payload: string, tokenRules: Array<TokenRule>, offset:number = 0, bufferSize:number = 2000): Array<Token> => {
    
    if(!payload) { 
        throw new Error('Please provide a payload to abstract');
    }

    const payloadArrayBuffer:Array<string> = payload.slice(offset, bufferSize).split("");
    return generator(payloadArrayBuffer, tokenRules);
}

const generator = (input: Array<string>, tokenRules: Array<TokenRule>): Array<Token> => { 

    const skipUntilIndexesReached:Array<number> = [];
    let syntaxTokens: Array<Token> = [];

    return input.reduce((accumulator: Array<Token>, currentString: string, index: number, array: Array<string>) => {

        // Checks to see if payload passes test
        // if passes, provides the index that should be skipped up to.
        const isPassingTest = (testCondition: RegExp | string, testSize?: number): string => {
            const { passed, newIndexPosition, result } = passesTest(testCondition, index, array, testSize);

            if(passed && newIndexPosition != index) {
                skipUntilIndexesReached.push(newIndexPosition);
            }

            return result;
        }

        //loop through each define rule
        tokenRules.forEach((rule: TokenRule) => { 
            // enter condition
            if(currentString === rule.testTrigger) {
                const result = isPassingTest(test, rule.testSize) 
                if(result) {
                    accumulator.push({ type: rule.type, value: result });
                }                
            }
        });
        return accumulator;
     }, syntaxTokens);

}