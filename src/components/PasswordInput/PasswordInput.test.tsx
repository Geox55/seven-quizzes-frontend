import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';

import PasswordInput from './PasswordInput';

describe('PasswordInput component tests', () => {
  it('render correct', () => {
    render(<PasswordInput/>);
    const primaryPasswordInput = document.getElementsByClassName('form__input_password ')[0];
    expect(primaryPasswordInput).toBeInTheDocument();
  });
});
