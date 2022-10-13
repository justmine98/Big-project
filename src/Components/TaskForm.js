        import React, { Component } from "react";
        class TaskForm extends Component {


            constructor(props) {
                var today = new Date();
                var date = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0') ;
                super(props);
                this.state = {
                    id:'',
                    name: '',
                    status: false,
                    startdate: date
                }
            }
        //     componentWillMount(){
        //         // don dep form
        //         if (this.props.task){
        //             this.setState({
        //                 id: this.props.task.id,
        //                 name: this.props.task.name,
        //                 status: this.props.task.status,
        //                 startdate:this.props.task.startdate
        //     });
            
        //     }
        // }

        componentWillReceiveProps(nextProps){
            var today = new Date();
            var date = today.getFullYear() + '-' + String(today.getMonth()+1).padStart(2, '0') + '-' + String(today.getDate()).padStart(2, '0') ;
            if(nextProps && nextProps.task){
                this.setState({
                    id: nextProps.task.id,
                    name: nextProps.task.name,
                    status: nextProps.task.status,
                    startdate: nextProps.task.startdate
                });
            }else if(!nextProps.task){
                this.setState({
                    id:'',
                    name: '',
                    status: false,
                    startdate: date
                });
            
            }
        }


            onCloseForm = () => {
                this.props.onCloseForm();
            }
            onChange = (event) => {
                console.log(event);
                var name = event.target.name;
                var value = event.target.value;
                if (name === 'status') {
                    value = event.target.value === 'true' ? true : false;
                }
                this.setState({
                    [name]: value
                });
            }

            onSubmit = (event) => {
                event.preventDefault();
                this.props.onSubmit(this.state);
                // sau khi luu thi xoa va dong cai form
                this.onClear();
                this.onCloseForm();

            }
            onClear = () => {
                // dua form ve trang thai ban dau / xoa form
                this.setState({

                    name: '',
                    status: false
                });
            }

            render() {
                console.log('dsd',this.state)
                var {id} = this.state;
                return (
                    <div className="panel panel-warning">
                        <div className="panel-heading">
                            <h3 className="panel-title">
                                { id !=='' ? 'Cập Nhật Công Việc' : 'Thêm Công Việc'}
                                <span 
                                    className="fa fa-times-circle text-right"
                                    onClick={this.onCloseForm}
                                ></span>
                            </h3>
                        </div>
                        <div className="panel-body">
                            <form onSubmit={this.onSubmit}>
                                <div className="form-group">
                                    <label>Tên :</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <div className="form-group">
                                <label for="start">Ngày nhập công việc:</label>

                                    <input type="date" 
                                        id="start"   
                                        name="startdate"
                                        value={this.state.startdate}
                                        onChange={this.onChange}
                                    />
                                </div>
                                <label>Trạng Thái :</label>
                                <select
                                    className="form-control"
                                    name="status"
                                    value={this.state.status}
                                    onChange={this.onChange}
                                >
                                    <option value={true}>Kích Hoạt</option>
                                    <option value={false}>Ẩn</option>
                                </select>
                                <br />
                                <div className="text-center">
                                    <button type="submit" className="btn btn-warning">
                                        <span className="fa fa-plus mr-5" />Lưu Lại
                                    </button>
                                    &nbsp;
                                    <button type="button"
                                        className="btn btn-danger"
                                        onClick={this.onClear}
                                    >
                                        <span className="fa fa-close mr-5" />Hủy Bỏ
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            }
        }


        export default TaskForm;