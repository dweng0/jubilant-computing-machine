import { passesTest } from '../functionals';
describe("Functional Tests", () => { 

    

    it("isPassingShould pass correctly", () => { 
        //setup
        const testHTML = "<HTML>COOL</HTML>";
        const testCondition = "<HTML>";

        //execute
        const { passed } = passesTest(testCondition, 0, testHTML.split(""));

        //verify
        expect(passed).toBe(true);
    });

    it("isPassing should fail and return correct index if no test condition exists", () =>{  

    });

} );