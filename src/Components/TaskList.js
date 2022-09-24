import React, { Component } from "react";
import TaskItem from "./TaskItem";


class TaskList extends Component {
    render() {

        var { tasks } = this.props;
        var elmTasks = tasks.map((task, index) => {
            return <TaskItem
                key={task.id}
                index={index}
                task={task}
                onUpdateStatus={this.props.onUpdateStatus}
            />
        });
        return (

            <table className="table table-bordered table-hover mt-1 5">
                <thead>
                    <tr>
                        <th className="text-center">STT</th>
                        <th className="text-center">Ten</th>
                        <th className="text-center">Trang thai</th>
                        <th className="text-center">Hanh Dong</th>

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td></td>
                        <td>
                            <input
                                type="text"
                                className="form-control"
                                name="filterName" />
                        </td>
                        <td>
                            <select

                                className="form-control"
                                name="filterStatus"
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