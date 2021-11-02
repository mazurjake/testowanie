import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import Enzyme from 'enzyme';
Enzyme.configure({ adapter: new Adapter() });
import 'regenerator-runtime/runtime';

export const flushPromises = () => new Promise(setImmediate);
