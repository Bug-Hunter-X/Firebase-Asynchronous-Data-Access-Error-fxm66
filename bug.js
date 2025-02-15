The Firebase SDK might throw an error if you try to access a property of a document snapshot before the promise returned by `get()` resolves. This often happens when you are dealing with asynchronous operations and expect data to be available immediately. For example, if you try to access a field in a snapshot within a callback of another asynchronous function, the data might not be ready yet.  Here's an example:

```javascript
// Incorrect: Accessing data before promise resolution
db.collection('users').doc('uid').get().then(doc => {
  console.log(doc.data().name); // This might throw an error
  // ... rest of your code
});

// Correct:  Ensuring data is available
db.collection('users').doc('uid').get().then(doc => {
  if (doc.exists) {
    console.log(doc.data().name); 
  } else {
    console.log('No such document!');
  }
}).catch(error => {
  console.error('Error getting document:', error);
});
```