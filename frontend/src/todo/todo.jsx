import React, {Component} from "react";
import PageHeader from "../template/pageHeader";
import TodoForm from "./todoForm";
import TodoList from "./todoList";
import axios from "axios";

const url = 'http://localhost:3003/api/todos'

export default class Todo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            list: []
        };
        this.handleMarkAsDone = this.handleMarkAsDone.bind(this)
        this.handleMarkAsPending = this.handleMarkAsPending.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleAdd = this.handleAdd.bind(this);

        this.handleRemove = this.handleRemove.bind(this)
        this.handleSearch = this.handleSearch.bind(this)
        this.handleClear = this.handleClear.bind(this)

        this.refresh()
    }

    refresh(description = '') {
        const search= description ?  `&description__regex=/${description}/` : ''
        axios.get(`${url}?sort=-createdAt${search}`)
            .then(resp => this.setState({...this.state, description, list: resp.data}))
    }

    handleSearch() {
        this.refresh(this.state.description)
    }

    handleChange(e) {
        this.setState({...this.state, description: e.target.value})
    }

    handleAdd() {
        const description = this.state.description
        axios.post(url, {description})
            .then(resp => this.refresh())
    }

    handleRemove(todo) {
        axios.delete(`${url}/${todo._id}`)
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsDone(todo) {
        axios.put(`${url}/${todo._id}`, {...todo, done: true})
            .then(resp => this.refresh(this.state.description))
    }

    handleMarkAsPending(todo) {
        axios.put(`${url}/${todo._id}`, {...todo, done: false})
            .then(resp => this.refresh(this.state.description))
    }

    handleClear() {
        this.refresh()
    }

    render() {
        return (
            <div>
                <PageHeader name={"Tarefas"} small={"Cadastro"}/>

                <TodoForm description={this.state.description}
                          handleChange={this.handleChange}
                          handleAdd={this.handleAdd}
                          handleSearch={this.handleSearch}
                          handleClear={this.handleClear}
                />

                <TodoList list={this.state.list}
                          handleMarkAsDone={this.handleMarkAsDone}
                          handleMarkAsPending={this.handleMarkAsPending}
                          handleRemove={this.handleRemove}
                />
            </div>
        );
    }
}
