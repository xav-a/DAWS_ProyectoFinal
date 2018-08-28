import React, { Component } from "react";

class UserCombo extends React.Component {
    constructor(props) {
        super(props);
        this.state = { Users: [], showComponent: false, value: 2 };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        $.ajax({
            url: `http://127.0.0.1:8000/api/users/`,
            dataType: "json",
            cache: false,
            success: function (Users) {
                //console.log(data);
                this.setState({ Users: Users });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("api/users", status, err.toString());
            }.bind(this)
        });
    }

    handleChange(event) {
        this.setState({ value: event.target.value });

    }

    handleSubmit(event) {
        this.setState({
            showComponent: true,
        });

        event.preventDefault();
    }

    render() {
        const { Users } = this.state;


        return (
            <div>
                <form onSubmit={this.handleSubmit}>
                    <label>
                        Escoja usuario:
                        <select value={this.state.value} onChange={this.handleChange}>
                            {Users.map(User => (
                                <option key={User.id} value={User.id}>{User.username}</option>
                            ))}
                        </select>
                    </label>
                    <input type="submit" value="Submit" />
                </form>
                {this.state.showComponent && <TableContent userid={this.state.value} />}
            </div>
        );
    }
}

class TableContent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: []
        };
    }

    render() {
        $.ajax({
            url: `http://127.0.0.1:3000/show/posts/${this.props.userid}`, //userId
            dataType: "json",
            cache: false,
            success: function (data) {
                //console.log(data);
                this.setState({ data: data });
            }.bind(this),
            error: function (xhr, status, err) {
                console.error("show/posts", status, err.toString());
            }.bind(this)
        });
        const { data } = this.state;
        return (
            <div>
                <h3>Reporte de Post del usuario: {this.props.userid}</h3>
                <table className="table is-striped">
                    <thead>
                        <tr>
                            <th>Titulo</th>
                            <th>Fecha_creado</th>
                            <th>Fecha_editado</th>
                            <th>Imagen</th>
                            <th>Longitud Post</th>

                        </tr>
                    </thead>
                    <tbody>
                        {data.map(post => (
                            <tr key={post.id}>
                                <td>{post.title}</td>
                                <td>{post.createdAt}</td>
                                <td>{post.updatedAt}</td>
                                <td>{post.imageURL}</td>
                                <td>{post.content.length}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default UserCombo;