class ErrorBox extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    if(this.props.errorMessages.length > 0) {
      return(
        <div className="form-errors" ref="errorNotifications">
          <ul>
            {this.props.errorMessages.map((message) => {
              return(<li>{message}</li>)
            })}
          </ul>
        </div>
      );
    } else {
      return(false);
    }
  }
}
ErrorBox.propTypes = {
  errorMessages: React.PropTypes.array
}
ErrorBox.defaultProps = {
  errorMessages: []
}


class WriteLetterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMessages: []};

    this._create_letter_path = '/letters.json';
  }

  _handleSubmit(event) {
    event.preventDefault();
    let email          = this._email.value;
    let return_address = this._return_address.value;
    let body           = this._body.value;
    let closing        = this._closing.value;
    let name           = this._authorName.value;
    let letter = {
      letter: {
        email: email,
        return_address: return_address,
        body: body,
        closing: closing,
        name: name
      }
    }

    var context = this;
    $.post(
      this._create_letter_path,
      letter,
      (data) => {
        context.setState({errorText: data.response});
        alert('response received: ' + context);
      }
    ).fail((data) => {
        context.setState({errorMessages: data.responseJSON.errors});
    });
  }

  render() {
    return (
      <form className="write-letter-form" onSubmit={this._handleSubmit.bind(this)}>
        <div>
          <ErrorBox errorMessages={this.state.errorMessages} />
          <div>
            <input placeholder="Your Email Address (so you can receive updates from this website)" ref={(r) => this._email = r} />
          </div>
          <div><textarea placeholder="Enter Your Return Mailing Address Here. This is how CBS/Paramount will likely respond to your letter." ref={(r) => this._return_address = r}>

          </textarea></div>
          <div><textarea placeholder="Type the body of your letter here. What do you think of the new fan film guidelines?" ref={(r) => this._body = r}></textarea></div>
          <div><input placeholder="Sincerely" ref={(r) => this._closing = r} />,</div>
          <div><input placeholder="Your Name" ref={(r) => this._authorName = r} /></div>
          <div><input type="submit" /></div>
        </div>
      </form>
    )
  }
}
WriteLetterForm.propTypes = {
  email:          React.PropTypes.string,
  name:           React.PropTypes.string,
  returnAddress:  React.PropTypes.string,
  body:           React.PropTypes.string,
  closing:        React.PropTypes.oneOf(['Sincerely','Yours Truly','Regards','Best Wishes'])
}
