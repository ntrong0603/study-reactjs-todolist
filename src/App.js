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
    if(localStorage.getItem('todoItems') !== null){
      const Items = JSON.parse(localStorage.getItem("todoItems"));
      console.log(Items);
      this.state ={
        todoItems: [...Items.todoItems],
        statusCheck: Items.statusCheck,
        haveItemsConpleted: Items.haveItemsConpleted,
        curentFilterItem: Items.curentFilterItem
      };
    }
    else{
      this.state ={ 
        todoItems: [],
        statusCheck: false,
        haveItemsConpleted: false,
        curentFilterItem: "All" // All, completed, active
      }
      localStorage.todoItems = JSON.stringify(this.state);
    }
    // su ly
    this.onKeyUp = this.onKeyUp.bind(this);
    this.onDeleteCompleted = this.onDeleteCompleted.bind(this);
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
      this.itemsComplete(todoItems);
    }
  }

  // trang thai cho nut chon tat ca
  // neu co mot phan tu chua hoan thanh thi nut chon tat ca o trang thai false
  statusCheck(todoItems){
    const statusCheck = todoItems.filter(item => item.isComplete === false);
    if(statusCheck.length > 0){
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

  // co mot phan tu duoc hoan thanh thi hien thi btn cho phep xoa cac phan tu hoan thanh
  itemsComplete(todoItems){
    const haveItemsConpleted = todoItems.filter(item => item.isComplete === true);
    if(haveItemsConpleted.length === 0){
      this.setState({
        haveItemsConpleted: false
      });
    }
    else{
      this.setState({
        haveItemsConpleted: true
      });
    }
  }

  // Chon tat ca
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
      });
      this.itemsComplete(todoItems);
    }
  }

  // loc
  onFilter(filter){
    return () => {
      this.setState({
        curentFilterItem: filter 
      });
    }
  }

  //xoa 1 phan tu chi dinh
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

  onDeleteCompleted(){
    const todoItems = this.state.todoItems;
    this.setState({
      todoItems: [...todoItems.filter( item => item.isComplete === false)]
    });
    this.itemsComplete(todoItems);
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
    const {todoItems, statusCheck, haveItemsConpleted, curentFilterItem} = this.state;
    localStorage.todoItems = JSON.stringify(this.state);
    let todoItems2 = [...todoItems];
    switch (curentFilterItem){
      case "Completed":
        todoItems2 = todoItems2.filter(item => item.isComplete === true);
        break;
      case "Active":
        todoItems2 = todoItems2.filter(item => item.isComplete === false)
        break;
      default:
        break;
    }

    
    return (
      <div className="App">
          <div className="Title">
            <h2>Todo List</h2>
          </div>
          <div className = "header">
            <img className={classnames({'check': statusCheck}, {'hidden': todoItems2.length === 0})} src = {checkAll} alt = "check all" onClick = {this.onCheckAll()}/>
            <input type = "text" name = "work" placeholder = "What needs to be done?" autoComplete = "off" onKeyUp = {this.onKeyUp}/>
          </div>
          {
            todoItems2.length > 0 && todoItems2.map(
              (item, index) => 
              <TodoItem 
                key = {index} 
                item={item} 
                onClick ={this.onItemClick(item)}
                onDelete ={this.onDelete(item)}
              />
            )
          }
          {
            todoItems.length > 0 &&
              <div id="status-bar">
                <div id = "countItemsNotDone">
                  {todoItems.filter(item => item.isComplete === false).length} item left
                </div>
                <div id = "filter-bar">
                  <div id="filter-all" onClick = {this.onFilter('All')}>
                    All
                  </div>
                  <div id="filter-active" onClick = {this.onFilter('Active')}>
                    Active
                  </div>
                  <div id="filter-completed" onClick = {this.onFilter('Completed')}>
                    Completed
                  </div>
                </div>
                <div id = "clear-completed" className = {classnames({'hidden-completed': !haveItemsConpleted})} onClick = {this.onDeleteCompleted}>
                  Clear completed
                </div>
              </div>
            
          }
         
      </div>
    );
  }
}

export default App;
