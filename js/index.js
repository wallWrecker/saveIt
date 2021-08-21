console.log('hello world');

const transformed = [21,23,21,233,12,11,11,22,33].map( function(n) {
	const currentNumber = n;

	if (currentNumber > 10 && currentNumber <= 25) {
		return n *.5;
	} else if(currentNumber > 35) {
		return currentNumber * 1.2;
	} else {
		return currentNumber * 2;
	}
})

console.log(transformed)