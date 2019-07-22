# react-native-ants-racing

How to run Ants Racing App: 

1. `git clone git@github.com:arcesoj/react-native-ants-racing.git`
2. cd `react-native-ants-racing`
3. `npm install`
4. cd ios && pod install
5. open xcode and verify siging app 
6. `npm start`
7. `react-native run-ios --simulator="iPhone 7"` 

### Must have
- [x] Users must be able to begin running calculations on all ants simultaneously.
- [x] UI must reflect the state of each ant's win likelihood calculation (not yet run, in progress, calculated, etc.)
- [x] UI must display the state of all tests together (not yet run, in progress, all calculated).
- [x] As the results come in, ants must be ordered by their calculated likelihood of winning.
- [x] Include a login/logout feature: open-ended on how to implement, and can be local-storage only. Being logged in enables the ability to query the GraphQL endpoint to display the requirements.
- [x] When logged in, there should be images of three (3) ants moving horizontally from left to right across the bottom-most part of the screen; once an ant is out of the right side of the screen, it comes back on the left side of it, like in a carousel
- [x] Show n number of ants and tie the animation of each to its associated calculation via a method of your choosing

