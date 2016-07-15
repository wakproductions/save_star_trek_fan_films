class ErrorBox extends React.Component {
  render() {
    if(this.props.errorMessages.length > 0) {
      return(
        <div className="alert alert-danger" role="alert" ref="errorNotifications">
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

class SuccessBox extends React.Component {
  render() {
    if(this.props.showSuccessMessage) {
      return(
        <h2 className="alert alert-success">Thank you for your letter. We'll mail this to CBS/Paramount on your behalf!</h2>
      );
    } else {
      return(false);
    }
  }
}
SuccessBox.propTypes = {
  errorMessages: React.PropTypes.string
}
SuccessBox.defaultProps = {
  displaySuccessMessage: false
}


class WriteLetterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = { errorMessages: [], showSuccessMessage: false };

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
        context.setState({errorMessages: [], showSuccessMessage: true});
      }
    ).fail((data) => {
        context.setState({errorMessages: data.responseJSON.errors});
    });
  }

  render() {
    if(this.state.showSuccessMessage) {
      return(<SuccessBox showSuccessMessage={true} />);
    } else {
      return (
        <form className="write-letter-form" onSubmit={this._handleSubmit.bind(this)}>
          <div>
            <ErrorBox errorMessages={this.state.errorMessages} />
            <div>
              <input
                className="form-element email"
                placeholder="Your Email Address (so you can receive updates)"
                ref={(r) => this._email = r}
                />
            </div>
            <div>
            <textarea
              className="form-element return-address"
              placeholder="Enter Your Return Mailing Address Here. This is how CBS/Paramount will likely respond to your letter."
              ref={(r) => this._return_address = r}
              >
            </textarea>
            </div>
            <div className="letter-text">Dear Mr. Van Citters:</div>
            <div>
            <textarea
              className="form-element body"
              placeholder="Type the body of your letter here. What do you think of the new fan film guidelines?"
              ref={(r) => this._body = r}
              >
            </textarea>
            </div>
            <div>
              <input
                className="form-element closing"
                placeholder="Sincerely"
                ref={(r) => this._closing = r}
                />,
            </div>
            <div>
              <input
                className="form-element name"
                placeholder="Your Name"
                ref={(r) => this._authorName = r}
                />
            </div>
            <div>
              <input
                className="btn btn-primary"
                type="submit"
                />
            </div>
          </div>
        </form>
      )
    }
  }
}
WriteLetterForm.propTypes = {
  email:          React.PropTypes.string,
  name:           React.PropTypes.string,
  returnAddress:  React.PropTypes.string,
  body:           React.PropTypes.string,
  closing:        React.PropTypes.oneOf(['Sincerely','Yours Truly','Regards','Best Wishes','Live Long and Prosper'])
}
