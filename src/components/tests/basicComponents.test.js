import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
Enzyme.configure({ adapter: new Adapter() });
import 'jsdom-global/register'
import 'regenerator-runtime/runtime';
import Enzyme,{shallow,  mount} from "enzyme";
import React from 'react'
import { BasicFunctionalComponent, PropsRenderingTest, getMajonez, AsyncDataComponent, TriggerEffect} from "../basicComponents";
import * as module from '../../functions'


describe('For BasicFunctionalComponent', ()=>{
    test('Should render correct snapshot',()=>{
        const wrapper = shallow(<BasicFunctionalComponent/>)
        expect(wrapper.html()).toMatchSnapshot()
    })
});
describe('For PropsRenderingTest', ()=>{
    test('Should render correct snapshot (1)',()=>{
        const wrapper = shallow(<PropsRenderingTest />)
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Should render correct snapshot (2)',()=>{
        const default_props = {
            name: 'Maciej',
            color: 'Red',
        }
        const wrapper = shallow(<PropsRenderingTest  {...default_props}/>)
        expect(wrapper.html()).toMatchSnapshot()
    })
});
describe('For AsyncDataComponent', ()=>{
    test('Should render correct snapshot',()=>{
        const default_props ={func: jest.fn()}
        jest.spyOn(module, 'getAsyncData').mockReturnValue(['replaced the data'])
        const wrapper = mount(<AsyncDataComponent {...default_props}/>)
        wrapper.setProps({some:'setProps will affect props'})
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Should call props.func',()=>{
        const default_props ={func: jest.fn(), condition:true}
        mount(<AsyncDataComponent {...default_props}/>)
        expect(default_props.func).toHaveBeenCalled()
    })
    test('Should call getAsyncData',()=>{
        const default_props ={func: jest.fn()}
        jest.spyOn(module, 'getAsyncData').mockReturnValue(['replaced the data'])
        mount(<AsyncDataComponent {...default_props}/>)
        expect(module.getAsyncData).toHaveBeenCalled()
    })
});
describe('For TriggerEffect', ()=>{
    test('Should render correct snapshot',()=>{
        const default_props ={func: jest.fn()}
        const wrapper = mount(<TriggerEffect {...default_props}/>)
        expect(wrapper.html()).toMatchSnapshot()
    })
    test('Should call props.func once',()=>{
        const default_props ={func: jest.fn()}
        mount(<TriggerEffect {...default_props}/>)
        expect(default_props.func).toHaveBeenCalledTimes(1)
    })
    test('Should call props.func twice',()=>{
        const default_props ={func: jest.fn()}
        const wrapper = mount(<TriggerEffect {...default_props}/>)
        wrapper.find('button').simulate('click')
        expect(default_props.func).toHaveBeenCalledTimes(2)
    })
});

const majonezMock= jest.fn()
const majonezMock2 = jest.fn().mockReturnValue('super majonez')

describe('For getMajonez', ()=>{
    test('Should call callback', ()=>{
        getMajonez(majonezMock)
        expect(majonezMock).toHaveBeenCalled()
    })
    test('Should return "super majonez"', ()=>{
        const returned_value = getMajonez(majonezMock2)
        expect(returned_value).toBe('super majonez')
    })
})
