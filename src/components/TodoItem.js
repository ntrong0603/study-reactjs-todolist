// khoi tao component
// import react
// component co the nhan vao nhieu props
import React, { Component } from 'react';
import './TodoItem.css';

//khai bao class
class TodoItem extends Component{
    //method render reuturn ra element muon su dung
    render() {
        const item = this.props.item;
        /*
        hoac dung const {item} = this.props;
        */
        let className = "to-Do-Item";
        if(item.isComplete){
            className += " to-Do-Item-Done";
        }
        return (
            <div className = {className}>
                <p> {item.title}</p>
            </div>
        );
    }
}

export default TodoItem;