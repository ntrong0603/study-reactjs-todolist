import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
// Immutability khong co kha nang thay doi trang thai ben trong
//"mutate thay doi trang thai ben trong"
class App extends Component {
  constructor(){
    super();
    this.state ={ 
      todoItems:  [
          { title: 'Mua bin bin', isComplete: true }, 
          { title: 'An' , isComplete: false}, 
          { title: 'uong' , isComplete: false}
        ]
    }
  }
  onItemClick(item){
    return () => {
      const isComplete = item.isComplete;
      const index = this.state.todoItems.indexOf(item);
      const todoItems = this.state.todoItems;
      this.setState({
        todoItems: [
          ...todoItems.slice(0, index), 
          {
            ...item,
            isComplete: !isComplete
          },
          ...todoItems.slice(index + 1)]
      });
    }
  }
  //truyen 1 function thong qua props
  render() {
    const {todoItems} = this.state;
    return (
      <div className="App">
          <div className="Title">
            <h2>Todo List</h2>
          </div>
          {
            todoItems.length > 0 && todoItems.map(
              (item, index) => 
              <TodoItem 
                key = {index} 
                item={item} 
                onClick ={this.onItemClick(item)}
              />
            )
          }
          {todoItems.length === 0 && 'Nothing here...'}
      </div>
    );
  }
}

export default App;
