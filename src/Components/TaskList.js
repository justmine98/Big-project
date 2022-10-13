import React, { Component } from "react";
import TaskItem from "./TaskItem";


class TaskList extends Component {

constructor(props){
    super(props);
    this.state = {
        filterName : '',
        filterStatus : -1  //tat ca = -1, kich hoat =1 , an = 0.
    }
}
    onChange = (event) =>{
        var name=event.target.name;
        var value=event.target.value;
        console.log('Filter onChange', name, value);
        let filterName = name === 'filterName' ? value : this.state.filterName;
        let filterStatus = name === 'filterStatus' ? value : this.state.filterStatus;
        this.props.onFilter(filterName, filterStatus);
        // this.props.onFilter(  // this.props.onFilter(filterName, filterStatus)
        //     name === 'filterName' ? value : this.state.filterName,
        //     name === 'filterStatus' ? value : this.state.filterStatus,
        //     )
        this.setState({
            [name]: value
        });
    }


    render() {

        var { tasks } = this.props;
        var {filterName, filterStatus}= this.state;
        // **************** START
        // **** Cach dung Map()
        var elmTasks = tasks.map((task, index) => { // tra ve array 
            return <TaskItem
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}
                onDelete={this.props.onDelete}
                onUpdate={this.props.onUpdate}
            />
        });
        // **************** END 
        // **************** START
        // **** Cach dung forEach()
        // let elmTasks = []
        // tasks.forEach((task, index) => {
        //     var a = <TaskItem
        //         key={task.id}
        //         index={index}
        //         task={task}
        //         onUpdateStatus={this.props.onUpdateStatus}
        //         onDelete={this.props.onDelete}
        //         onUpdate={this.props.onUpdate}
        //     />
        //     elmTasks.push(a)
        // });
        // **************** END 
        return (

            <table className="table table-bordered table-hover mt-1 5">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Ngày thêm cv</th>
                        <th className="text-center">Ten</th>
                        <th className="text-center">Trang thai</th>
                        <th className="text-center">Hanh Dong</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName" 
                                value={filterName}
                                onChange= {this.onChange}
                                />
                        </td>
                        <td>
                            <select

                                className="form-control"
                                name="filterStatus"
                                value={filterStatus}
                                onChange= {this.onChange}
                            >
                                <option value={-1}>Tat ca</option>
                                <option value={0}>An</option>
                                <option value={1}>Kich hoat</option>
                                
                            </select>
                        </td>
                        <td></td>
                    </tr>
                    {elmTasks}
                </tbody>
            </table>


        );

    }
}


export default TaskList;