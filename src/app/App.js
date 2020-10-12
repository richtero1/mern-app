import React, { Component } from 'react';

class App extends Component {

    constructor() {
        super();

        this.t1;
        this.t2;
        this.t; 

        this.state = {
            first_name: '',
            last_name: '',
            email: '',
            birthdate: '',
            gender: '',
            ssn: '',
            phone_number: '',
            department: '',
            city: '',
            state: '',
            _id: '',
            tasks: [],
            t: 0
        };
        this.handleChange = this.handleChange.bind(this);
        this.addTask = this.addTask.bind(this);
    }

    handleChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    addTask(e) {
        e.preventDefault();
        if (this.state._id) {
            this.t1 = performance.now();

            fetch(`/api/tasks/${this.state._id}`, {
                method: 'PUT',
                body: JSON.stringify({
                    first_name: this.state.first_name,
                    last_name: this.state.last_name,
                    email: this.state.email,
                    birthdate: this.state.birthdate,
                    gender: this.state.gender,
                    ssn: this.state.ssn,
                    phone_number: this.state.phone_number,
                    department: this.state.department,
                    city: this.state.city,
                    state: this.state.state
                }),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        _id: '', first_name: '', last_name: '', email: '', birthdate: '',
                        gender: '', ssn: '', phone_number: '', department: '', city: '', state: ''
                    });
                    this.fetchTasks();
                });
            this.t2 = performance.now();
            this.t = this.t2 - this.t1;
            console.log(this.t);

        } else {
            this.t1 = performance.now();
            fetch(`/api/tasks`, {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
                .then(res => res.json())
                .then(data => {
                    this.setState({
                        first_name: '', last_name: '', email: '', birthdate: '',
                        gender: '', ssn: '', phone_number: '', department: '', city: '', state: ''
                    });
                    this.fetchTasks();
                })
                .catch(err => console.error(err));
            this.t2 = performance.now();
            this.t = this.t2 - this.t1;
            console.log(this.t);
        }
    }

    deleteTask(id) {
        this.t1 = performance.now();
        fetch(`/api/tasks/${id}`, {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then(res => res.json())
            .then(data => {
                this.fetchTasks();
            });
        this.t2 = performance.now();
        this.t = this.t2 - this.t1;
        console.log(this.t);
    }

    editTask(id) {
        fetch(`/api/tasks/${id}`)
            .then(res => res.json())
            .then(data => {

                this.setState({
                    first_name: data.first_name,
                    last_name: data.last_name,
                    email: data.email,
                    birthdate: data.birthdate,
                    gender: data.gender,
                    ssn: data.ssn,
                    phone_number: data.phone_number,
                    department: data.department,
                    city: data.city,
                    state: data.state,
                    _id: data._id
                });
            });
    }

    componentDidMount() {
        this.fetchTasks();
        this.query();
    }

    fetchTasks () {

        fetch('/api/tasks')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });

            });
    }

    query = () =>  {

        fetch('/api/tasks/query')
            .then(res => res.json())
            .then(data => {
                this.setState({ tasks: data });

            });
    }

    render() {
        return (
            <div>
                <div className="container-fluid">
                    <nav className="navbar navbar-expand-sm bg-light">
                        <ul className="navbar-nav">
                            <li className="nav-item active">
                                <h2>App</h2>
                            </li>
                        </ul>
                    </nav>
                </div>

                <div className="container p-3">
                    <form className="card - card-body" onSubmit={this.addTask}>
                        <div className="row">
                            <div className="col">
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Primer nombre" name="first_name" onChange={this.handleChange} value={this.state.first_name} />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Apellido" name="last_name" onChange={this.handleChange} value={this.state.last_name} />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Email" name="email" onChange={this.handleChange} value={this.state.email} />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Cumpleanos" name="birthdate" onChange={this.handleChange} value={this.state.birthdate} />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Genero" name="gender" onChange={this.handleChange} value={this.state.gender} />
                                </div>
                            </div>
                            <div className="col">
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="SSN" name="ssn" onChange={this.handleChange} value={this.state.ssn} />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Num. Telefono" name="phone_number" onChange={this.handleChange} value={this.state.phone_number} />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Dept." name="department" onChange={this.handleChange} value={this.state.department} />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Ciudad" name="city" onChange={this.handleChange} value={this.state.city} />
                                </div>
                                <div className="form-group input-group">
                                    <div className="input-group-text bg-light">
                                        <i className="material-icons">create</i>
                                    </div>
                                    <input type="text" className="form-control" placeholder="Estado" name="state" onChange={this.handleChange} value={this.state.state} />
                                </div>
                            </div>
                        </div>
                        <button className="btn btn-success btn-block">{this.state._id === '' ? 'Save' : 'Update'}</button>
                    </form>
                </div>

                <div className="container">
                    <div className="row" >
                        <div className="col-3"></div>
                        <div className="col-3 ">
                            <button type="button" className="btn btn-success " onClick={this.fetchTasks}> Obtener Todo</button>
                        </div>
                        <div className="col-1"></div>
                        <div className="col-3 text center">
                            <button type="button" className="btn btn-success " onClick={this.query}> Ejecutar prueba</button>
                        </div>
                        <div className="col-2"></div>
                    </div>
                </div>

                <div className="container">
                    <br />
                    <h1>tiempo de respuesta: </h1>
                </div>

                <div className="container">
                    <br />
                    <div className="table-responsive">
                        <table className="table table-striped">
                            <thead >
                                <tr>
                                    <th>First name</th>
                                    <th>Last name</th>
                                    <th>Email</th>
                                    <th>Birthdate</th>
                                    <th>Gender</th>
                                    <th>SSN</th>
                                    <th>Num. Telefono</th>
                                    <th>Dept.</th>
                                    <th>Ciudad</th>
                                    <th>Estado</th>
                                </tr>
                            </thead>
                            <tbody>
                                {this.state.tasks.map(employee => {
                                    return (
                                        <tr key={employee._id}>
                                            <td>{employee.first_name}</td>
                                            <td>{employee.last_name}</td>
                                            <td>{employee.email}</td>
                                            <td>{employee.birthdate}</td>
                                            <td>{employee.gender}</td>
                                            <td>{employee.ssn}</td>
                                            <td>{employee.phone_number}</td>
                                            <td>{employee.department}</td>
                                            <td>{employee.city}</td>
                                            <td>{employee.state}</td>
                                            <td>
                                                <i className="material-icons text-danger p-2" onClick={() => this.deleteTask(employee._id)}>close</i>
                                                <i className="material-icons p-2" onClick={() => this.editTask(employee._id)}>create</i>
                                            </td>
                                        </tr>
                                    )
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        )
    }
}

export default App;