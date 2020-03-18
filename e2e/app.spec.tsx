import { reloadApp } from 'detox-expo-helpers';

describe('ENTIRE APP FLOW ', () => {
  beforeAll(async () => {
    await reloadApp();
  });
  describe('APP INTRO SCREENS', () => {
    it('should see all components in the splash screen', async () => {
      await element(by.id('app-container'));
      await element(by.id('app-icon'));
      await element(by.id('pregnancy-photo'));
      await expect(element(by.id('slider'))).toBeVisible();
      await expect(element(by.id('readMore'))).toBeVisible();
      await expect(element(by.id('getStartedButton'))).toBeVisible();
      await expect(element(by.id('loginButton'))).toBeVisible();
    });
    it('should swipe the slider in get started screen', async () => {
      await element(by.id('slider')).swipe('left');
      await element(by.id('slider')).swipe('left');
      await element(by.id('slider')).swipe('left');
      await element(by.id('slider')).swipe('right');
      await element(by.id('slider')).swipe('right');
      await element(by.id('slider')).swipe('right');
    });
    it('should take new user to the sign up screen', async () => {
      await element(by.id('getStartedButton')).tap();
      await element(by.id('Name')).tap();
      await element(by.id('Name')).typeText('decagon');
      await element(by.id('userName')).tap();
      await element(by.id('userName')).typeText(`decagon${+Math.random()}`);
      await element(by.id('email')).tap();
      await element(by.id('email')).typeText(
        `decagon${+Math.random()}@gmail.com`
      );
      await element(by.id('phone')).tap();
      await element(by.id('phone')).typeText('09032198923');
      await element(by.id('password')).tap();
      await element(by.id('password')).typeText('decagon');
      await element(by.id('submitButton')).tap();
    });
  });

  describe('ONBOARDING SCREEN CHECK', () => {
    it('should take new user to the onboarding screen for users that has not filled it yet', async () => {
      await waitFor(element(by.id('amNotPregnantButton')))
        .toBeVisible()
        .withTimeout(2000);
      await element(by.id('amNotPregnantButton')).tap();

      await waitFor(element(by.id('pageTwoContinueButton')))
        .toBeVisible()
        .withTimeout(2000);
      await element(by.id('pageTwoContinueButton')).tap();

      await waitFor(element(by.id('pageThreeNoButton')))
        .toBeVisible()
        .withTimeout(2000);
      await element(by.id('pageThreeNoButton')).tap();

      await waitFor(element(by.id('pageFourNoButton')))
        .toBeVisible()
        .withTimeout(2000);
      await element(by.id('pageFourNoButton')).tap();

      await waitFor(element(by.id('pageFiveNoButton')))
        .toBeVisible()
        .withTimeout(2000);
      await element(by.id('pageFiveNoButton')).tap();

      await waitFor(element(by.id('pageSixSubmitButton')))
        .toBeVisible()
        .withTimeout(2000);
      await element(by.id('pageSixSubmitButton')).tap();
    });
  });

  describe('HOME SCREEN CHECK', () => {
    it('user should be able to see list of posts', async () => {
      await waitFor(element(by.id('postList')))
        .toBeVisible()
        .withTimeout(2000);
      await element(by.id('postList')).swipe('up');
      await element(by.id('postList')).swipe('down');
    });

    it('users should be able to select a post', async () => {
      await element(by.id('post-0')).tap();
      await waitFor(element(by.id('postDetailScreen')))
        .toBeVisible()
        .withTimeout(2000);
      await expect(element(by.id('backButton'))).toBeVisible();
      await expect(element(by.id('babyTipsButton'))).toBeVisible();
      await expect(element(by.id('postDetailTopic'))).toBeVisible();
      await expect(element(by.id('messageIconButton'))).toBeVisible();
      await expect(element(by.id('eyeIcon'))).toBeVisible();
      await expect(element(by.id('postDetailViewCounter'))).toBeVisible();
      await expect(element(by.id('postDetailLikeIcon'))).toBeVisible();
      await expect(element(by.id('postDetailLikeCounter'))).toBeVisible();
      await expect(element(by.id('postDetailMessageInput'))).toBeVisible();
      await element(by.id('postDetailScrollView')).swipe('up');
      await element(by.id('postDetailScrollView')).swipe('down');
      await element(by.id('backButton')).tap();
    });
    it('users should be able to select like a post', async () => {
      await waitFor(element(by.id('postList')))
        .toBeVisible()
        .withTimeout(2000);
    });
  });
});
