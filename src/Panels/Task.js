import React from 'react';
import PropTypes from 'prop-types';

import {
  View,
  Panel,
  Alert,
  ActionSheet,
  ActionSheetItem,
  CellButton,
  Group,
  ListItem,
  PanelHeader,
  HeaderButton,
  platform,
  IOS,
  Cell,
  List,
  Button,
  Div,
  Input,
  FormLayout,
  FormLayoutGroup
} from '@vkontakte/vkui';

import Icon28ChevronBack from '@vkontakte/icons/dist/28/chevron_back';
import Icon24Back from '@vkontakte/icons/dist/24/back';
import Icon24Place from '@vkontakte/icons/dist/24/place';
import Icon24Info from '@vkontakte/icons/dist/24/info';

const osname = platform();

class Task extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      id: this.props.cardId,
      code: this.props.cardCode,
      date: this.props.cardId,
	  popout: null
	};
	
	this.handleChange = this.handleChange.bind(this);
    this.submitFormValue = this.submitFormValue.bind(this);
  }

  handleChange(event){
    this.setState({value: event.target.value});
  }
  

  submitFormValue(e) {
	e.preventDefault();
	
	if( this.state.id['answer'] == this.state.value) {
		console.log('Правильный ответ');
		this.openSheetRightAnswer()
	} else {
		console.log('Неправильный ответ');
		this.openSheetWrongAnswer()
	}

  }


  openSheet() {
    this.props.setPopout(
      <Alert
        actions={[
          {
            title: 'Close',
            autoclose: true,
            style: 'destructive'
          }
        ]}
        onClose={() => this.props.setPopout(null)}>
        <h2>Подсказка</h2>
        <p>{this.state.date.hint}</p>
      </Alert>
    );
  }

  openSheetWrongAnswer() {
    this.props.setPopout(
      <Alert
        actions={[
          {
            title: 'Close',
            autoclose: true,
            style: 'destructive'
          }
        ]}
        onClose={() => this.props.setPopout(null)}>
        <h2>Результат</h2>
        <p>Ответ отрицательный</p>
      </Alert>
    );
  }

  openSheetRightAnswer() {
	this.props.setPopout(
		<Alert
		  actions={[
			{
			  title: 'Close',
			  autoclose: true,
			  style: 'destructive'
			}
		  ]}
		  onClose={() => this.props.setPopout(null)}>
		  <h2>Результат</h2>
		  <p>Ответ Правильный</p>
		</Alert>
	  );
  }

  render() {
    const props = this.props;
    const data = props.cardId;
    return (
      <Panel id={props.id}>
        <PanelHeader
          left={
            <HeaderButton onClick={e => props.go(e, data.code)} data-to="page">
              {osname === IOS ? <Icon28ChevronBack /> : <Icon24Back />}
            </HeaderButton>
          }
        >
          {data.name}
        </PanelHeader>
        <Group>
          <Div>
            <List>
              <Cell before={<Icon24Info />}>{data.target}</Cell>
              <Cell before={<Icon24Place />}>{data.adress}</Cell>
              {data.task}
            </List>
          </Div>
          <FormLayout>
            <FormLayoutGroup top="Введите ответ">
              <Input type="text" alignment="center" value={this.state.value} onChange={this.handleChange}/>
            </FormLayoutGroup>
          </FormLayout>

          <ListItem>
            <Button size="l" stretched onClick={this.submitFormValue} data-to="page">Проверить</Button>
          </ListItem>
		  	{this.state.date.hint ? (
				<CellButton onClick={this.openSheet.bind(this)}>Подсказка</CellButton>
			) : (
				<CellButton disabled>Подсказка</CellButton>
			)}
        </Group>
      </Panel>
    );
  }
}

Task.propTypes = {
  id: PropTypes.string.isRequired,
  go: PropTypes.func.isRequired
};

export default Task;
