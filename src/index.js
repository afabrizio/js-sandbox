import { fromEvent, interval } from 'rxjs';
import { debounce, distinctUntilChanged, filter,  map } from 'rxjs/operators';

applyCurrencyMask();

function applyCurrencyMask() {
	const inputElement = document.getElementById('price');
	fromEvent(inputElement, 'keyup')
		.pipe(
			debounce(() => interval(500)),
			distinctUntilChanged(),
			map(({ target }) => ({ target, value: target.value })),
			filter(({ value }) => value.length) 
		)
		.subscribe({
			next: ({ target, value }) => {
				target.value = mask(value);
			}
		});
	fromEvent(inputElement, 'blur')
		.pipe(
			map(({ target }) => ({ target, value: target.value })),
			filter(({ value }) => value.length) 
		)
		.subscribe({
			next: ({ target, value }) => {
				target.value = pad(value);
			}
		});
}

function mask(value) {
	return value
		.toString()
		.trim()
		.replace(/[^\d\.]/g, '')
		.split('.', 2)
		.map((cur, i, src) => {
			if (i === 0) {
				cur = cur
					.split('')
					.reverse()
					.map((cur, i, { length }) => (((i + 1) % 3) === 0) && (i !== length - 1) ? ','.concat(cur) : cur)
					.reverse()
					.join('');
			}
			return cur;
		})
		.join('.');
}

function pad(value, resolution = 2) {
	return value
		.toString()
		.trim()
		.concat('.00')
		.split('.', 2)
		.map((cur, i) => {
			if (i > 0) {
				const zeros_needed = Math.max(resolution - cur.length, 0);
				for (let i = zeros_needed; i > 0; i--) {
					cur = cur.concat('0');
				}
				return cur.substr(0,2);
			}
			return cur;
		})
		.join('.');
}
