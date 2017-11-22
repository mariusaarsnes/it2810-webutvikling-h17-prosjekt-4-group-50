import {browser, by, element} from 'protractor';

export class AppPage {
    navigateTo() {
        return browser.get('/');
    }

    getPageTitle() {
        return browser.getTitle();
    }

    navigateToDestination(destination) {
        return browser.get(destination);
    }

    getPageUrl() {
        return browser.getCurrentUrl();
    }
    getElementByName(name) {
        return element(by.name(name));
    }
    getLoginButton() {
        return element(by.xpath('/html/body/app-root/div/app-login/div/div/form/button'));
    }
    getLogoutButton() {
        return element(by.xpath('/html/body/app-root/app-navbar/div/div/ul/li[4]/a'));
    }
    getRegisterLink() {
        return element(by.xpath('/html/body/app-root/div/app-login/div/div/p[2]/a'));
    }
    getRegisterHeader() {
        return element(by.xpath('/html/body/app-root/div/app-register/div/div/form/h1'));
    }
    getLoginLink() {
        return element(by.xpath('/html/body/app-root/div/app-register/div/div/p/a'));
    }
}
