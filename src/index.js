import { fromEvent, interval } from 'rxjs';
import { debounce, distinctUntilChanged, map } from 'rxjs/operators';

applyCurrencyMask();

function applyCurrencyMask() {
	const inputElement = document.getElementById('price');
	fromEvent(inputElement, 'keyup')
		.pipe(
			debounce(() => interval(500)),
			distinctUntilChanged(),
			map(({ target }) => ({ target, value: target.value }))
		)
		.subscribe({
			next: ({ target, value }) => {
				const before = value;
				target.value = mask(value);
				const after = target.value;
				console.log([ before, '=>', after ].join(' '));
			},
		});
}

function mask(value) {
	return value
		.toString()
		.trim()
		.replace(/[^\d\.]/g, '')
		.split('.', 2)
		.map((cur, i) => {
			if (i === 0) {
				return cur
					.split('')
					.reverse()
					.map((cur, i, { length }) => (((i + 1) % 3) === 0) && (i !== length - 1) ? ','.concat(cur) : cur)
					.reverse()
					.join('');
			} else {
				return cur.substr(0,2);
			}
		})
		.join('.')
}
