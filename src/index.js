import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { connect, Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';

const mapStateToProps = state => ({ count: state });
const mapDispatchToProps = dispatch => ({
  add: () => dispatch({ type: 'ADD' }),
  subtract: () => dispatch({ type: 'SUBTRACT' })
});

const Counter = connect(mapStateToProps, mapDispatchToProps)(({ add, count, subtract }) => {
  return (
    <div>
      <button onClick={() => add()}>Add</button>
      {count}
      <button onClick={() => subtract()}>Subtract</button>
    </div>
  );
});

const reducer = (state = 0, { type }) => {
  if (type === 'ADD') return state + 1;
  if (type === 'SUBTRACT') return state - 1;
  return state;
};

const storeTop = createStore(reducer, 0, composeWithDevTools({ name: 'top' })());
const storeBottom = createStore(reducer, 0, composeWithDevTools({ name: 'bottom' })());

const App = () => {
  return (
    <div>
      <Provider store={storeTop}>
        <Counter />
      </Provider>
      <Provider store={storeBottom}>
        <Counter />
      </Provider>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
