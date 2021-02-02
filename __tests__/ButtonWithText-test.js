import { shallow } from 'enzyme';
import React from 'react';
import ButtonWithText from '../components/ButtonWithText';

test('ButtonWithText has title', () => {
  // Render a checkbox with label in the document
  const titles = [
    'abc',
    'bcdf',
    'undefined',
    undefined,
    '6372813678126486478236847863726847632874',
  ];

  titles.forEach((element) => {
    const wrapper = shallow(<ButtonWithText title={element} />);

    expect(wrapper.find({ testID: 'title' }).at(0).props().children).toEqual(element);
  });
});

const sum = (a, b) => a + b;
test('Addition', () => {
  // Render a checkbox with label in the document
  expect(sum(1, 2)).toEqual(3);
});
