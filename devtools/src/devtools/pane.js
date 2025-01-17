import 'regenerator-runtime/runtime';
import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import Bridge from 'crx-bridge';
import Result from '../../../src/components/Result';
import inspectedWindow from './lib/inspectedWindow';

function Panel() {
  const [{ result }, setResult] = useState({});

  useEffect(() => {
    Bridge.onMessage('SELECT_NODE', (result) => {
      setResult(result.data);
    });
  }, []);

  const dispatch = (action) => {
    switch (action.type) {
      case 'SET_QUERY': {
        inspectedWindow.logQuery(action.query);
        break;
      }
    }
  };

  return (
    <div className="p-2 w-screen h-screen">
      {result && <Result result={result} dispatch={dispatch} />}
    </div>
  );
}

ReactDOM.render(<Panel />, document.getElementById('app'));
