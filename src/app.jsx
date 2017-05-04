import React from 'react';
import '../styles/index.scss';
import SimpleTree from './simple-tree';

const resources = [
	{
		name: 'test',
		path: 'test/path/dir/file.txt'
	},
	{
		name: 'suite',
		path: 'test/autrepath/suite.txt'
	}
]

export default class App extends React.Component {
  render() {
    return (
      <div>
        <h1>It Works!</h1>
        <p>This React project just works including <span className="redBg">module</span> local styles.</p>
        <p>Enjoy!</p>
		<SimpleTree
			resources={resources}
		/>
      </div>
    )
  }
}