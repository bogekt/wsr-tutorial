import {
  ButtonTestkit,
  InputTestkit,
  DropdownTestkit,
  CardHeaderTestkit,
} from 'wix-style-react/dist/testkit/puppeteer';

import DataHooks from '../src/components/App/DataHooks';

describe('WSR Form', () => {
  const testkits = {} as {
    submitButtonTestkit: any;
    firstNameInputTestkit: any;
    lastNameInputTestkit: any;
    colorDropdownTestkit: any;
    savedDataCardHeaderTestkit: any;
  };

  const fillForm = async ({
    firstName,
    lastName,
    colorId,
  }: Partial<{
    firstName: string;
    lastName: string;
    colorId: string;
  }>) => {
    const {
      firstNameInputTestkit,
      lastNameInputTestkit,
      colorDropdownTestkit,
    } = testkits;

    // await firstNameInputTestkit.enterText(firstName);
    // await lastNameInputTestkit.enterText(lastName);
    // await colorDropdownTestkit.driver.selectOptionById(colorId);

    await Promise.all([
      firstNameInputTestkit.enterText(firstName ?? ''),
      lastNameInputTestkit.enterText(lastName ?? ''),
      colorDropdownTestkit.driver.selectOptionById(colorId),
    ]);
  };

  beforeEach(async () => {
    await page.goto(app.getUrl('/'));
    const [
      submitButtonTestkit,
      firstNameInputTestkit,
      lastNameInputTestkit,
      colorDropdownTestkit,
      savedDataCardHeaderTestkit,
    ] = await Promise.all([
      ButtonTestkit({
        dataHook: DataHooks.SUBMIT_BUTTON,
        page,
      }),
      InputTestkit({
        dataHook: DataHooks.FIRST_NAME,
        page,
      }),
      InputTestkit({
        dataHook: DataHooks.LAST_NAME,
        page,
      }),
      DropdownTestkit({
        dataHook: DataHooks.FAVORITE_COLOR,
        page,
      }),
      CardHeaderTestkit({
        dataHook: DataHooks.SAVED_DATA,
        page,
      }),
    ]);
    Object.assign(testkits, {
      submitButtonTestkit,
      firstNameInputTestkit,
      lastNameInputTestkit,
      colorDropdownTestkit,
      savedDataCardHeaderTestkit,
    });
  });

  it('should submit the form', async () => {
    const { submitButtonTestkit, savedDataCardHeaderTestkit } = testkits;

    await fillForm({
      firstName: 'Yevhenii',
      lastName: 'Borys',
      colorId: '1',
    });

    expect(await savedDataCardHeaderTestkit.exists()).toEqual(false);
    await submitButtonTestkit.click();
    expect(await savedDataCardHeaderTestkit.exists()).toEqual(true);
  });

  it('should not submit the form without required fields', async () => {
    const { submitButtonTestkit, savedDataCardHeaderTestkit } = testkits;

    await fillForm({
      firstName: 'Yevhenii',
      colorId: '1',
    });

    expect(await savedDataCardHeaderTestkit.exists()).toEqual(false);
    await submitButtonTestkit.click();
    expect(await savedDataCardHeaderTestkit.exists()).toEqual(false);
  });
});
