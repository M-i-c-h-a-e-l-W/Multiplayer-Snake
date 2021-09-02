import React from 'react';
import { shallow, mount, render } from 'enzyme';


import MSnake from './App';


describe('A suite', function() {
    it('should render without throwing an error', function() {
        expect(shallow(<MSnake />).contains(<div className="chat">Chat</div>)).toBe(true);
    });

    it('should be selectable by class "foo"', function() {
        expect(shallow(<MSnake/>).is('.chat')).toBe(true);
    });

    it('should mount in a full DOM', function() {
        expect(mount(<MSnake />).find('.chat').length).toBe(1);
    });

    it('should render to static HTML', function() {
        expect(render(<MSnake />).text()).toEqual('Bar');
    });
});