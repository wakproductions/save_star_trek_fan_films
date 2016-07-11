var WriteLetterForm = React.createClass({
  _create_letter_path: '/letters.json',

  propTypes: {
    email:          React.PropTypes.string,
    name:           React.PropTypes.string,
    returnAddress:  React.PropTypes.string,
    body:           React.PropTypes.string,
    closing:        React.PropTypes.oneOf(['Sincerely','Yours Truly','Regards','Best Wishes'])
  },

  _handleSubmit: function(event) {
    event.preventDefault();
    let email          = this.refs.email.value;
    let return_address = this.refs.return_address.value;
    let body           = this.refs.body.value;
    let closing        = this.refs.closing.value;
    let name           = this.refs.author_name.value;
    let letter = {
      letter: {
        email: email,
        return_address: return_address,
        body: body,
        closing: closing,
        name: name
      }
    };

    $.post(
      this._create_letter_path,
      letter,
      (data) => {
        alert('response received: ' + data);
      }
    ).fail((data) => {
        alert('fail response:' + data.friendly_errors);
    });
  },

  render: function() {
    return (
      <form className="write-letter-form" onSubmit={this._handleSubmit}>
        <div>
          <div>
            <input placeholder="Your Email Address (so you can receive updates from this website)" ref="email" />
          </div>
          <div><textarea placeholder="Enter Your Return Mailing Address Here. This is how CBS/Paramount will likely respond to your letter." ref="return_address">

          </textarea></div>
          <div><textarea placeholder="Type the body of your letter here. What do you think of the new fan film guidelines?" ref="body"></textarea></div>
          <div><input placeholder="Sincerely" ref="closing" />,</div>
          <div><input placeholder="Your Name" ref="author_name" /></div>
          <div><input type="submit" /></div>
        </div>
      </form>
    );
  }
});
