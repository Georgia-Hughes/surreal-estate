import React from 'react';
import { shallow } from 'enzyme';
import Alert from '../src/componenents/Alert';


it('renders an error message', () => {
  const wrapper = shallow((
    <Alert message="Error" />
  ));
  expect(wrapper.find('.alert').text()).toBe('Error');
});

it('renders a success message', () => {
  const wrapper = shallow((
    <Alert message="Success" success />
  ));

  expect(wrapper.find('.alert.success').text()).toBe('Success');
});
