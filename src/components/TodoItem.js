// khoi tao component
// import react
// component co the nhan vao nhieu props
import React, { Component } from 'react';

// them thu vien classnames de xu ly su kioen len quan den class css
import classnames from 'classnames';

import './TodoItem.css';
import checkImg from "./images/check.svg";
import checkImg_done from "./images/check-complete.svg";

//khai bao class
// trong react props la read only
class TodoItem extends Component{
    // method render reuturn ra element muon su dung
    // // demo su ly su kien trong react
    // constructor(props){
    //     super(props);

    //     this.onItemClick = this.onItemClick.bind(this);
    // }

    // onItemClick(){
        
    // }

    render() {
        const {item, onClick} = this.props;
        // /*
        // hoac dung const {item} = this.props;
        // */
        // let className = "to-Do-Item";
        // if(item.isComplete){
        //     className += " to-Do-Item-Done";
        // }
        let url = checkImg;
        if(item.isComplete){
            url = checkImg_done;
        }
        return (
            // cach sua loi truyen vao mot ham goi ham onItemClick
            // neu truyen this.onItemClick() vao thay vi this.onItemClick thi ham se thuc thi ngay
            <div  className = {classnames( 'to-Do-Item', {'to-Do-Item-Done': item.isComplete})}>
                <img onClick = {onClick} src = {url} alt = {item.title} />
                <p> {item.title}</p>
            </div>
        );
    }
}

export default TodoItem;