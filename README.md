# Randomized.js
Randomized.js is simple javascript library, that can makes Randomizing and Seeding easier.
# Download
You can download randomized-js with npm and require it:
```js
npm install randomized-js
const Random = require('randomized-js')
```
Or you can just import it with ES6 modules:
```javascript
import Random from 'https://unpkg.com/randomized-js/randomized.js'
```
# Usage
Main methods for creating random numbers are `Random.number(min,max,seed?)` and `Random.random(seed?)`
You can also use `Random.pick(arr,seed)` and `Random.randomize(arr,seed)` to pick/randomize your array (examples below);
```javascript
//Random.number(min,max,seed?/floor?,floor?);
Random.number(1, 12, "Hi") // Alway 2
Random.random("Hello") // Always 0.6962755533213519

Random.pick([1,2,3,4,5],"123") // Returns 5
Random.randomize([1,2,3,4],"o.O") // returns [1, 3, 4, 2]
```
You can also use `new Random(seed?)` constructor to create instance of Random.
If you dont provide seed, it will just use `Math.random()` to generate numbers.
```javascript
const rnd = new Random("Hello World")
rnd.random() // Always 0.5423943877054241
//Usage: rnd.next(min,max,floor?)
rnd.next(0,9,false) // Always 7.731296254855902
rnd.next(0,9,true) // Always 3
rnd.reSeed("Random.js"); // Reseeds to "Random.js"
rnd.next(0,9) // Always 8
```
**Everytime you run `rnd.next()`, the next generated value will be different! (example below)**
```javascript
const rnd = new Random("See!");
rnd.next(0,10); //Always returns 9
rnd.next(0,10); //Always returns 8
rnd.next(0,10); //Always returns 0
```
Every time you run `rnd.random(seed)` or `rnd.next(min,max)`, next random number will be changed
If you want generate one random number with/without seed you can use static function `Random.number(seed)` or `Random.number(seed)`:
```js
//Usage: Random.number(min,max,seed?/floo?r,floor?)
Random.number(1,2) // returns 1 or 2
Random.number(1) // returns 0 or 1
Random.number(1,9,"Seed") // Always returns 2
Random.number(6,9,"", false) // returns a number from 6 to 9 with decimal numbers
Random.number(6,9, false) // again returns a number from 6 to 9 with decimal numbers
Random.number(10,20,"Weird huh",false) // Always 15.03660798224236
Random.number(2,18,"Weird huh",false) // Always 9.783848699829104
//As you can see, even with the same seed the number is different

//Usage Random.random(seed?)
Random.random("Out of ideas") // Always 0.8273460546070028
Random.random() // Random number from 0-1
```
There are two more static functions! `Random.pick(array)` which picks a random item from array (It also supports string) and `Random.randomize(array)` which randomizes array, string or number
Both supports seeding

```js
// Usage Random.pick(input,seed?)
Random.pick([1,2,3]) // Returns 1 , 2 or 3
Random.pick([1,2,3],"123") // Returns 3
Random.pick([1,2,3,4,5],"123") // Returns 5

Random.pick("Hello World") // Returns h, e, l, o, w, r or d
Random.pick("Hello World","Hi") // Returns e

//Usage Random.pick(input,seed?,rolls?)
Random.randomize([1,2,3,4,5,6],"o.O") // returns [2, 1, 4, 5, 6, 3]
Random.randomize([1,2,3,4],"o.O") // returns [1, 3, 4, 2]
Random.randomize([2,6,8,1,6,4]) // returns randomized array ex.
```