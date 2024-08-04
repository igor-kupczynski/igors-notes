import * as assert from 'assert';
import { getWeekRange } from '../extension';

suite('getWeekRange Tests', () => {
	const testCases = [
		{
			date: new Date('2024-06-10'),
			expectedRange: '2024-06-10--2024-06-16 W24',
		},
		{
			date: new Date('2024-06-11'),
			expectedRange: '2024-06-10--2024-06-16 W24',
		},
		{
			date: new Date('2024-06-16'),
			expectedRange: '2024-06-10--2024-06-16 W24',
		},
	];

	testCases.forEach((testCase, index) => {
		test(`Returns correct week range for a given date ${testCase.date}`, () => {
			const actualRange = getWeekRange(testCase.date);
			assert.strictEqual(actualRange, testCase.expectedRange);
		});
	});
});
