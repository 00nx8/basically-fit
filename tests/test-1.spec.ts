import { test, expect } from '@playwright/test'

test.beforeEach(async ({ page }) => {
  await page.goto('http://localhost:9000/')
})

test('Create an exercise.', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('This is a pushup')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Push up')).toBeVisible()
})

test('Check for required fields', async ({ page }) => {
  await page.goto('http://localhost:9000/#/exercise-library')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Description is required')).toBeVisible()
  await expect(page.getByText('error')).toBeVisible()
})

test('assert exercise count in nav on save', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await expect(page.getByRole('tab', { name: 'exercises (0)' })).toBeVisible()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('This is a push up')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByRole('tab', { name: 'exercises (1)' })).toBeVisible()
})

test('assert exercise count in nav on cancel', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await expect(page.getByRole('tab', { name: 'exercises (0)' })).toBeVisible()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('This is a push up')
  await page.getByRole('button', { name: 'Cancel' }).click()
  await expect(page.getByRole('tab', { name: 'exercises (0)' })).toBeVisible()
})

test('assert exercise count on deletion from overview', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await expect(page.getByRole('tab', { name: 'exercises (0)' })).toBeVisible()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up')
  await page.getByRole('textbox', { name: 'Name' }).press('Tab')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('This is a push up')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByRole('tab', { name: 'exercises (1)' })).toBeVisible()
  await page.getByRole('button', { name: 'Delete' }).click()
  await expect(page.getByRole('tab', { name: 'exercises (0)' })).toBeVisible()
})

test('assert exercise count on deletion from edit', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('this is a pushup')
  await page.getByText('NameDescription *').click()
  await page.getByRole('button', { name: 'Save' }).click()
  await page.getByRole('link', { name: 'Edit' }).click()
  await expect(page.getByRole('tab', { name: 'exercises (1)' })).toBeVisible()
  await page.getByRole('button', { name: 'DELETE' }).click()
  await expect(page.getByRole('tab', { name: 'exercises (0)' })).toBeVisible()
})

test('assert persistence on refresh', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('This is a push up\n\n')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('push up', { exact: true })).toBeVisible()
  await page.goto('http://localhost:9000/#/exercise-library')
  await expect(page.getByText('push up', { exact: true })).toBeVisible()
  await page.getByRole('button', { name: 'Delete' }).click()
  await expect(page.getByText('No exercises yet... Make one !')).toBeVisible()
  await expect(page.getByRole('tab', { name: 'exercises (0)' })).toBeVisible()
  await page.goto('http://localhost:9000/#/exercise-library')
  await expect(page.getByText('No exercises yet... Make one !')).toBeVisible()
  await expect(page.getByRole('tab', { name: 'exercises (0)' })).toBeVisible()
})

test('assert presence in workout plans on creation', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('this is a pushup')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('push up')).toBeVisible()
  await expect(page.getByText('this is a pushup')).toBeVisible()
  await page.getByRole('tab', { name: 'workout plans (0)' }).click()
  await page.getByRole('link').click()
  await expect(page.getByText('push up')).toBeVisible()
})

test('assert update in workout plans on deletion without creating a plan', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('link').click()
  await expect(page.getByText('No exercises exist yet. Make')).toBeVisible()
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('This is a push up')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Push up', { exact: true })).toBeVisible()
  await page.getByRole('tab', { name: 'workout plans (0)' }).click()
  await page.getByRole('link').click()
  await expect(page.getByText('Push up')).toBeVisible()
  await page.getByRole('tab', { name: 'exercises (1)' }).click()
  await page.getByRole('link', { name: 'Edit' }).click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up that has been edited')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Push up that has been edited')).toBeVisible()
  await page.getByRole('tab', { name: 'workout plans (0)' }).click()
  await page.getByRole('link').click()
  await expect(page.getByText('Push up that has been edited')).toBeVisible()
})

test('assert update on created workout plan of deleted exercise', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('this is a push up')
  await page.getByRole('button', { name: 'Save' }).click()
  await page.getByRole('tab', { name: 'workout plans (0)' }).click()
  await page.getByRole('link').click()
  await page.getByText('push up').click()
  await page.getByRole('textbox', { name: 'name' }).click()
  await page.getByRole('textbox', { name: 'name' }).fill('Test workout')
  await page.getByRole('textbox', { name: 'reps' }).click()
  await page.getByRole('textbox', { name: 'reps' }).fill('12')
  await page.getByRole('textbox', { name: 'sets' }).click()
  await page.getByRole('textbox', { name: 'sets' }).fill('3')
  await page.getByRole('button', { name: 'save' }).click()
  await expect(
    page.getByText(
      'push upDescriptionkeyboard_arrow_downthis is a push up Repetitions: 12 | Sets:',
    ),
  ).toBeVisible()
  await page.getByRole('tab', { name: 'exercises (1)' }).click()
  await page.getByRole('button', { name: 'Delete' }).click()
  await page.getByRole('tab', { name: 'workout plans (1)' }).click()
  await expect(
    page.getByText(
      'push upDescriptionkeyboard_arrow_downthis is a push up Repetitions: 12 | Sets:',
    ),
  ).not.toBeVisible()
  await expect(page.getByText('There are no exercises')).toBeVisible()
})

test('assert persistence of deletion on created workout plan', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('push up')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('this is a push up')
  await page.getByRole('button', { name: 'Save' }).click()
  await page.getByRole('tab', { name: 'workout plans (0)' }).click()
  await page.getByRole('link').click()
  await page.getByText('push up').click()
  await page.getByRole('textbox', { name: 'name' }).click()
  await page.getByRole('textbox', { name: 'name' }).fill('Test workout')
  await page.getByRole('textbox', { name: 'reps' }).click()
  await page.getByRole('textbox', { name: 'reps' }).fill('12')
  await page.getByRole('textbox', { name: 'sets' }).click()
  await page.getByRole('textbox', { name: 'sets' }).fill('3')
  await page.getByRole('button', { name: 'save' }).click()
  await expect(
    page.getByText(
      'push upDescriptionkeyboard_arrow_downthis is a push up Repetitions: 12 | Sets:',
    ),
  ).toBeVisible()
  await page.getByRole('tab', { name: 'exercises (1)' }).click()
  await page.getByRole('button', { name: 'Delete' }).click()
  await page.getByRole('tab', { name: 'workout plans (1)' }).click()
  await expect(
    page.getByText(
      'push upDescriptionkeyboard_arrow_downthis is a push up Repetitions: 12 | Sets:',
    ),
  ).not.toBeVisible()
  await expect(page.getByText('There are no exercises')).toBeVisible()
  await page.goto('http://localhost:9000/#/workout-plans')
  await expect(
    page.getByText(
      'push upDescriptionkeyboard_arrow_downthis is a push up Repetitions: 12 | Sets:',
    ),
  ).not.toBeVisible()
  await expect(page.getByText('There are no exercises')).toBeVisible()
})

test('editing an exercise', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up')
  await page.getByRole('textbox', { name: 'Name' }).press('Tab')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('This is a push up')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Push up', { exact: true })).toBeVisible()
  await expect(page.getByText('This is a push up')).toBeVisible()
  await page.getByRole('link', { name: 'Edit' }).click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up thats been edited.')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Push up thats been edited.')).toBeVisible()
})

test('asserting persistence on editing an exercise', async ({ page }) => {
  await page.goto('http://localhost:9000/#/workout-plans')
  await page.getByRole('tab', { name: 'exercises (0)' }).click()
  await page.getByRole('link').click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up')
  await page.getByRole('textbox', { name: 'Name' }).press('Tab')
  await page.locator('.q-editor__content').click()
  await page.locator('.q-editor__content').fill('This is a push up')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Push up', { exact: true })).toBeVisible()
  await expect(page.getByText('This is a push up')).toBeVisible()
  await page.getByRole('link', { name: 'Edit' }).click()
  await page.getByRole('textbox', { name: 'Name' }).click()
  await page.getByRole('textbox', { name: 'Name' }).fill('Push up thats been edited.')
  await page.getByRole('button', { name: 'Save' }).click()
  await expect(page.getByText('Push up thats been edited.')).toBeVisible()
  await page.goto('http://localhost:9000/#/exercise-library')
  await expect(page.getByText('Push up thats been edited.')).toBeVisible()
})
// TESTING form recording requires microphone permissions which i cannot grant in the tests.
//
