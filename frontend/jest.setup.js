import React from 'react';

import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({ adapter: new Adapter() });

/*
{
  "testRegex": "((\\.|/*.)(spec))\\.js?$",
  "setupFilesAfterEnv": [
    "<rootDir>/jest.setup.js"
  ]
}
 */