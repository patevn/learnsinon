Spy
(Nosy Neighbour Analogy) knows about what arguments were passed into it, what returned, what was called, how many times, with what.
Dont spy on the function that under test
Spy good for knowing what happen, but can't change anything.
Spy not good at blocking side effects, just good at watching
Basically useful if you want to monitor a function

Stub
(Stunt Double Analogy) Can return a specific value, throw an exception, res or rej a promise, call a separate fake function.
ie controls behaviour. can force functions to throw exceptions ore return certain values (see stunt double)
yields for cb
resolve for promises
eql used for array assertions
callsfake lets you look at params passed in

Fake - Mix of Spy and Stub. Ability to set default behaviour. Record Args, returns values exceptions, this.
Create fake, then just pass in function. not two params (obj , function).
BUT need to call .replace and pass in 3
sinon.replace(object under test, function under test, what the function will return)
create fake behaviour with the .fake property
One a fake is create its immutable. IMPORTANT point cause diff from spy and stub
Fakes dont automatically replace function you're calling
When use Fakes? if dont need to change return value, lightweight option to others.

Mock - Upfront and Direct (good friend analogy). Help test the implementation.
State expectations up front, do your setup code and mocking then call verify and sinon runs down and checks all your assertions are done
Has all of the stub and spy api's plus some of its own
most useful when you want to verify the behaviour of the functions and or when doing multiple expectations
you mock the whole object eg const mock = sinon.mock(fs). As opposed to const writeSpy = sinon.spy(fs, 'writeFileSync');
Actually cool. so you setup the object under test at the top. eg sinon.mock(fs) then do a whole lot of expectations on any method you want from fs. then verify(); boom
