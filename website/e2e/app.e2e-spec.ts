import {AppPage} from './app.po';


describe('prosjekt4 App', () => {
    let page: AppPage;

    beforeEach(() => {
        page = new AppPage();

    });

    it('Should have correct title', () => {
        page.navigateTo();
        page.getPageTitle().then((title: string) => {
            expect(title).toEqual('Music Find');
        });
    });

    it('URL should be login when moving to login', () => {
        page.navigateToDestination('/login').then(() => {
            page.getPageUrl().then((url: string) => {
                expect(url).toMatch('/login');
            });
        });
    });
    it('Should update input fields when writing in them', () => {
        page.navigateToDestination('/login').then(() => {
            const inputUser = 'testuser';
            const inputPass = 'testpassword';
            let username = page.getElementByName('username');
            username.sendKeys(inputUser);
            username.getAttribute('ng-reflect-model').then(text => {
                expect(text).toEqual(inputUser);
            });

            let password = page.getElementByName('password');
            password.sendKeys(inputPass);
            password.getAttribute('ng-reflect-model').then(text => {
                expect(text).toEqual(inputPass);
            });

        });
    });
    it('Should redirect to register site when clicking on redirect text', () => {
        page.navigateToDestination('/login').then(() => {
            const link = page.getRegisterLink();
            link.click();
            const registerHeader = page.getRegisterHeader();
            registerHeader.getText().then(text => {
                expect(text.trim()).toEqual('Register User');
            });
        });
    });
    it('Should redirect to login site when clicking on redirect text', () => {
        page.navigateToDestination('/register').then(() => {
            const link = page.getLoginLink();
            link.click();
            const registerHeader = page.getRegisterLink();
            registerHeader.getText().then(text => {
                expect(text.trim()).toEqual('Don\'t have a user? Click here to register');
            });
        });
    });
});
