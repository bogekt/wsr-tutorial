import React from 'react';
import { render } from '@testing-library/react';
import { PageHeaderTestkit } from 'wix-style-react/dist/testkit';
import { testkit } from '@wix/yoshi-flow-bm/testkit';
import Index from './index';

describe('index', () => {
  testkit.beforeAndAfter();

  beforeEach(() => testkit.reset());

  it('renders a title correctly', async () => {
    const { TestComponent } = testkit.getBMComponent(Index);
    const { baseElement, findByTestId } = render(<TestComponent />);

    await findByTestId('app-title');

    const pageHeaderTestkit = PageHeaderTestkit({
      wrapper: baseElement,
      dataHook: 'app-title',
    });

    expect(await pageHeaderTestkit.exists()).toBe(true);
  });
});
