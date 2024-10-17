import { expect, test } from 'vitest'
import dayjs from 'dayjs'
import formatEmail from './format_email'

test('format_email', () => {
  const date = dayjs('2021-03-01 11:31')

  expect(formatEmail('Hello [YYYY-MM-DD HH:mm]', date)).toBe('Hello 2021-03-01 11:31');
  expect(formatEmail('Hello [YYYY] again [HH:mm]', date)).toBe('Hello 2021 again 11:31');
})
