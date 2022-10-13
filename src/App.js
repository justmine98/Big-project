import React, { Component } from 'react';
import './App.css';
import TaskForm from './Components/TaskForm';
import TasksControl from './Components/TasksControl';
import TaskList from './Components/TaskList';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [],
      isDisplayForm: true,
      TaskEditing : null,
      filter : {
        name : '',
        status : -1
      },
      keyword : '',
      sortBy: 'name',
      sortValue: 1
    }
  }



  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      console.log(localStorage.getItem('tasks'), JSON.parse(localStorage.getItem('tasks')))
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks: tasks
      });
    }
  }


  s4() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
  }
  gennerateID() {
    return this.s4() + this.s4() + '-' + this.s4() + '-' + this.s4() + this.s4();
    // return 1
  }
  onToggleForm = () => {
    // trong truong hop sua task
    if(this.state.isDisplayForm && this.state.TaskEditing !== null){
        this.setState({
        isDisplayForm: true,
        TaskEditing : null 
    });
  }
  // trong truong them hoac an hien form
  else {
        this.setState({
        isDisplayForm: !this.state.isDisplayForm,
        TaskEditing : null 
    })
  }
  }

  onCloseForm = () => {
    this.setState({
      isDisplayForm: false
    });

  }
  onShowForm = () => {
    this.setState({
      isDisplayForm: true
    });

  }

  onSubmit = (task) => {
    var { tasks } = this.state;
    if(task.id === ''){
      task.id = this.gennerateID();
      tasks.push(task);
    }else{
      var index = this.findIndex(task.id);
      tasks[index] = task;
    }
    
    this.setState({
      tasks: tasks,
      TaskEditing : null
    });
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  onUpdateStatus = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    console.log(index);
    if (index !== -1) {
      tasks[index].status = !tasks[index].status;
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }
  findIndex = (id) => {
    var { tasks } = this.state;
    var result = -1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index // tra ra vi tri cua task
      }
    });
    return result;
  }
  onDelete = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks: tasks
      });
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    this.onCloseForm();
  }
  onUpdate = (id) => {
    var {tasks}= this.state;
    var index =this.findIndex(id);
    var TaskEditing = tasks[index];
    this.setState({
        TaskEditing : TaskEditing
    });
    this.onShowForm();
  }
  
  onFilter = (filterName, filterStatus) =>{
    filterStatus = parseInt(filterStatus, 10);
    this.setState({
      filter:{
        name : filterName.toLowerCase(),
        status : filterStatus
      }
    });
  }
onSearch = (keyword) => {
  this.setState({
      keyword : keyword
  });
}

onSort =  (sortBy, sortValue) => {
  this.setState({
    sortBy : sortBy,
    sortValue : sortValue

  });
      
  

}

  render() {
    console.log('app', this.state)
    var { tasks, isDisplayForm, TaskEditing, filter, keyword, sortBy, sortValue } = this.state;

    if(filter){
      if(filter.name){
        tasks = tasks.filter((task) =>{
            return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task)=>{
          if(filter.status === -1){
            return task;
          }else{
            return task.status === (filter.status === 1 ? true : false)
          }
      });
    }
    if(keyword){
      let lowKey = keyword.toLowerCase() // cung chuyen ve dang khong viet hoa de luon tra ra ket qua khong phan biet hoa thuong.
      tasks = tasks.filter((task) =>{
        return task.name.toLowerCase().indexOf(lowKey) !== -1; //
    });
    }

    var elmTaskForm = isDisplayForm ?
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm} 
        task={TaskEditing}
        /> : '';

    if(sortBy !== ''){
      tasks.sort((a,b)=> { // a,b la 2 task ngau nhien 
        console.log('sortBy', a, b)
        if(a[sortBy] > b[sortBy]) return sortValue;
        else if(a[sortBy] < b[sortBy]) return -sortValue;
        else return 0;
      });
    }

    
    // if(sortBy === 'name'){
    //   tasks.sort((a,b)=> { // a,b la 2 task ngau nhien 
    //     console.log('sortBY', a, b)
    //     if(a.name > b.name) return sortValue;
    //     else if(a.name < b.name) return -sortValue;
    //     else return 0;
    //   });
    // }else if(sortBy === 'status'){
    //   tasks.sort((a,b)=> {
    //     if(a.status > b.status) return -sortValue;
    //     else if(a.status < b.status) return sortValue;
    //     else return 0;
    //   });
    // } else {
    //   tasks.sort((a,b)=> {
    //     if(a.startdate > b.startdate) return -sortValue;
    //     else if(a.startdate < b.startdate) return sortValue;
    //     else return 0;
    //   });
    // }

    return (
      <div className="container">
        <div className='text-center'>
          <h1>Quan li cong viec</h1><hr />
        </div>
        <div className="row">
          <div className={isDisplayForm ? "col-xs-4 col-sm-4 col-md-4 col-lg-4" : ""}>
            {elmTaskForm}
            {/* {isDisplayForm ?
      <TaskForm
        onSubmit={this.onSubmit}
        onCloseForm={this.onCloseForm} 
        task={TaskEditing}/> : ''} */}
          </div>
          <div className={isDisplayForm ? "col-xs-8 col-sm-8 col-md-8 col-lg-8" :
            "col-xs-12 col-sm-12 col-md-12 col-lg-12"}>
            <button
              type="button"
              className='btn btn-primary'
              onClick={this.onToggleForm}
            >
              <span className='fa fa-plus mr-5'></span>
                   Them cong viec
            </button>
            <TasksControl 
              onSearch ={this.onSearch}
              onSort = {this.onSort}
              sortBy ={sortBy}
              sortValue={sortValue}
             />
            {/*Seach-Sort*/}
            <TaskList
              tasks={tasks}
              onUpdateStatus={this.onUpdateStatus}
              onDelete={this.onDelete}
              onUpdate={this.onUpdate}
              onFilter={this.onFilter}
            />
            {/*List*/}
          </div>
        </div>
      </div>
    );
  }
}
export default App;