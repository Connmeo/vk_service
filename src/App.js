import React from 'react';
import connect from '@vkontakte/vkui-connect';

import { View, Alert } from '@vkontakte/vkui';
import { ROUTES } from './config';

import Home from './Panels/Home';
import Page from './Panels/Page';
import Task from './Panels/Task';

import '@vkontakte/vkui/dist/vkui.css';

const location = window.location.hash.substr(1);

class App extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			activePanel: ~ROUTES.indexOf(location) ? location : 'home',
			popout: null
		};

		this.setPopout = this.setPopout.bind(this);
	}

	setLocation = (route) => {
		if (route !== 'home') {
			connect.send('VKWebAppSetLocation', { location: route });
		} else {
			connect.send('VKWebAppSetLocation', { location: '' });
		}
	}

	go = (e, id = 0, data = {}) => {

		const route = e.currentTarget.dataset.to;
		this.setState({ activePanel: route, cardId: id, data: data})
		this.setLocation(route)
	};

	setPopout(popout) {
		this.setState({
			popout: popout
		});
	}

	render() {
		return (
			<View activePanel={this.state.activePanel} popout={this.state.popout}>
				<Home id="home" user={this.state.fetchedUser} go={this.go} />
				<Page id="page" cardCode={this.state.cardId} data={this.state.data} go={this.go} setPopout={this.setPopout}/>
				<Task id="task" cardId={this.state.cardId} data={this.state.data} go={this.go} setPopout={this.setPopout} />
			</View>
		);
	}
}

export default App;
