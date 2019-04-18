import React, { Component } from 'react';
import './App.css';
import TodoItem from './components/TodoItem';
import classnames from 'classnames';
import checkAll from './components/images/check-all.svg';
// Immutability khong co kha nang thay doi trang thai ben trong
//"mutate thay doi trang thai ben trong"
class App extends Component {
  constructor(){
    super();
    this.state ={ 
      todoItems:  [
          { title: 'Mua bin bin', isComplete: false }, 
          { title: 'An' , isComplete: false}, 
          { title: 'uong' , isComplete: false}
        ],
      statusCheck: false
    }
    // su ly
    this.onKeyUp = this.onKeyUp.bind(this);
  }

  // khong truyen ham vao su kien su ly ma goi luon tra ve 1 ham arrow function khac
  onItemClick(item){
    return () => {
      const isComplete = item.isComplete;
      const index = this.state.todoItems.indexOf(item);
      const todoItems =  [
        ...this.state.todoItems.slice(0, index), 
        {
          ...item,
          isComplete: !isComplete
        },
        ...this.state.todoItems.slice(index + 1)];
      this.setState({
        todoItems: todoItems
      });
      this.statusCheck(todoItems);
    }
  }

  statusCheck(todoItems){
    const result = todoItems.filter(item => item.isComplete === false);
      if(result.length > 0 || todoItems.length === 0){
        this.setState({
          statusCheck: false
        });
      }
      else{
        this.setState({
          statusCheck: true
        });
      }
  }

  onCheckAll(){
    return () => {
      const todoItems = [...this.state.todoItems];
      const statusCheck = !this.state.statusCheck;
      todoItems.map(item => item.isComplete = statusCheck);
      
      this.setState({
        todoItems: [
          ...todoItems
        ],
        statusCheck: statusCheck
      })
    }
  }

  onDelete(item){
    return () => {
      const index = this.state.todoItems.indexOf(item);
      const todoItems =  [
        ...this.state.todoItems.slice(0, index), 
        ...this.state.todoItems.slice(index + 1)];
      this.setState({
        todoItems: todoItems
      });
      this.statusCheck(todoItems);
    };
  }

  onKeyUp(event){
    //keyCode la ma phim duoc nhan
    //.target dai dien cho the
    //.target.value lay gia tri
    if(event.keyCode === 13){ // enter key
      let text = event.target.value;
      text = text.trim();
      if(!text || text === ""){
        return;
      }
      const todoItems = this.state.todoItems;
      this.setState({
         todoItems: [
          {
            title: event.target.value, isComplete: false
          },
           ...todoItems
         ]
       });
      event.target.value = "";
    }
  }

  //truyen 1 function thong qua props
  render() {
    const {todoItems, statusCheck} = this.state;
    return (
      <div className="App">
          <div className="Title">
            <h2>Todo List</h2>
          </div>
          <div className = "header">
            <img className={classnames({'check': statusCheck}, {'hidden': todoItems.length === 0})} src = {checkAll} alt = "check all" onClick = {this.onCheckAll()}/>
            <input type = "text" name = "work" placeholder = "What needs to be done?" autoComplete = "off" onKeyUp = {this.onKeyUp}/>
          </div>
          {
            todoItems.length > 0 && todoItems.map(
              (item, index) => 
              <TodoItem 
                key = {index} 
                item={item} 
                onClick ={this.onItemClick(item)}
                onDelete ={this.onDelete(item)}
              />
            )
          }
         
      </div>
    );
  }
}

export default App;
