import type { Meta, StoryObj } from '@storybook/react'

import PageNotFound from './PageNotFound'

const meta = {
  title: 'Pages/PageNotFound',
  component: PageNotFound,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof PageNotFound>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
