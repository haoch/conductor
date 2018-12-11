import React from "react";

import {connect} from "react-redux";
import { Panel } from 'react-bootstrap';

class WorkflowForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: props.title,
      name: props.name,
      version: props.version,
      workflowDef: props.workflowDef,
      request: {
        correlationId: "",
        input: {},
        taskToDomain: {},
        externalInputPayloadStoragePath: ""
      }
    };

    this.handleRequestChange = this.handleRequestChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
    this.renderWorkflowInputs = this.renderWorkflowInputs.bind(this);
    this.renderWorkflowInputs = this.renderWorkflowInputs.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.state.title = nextProps.title;
    this.state.name = nextProps.name;
    this.state.version = nextProps.version;
    this.state.workflowDef = nextProps.workflowDef;
  }

  handleRequestChange(event) {
    try {
      this.state.request = JSON.parse(event.target.value);
    } catch (err) {
      console.error(err);
    }
  }

  handleFormSubmit(event) {
    event.preventDefault();
    console.log(event, this.state);
  }

  renderWorkflowInputs() {
    const inputList = this.state.workflowDef && this.state.workflowDef.inputParameters ? this.state.workflowDef.inputParameters.map((inputParameter) =>
      <tr>
        <td>{inputParameter}</td>
        <td><input className="form-control" type="text" name={inputParameter} placeholder={"input parameter"}/></td>
      </tr>
    ) : [];
    return (
      <table className="table">
        <thead>
        <tr>
          <th width="25%">Input</th>
          <th>Value</th>
        </tr>
        </thead>
        <tbody>
        {inputList}
        </tbody>
      </table>
    )
  }

  renderWorkflowTasks() {
    const taskList = this.state.workflowDef && this.state.workflowDef.tasks ? this.state.workflowDef.tasks.map((task) =>
      <tr>
        <td>{task.name}</td>
        <td><input className="form-control" type="text" name={task.name} placeholder="task domain "/></td>
      </tr>
    ) : [];
    return (
      <table className="table table-responsive">
        <thead>
        <tr>
          <th width="25%">Task</th>
          <th>Domain</th>
        </tr>
        </thead>
        <tbody>
        {taskList}
        </tbody>
      </table>
    )
  }

  render() {
    return <div>
      <Panel header={this.state.title}>
        <form onSubmit={this.handleFormSubmit}>
          <div className="form-group">
            <label className="control-label">Workflow/Version</label>
            <div className="form-control-static">
              {this.state.name}/v<span className="text text-muted">{this.state.version}</span>
            </div>
          </div>

          <div className="form-group">
            <label className="control-label">Input Parameters</label>
            <div>
              {this.renderWorkflowInputs()}
            </div>
          </div>

          <div className="form-group">
            <label className="control-label">Configurations</label>
            <div>
              {this.renderWorkflowTasks()}
            </div>
          </div>
          <div className="form-group">
            <div className="row">
              <div className="col-lg-3" style={{marginBottom: "5 em"}}>
                <span className="control-label">Correlation ID</span>
              </div>
              <div className="col-lg-8">
                <input className="form-control" type="text" name="correlationId" placeholder="correlation id"/>
              </div>
            </div>
            <div className="row">
              <div className="col-lg-3">
                <span className="control-label">ExternalInputPayloadStoragePath</span>
              </div>
              <div className="col-lg-8">
                <input className="form-control" type="text" name="externalInputPayloadStoragePath"
                       placeholder="External input payload storage path"/>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="control-label"/>
            <div className="form-control-static">
              <input className="btn btn-primary" type="submit" name="Create"/>
            </div>
          </div>
        </form>
      </Panel>
    </div>
  }
}

export default connect(state => state.workflow)(WorkflowForm);