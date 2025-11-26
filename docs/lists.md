# Lists

Lists in CL can be explicitly defined by providing a comma-separated list of elements. Note, all elements of a list in CL must be of the _same_ datatype. Elements of lists can be lists themselves but, once again, they must all be the same _type_ of list. For example, we can define a list of `number`s

## List Operations

List operations are described in-detail [here](https://cl.desmos.com/t/list-functions-in-cl/7353). Below is a cheat-sheet, as well as some worked examples I've found useful.

As a note, the first few of these functions take in an **arrow function** as an argument. Arrow functions are functions which _you_ define, and which (in CL) can only be defined _inline_ (that is, in the function call itself). An example of an arrow function is:

```
(x) => numericValue(`${x}+1`)
```

This function would take in an argument (`x`), and return `x+1` (though the CL syntax makes that a little ... unwieldly). So if we were to use this in the CL `map` function (which applies the arrow function to every element of an list) we would have:

```
test = [1,2,3,4].map((x) => numericValue(`${x}+1`))
# This stores [2,3,4,5] in the "test" variable
```

### Lists.map()

```desmoscl
list.map(func::ArrowFunction)::List
```

This function returns a list containing the result of calling the arrow function `func` on each element of the original list. The arrow function `func` can be defined with either 0, 1, or 2 arguments. Note that CL doesn't care what you call the arguments in your arrow function definition, just how many arguments there are and their positions.

- 0 arguments `() => ...`: The function accepts no arguments.
- 1 argument `(element) => ...`: The function takes in one argument: the respective element of the original list.
- 2 arguments `(element, index) => ...`: The function takes in two arguments: the respective element of the original list and the index of that element.

#### Use-Cases

- Creating a list full of zeros the same size as another list (maybe keeping score in a game).

```desmoscl
players = ["Student1", "Student2", "Student3"]
score = players.map(() => 0)
```

- Applying a function to a list of student-defined x-values.

```desmoscl
x_coords = [1, 2, 3, 5, 8, 9, -1, -2]
y_coords = x_coords.map((x) => numericValue(`${x}^2`))
# Note that even though we call the single argument 'x', it will
# still be the respective element of the 'x_coords' list.
```

- Multiplying two lists element-wise.

```desmoscl
list_1 = [5, 3, 7, 12, 3]
list_2 = [-1, 1, 0, 2, 4]
list_3 = list_1.map((x, i) => numericValue(`$(x) * $(list_2[i])))
```

### Lists.filter()

```desmoscl
list.filter(func::ArrowFunction)::List
```

This function returns a list containing only the elements of `list` which return `true` when passed to `func`. The arrow function `func` can be defined with either 1 or 2 arguments. `func` should return either `true` or `false`.

- 1 argument `(element) => ...`: The function takes in one argument: the respective element of the original list.
- 2 arguments `(element, index) => ...`: The function takes in two arguments: the respective element of the original list and the index of that element.

#### Use-Cases

- Identifying the first even value of a list.

```desmoscl

```

### Lists.first()

```desmoscl
list.first(func::ArrowFunction)::Type
```

This function is similar to `filter`, but only returns the first element of `list` which returns `true` when passed to `func`. The arrow function `func` can be defined with either 1 or 2 arguments. `func` should return either `true` or `false`.

- 1 argument `(element) => ...`: The function takes in one argument: the respective element of the original list.
- 2 arguments `(element, index) => ...`: The function takes in two arguments: the respective element of the original list and the index of that element.

#### Use-Cases

- Find the first value greater than 2 in a list. {{help_wanted("Add a more compelling example here.")}}

```desmoscl
values = [1,3,5,6,7]

first_gt_2 = values.first((e) => e > 2)
# first_gt_2 should equal 3.
```

### Lists.all()

```desmoscl
list.all(func::ArrowFunction)::boolean
```

This function returns `true` if `func` returns `true` for all elements in the list, and `false` otherwise. The arrow function `func` can be defined with either 1 or 2 arguments. `func` should return either `true` or `false`.

- 1 argument `(element) => ...`: The function takes in one argument: the respective element of the original list.
- 2 arguments `(element, index) => ...`: The function takes in two arguments: the respective element of the original list and the index of that element.

#### Use-Cases

- Evaluate if all elements of a list are greater than 2 {{help_wanted("Add a more compelling example here.")}}

```desmoscl
values = [1,3,5,6,7]

all_gt_2 = values.all((e) => e > 2)
# all_gt_2 should be false
```

### Lists.any()

```desmoscl
list.any(func::ArrowFunction)::boolean
```

This function returns `true` if `func` returns `true` for any elements in the list, and `false` otherwise. The arrow function `func` can be defined with either 1 or 2 arguments. `func` should return either `true` or `false`.

- 1 argument `(element) => ...`: The function takes in one argument: the respective element of the original list.
- 2 arguments `(element, index) => ...`: The function takes in two arguments: the respective element of the original list and the index of that element.

#### Use-Cases

- Evaluate if any elements of a list are greater than 2 {{help_wanted("Add a more compelling example here.")}}

```desmoscl
values = [1,3,5,6,7]

any_gt_2 = values.any((e) => e > 2)
# any_gt_2 should be true
```

### Lists.reduce()

```desmoscl
list.reduce(init::Type, func::ArrowFunction)::Type
```

This function returns the result of calling `func` on each element of the list, with the results being compounded using the `acc` argument described below. The arrow function `func` can be defined with either 2 or 3 arguments.

- 1 argument `(acc, cur) => ...`: The function takes in two arguments: `acc` as the accumulated value and `cur` as the current list element.
- 2 arguments `(acc, cur, index) => ...`: The function takes in three arguments: `acc` as the accumulated value, `cur` as the current list element, and `index` as the index of the current element.

#### Use-Cases

- Making a string of all elements of a list.

```desmoscl
values = [1, 3, 4, 6, 5, 2]
values_string = values.slice(2,values.length).reduce("${values[1]}", (acc, cur) => "$(acc), $(cur)")
# values_string should contain '1, 3, 4, 6, 5, 2'
```

- Sum all elements of a list.

```desmoscl
values = [1, 3, 4, 6, 5, 2]
values_sum = values.reduce(0, (acc, cur) => numericValue("$(acc) + $(cur)"))
# values_sum should contain 21
```

### Lists.slice()

```desmoscl
list.slice(start_ind::number, end_ind::number)::List
```

`slice` makes a copy of a section of `list`, starting with the element at `start_ind` and ending with the element at `end_ind`. Note that while these indices generally should be integers, CL seems to accept any number (including negative).

#### Use-Cases

- Getting the first half of a list.

```desmoscl
values = [1, 3, 4, 6, 5, 2]
first_values = values.slice(1, numericValue("${values.length} / 2"))
# first_values should contain [1, 3, 4]
```

### Lists.join()

```desmoscl
list.join(list2::List)::List
```

`join` returns the result of appending `list2` to `list`.

#### Use-Cases

- Merging two lists together. {{help_wanted("Add a more compelling example here.")}}

```desmoscl
v1 = [1, 3, 4]
v2 = [6, 5, 2]
values = v1.join(v2)
# values should contain [1, 3, 4, 6, 5, 2]
```

### Lists.reverse()

```desmoscl
list.reverse()::List
```

`reverse` returns a copy of `list` in reversed order.

#### Use-Cases

- Reversing a list. {{help_wanted("Add a more compelling example here.")}}

```desmoscl
values = [1, 3, 4, 6, 5, 2]
rev_values = v1.join(v2)
# values should contain [2, 5, 6, 4, 3, 1]
```

### range()

```desmoscl
range(lower::number, upper::number, step::number)::List<number>
range(lower::number, upper::number)::List<number>
range(upper::number)::List<number>
```

Returns a list which starts at `lower` and counts up to `upper` with step sizes of size `step`. If `step` is not specificied, it defaults to 1. If `lower` is not specificied, it defaults to 1. If the step size is negative, it will count backwards from `lower` to `upper` (in this case, `lower` will need to be greater than `upper`). This will return `undefined` if `step` is not a nonzero integer.

#### Use-Cases

- Creating a list of evenly spaced numbers. {{help_wanted("Add a more compelling example here.")}}

```desmoscl
r1 = range(5)
# r1 is [1, 2, 3, 4, 5]
r2 = range(2, 5)
# r2 is [2, 3, 4, 5]
r3 = range(2, 5, 2)
# r3 is [2, 4]
r4 = range(5, 2, -2)
# r4 is [5, 3]
```
