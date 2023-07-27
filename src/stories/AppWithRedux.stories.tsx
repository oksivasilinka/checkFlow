import type { Meta, StoryObj } from '@storybook/react';
import React from "react";
import AppWithRedux from "../AppWithRedux";
import {ReduxStoreProviderDecorator} from "../state/ReduxStoreProviderDecorator";



const meta: Meta<typeof AppWithRedux> = {
  title: 'TODOLIST/AppWithRedux',
  component: AppWithRedux,
  tags: ['autodocs'],
    decorators: [ReduxStoreProviderDecorator]
}

export default meta;
type Story = StoryObj<typeof AppWithRedux>;



export const AppWithReduxStory: Story = {
    // render: () => <Provider store={store}><AppWithRedux/></Provider>
}