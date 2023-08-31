import type { Meta, StoryObj } from '@storybook/react'

import Fieldset from './Fieldset'

const meta = {
  title: 'Molecules/Fieldset',
  component: Fieldset,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Fieldset>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    name: 'username',
    children: <input />,
  },
}
