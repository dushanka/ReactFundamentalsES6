
(function() {

  class Quiz extends React.Component {
    constructor(props) {
      super(props);

      this.handleBookSelected = this.handleBookSelected.bind(this);
      this.handleContinue = this.handleContinue.bind(this);
      this.handleAddGame = this.handleAddGame.bind(this);
      this.getInitialState = this.getInitialState.bind(this);

      this.state = this.getInitialState();
    }

    getInitialState() {
      return _.extend({
        bgClass: 'neutral',
        showContinue: false,
      }, this.props.data.selectGame());
    }

    render() {
      return (
        <div>
          <div className="row">
            <div className="col-md-4">
              <img src={this.state.author.imageUrl} className="authorImage col-md-3" />
            </div>
            <div className="col-md-7">
              {this.state.books.map(function(b, i) {
                return <Book onBookSelected={this.handleBookSelected} title={b} key={i} />;
              }, this)}
            </div>
            <div className={"col-md-1 " + this.state.bgClass}>
            </div>
          </div>
          {
            this.state.showContinue ? (
              <div className="row">
                <div className="col-md-12">
                  <input onClick={this.handleContinue} type="button" className="btn btn-primary btn-lg pull-right" value="Continue"/>
                </div>
              </div>
            ) : <span />
          }
          <div className="row">
            <div className="col-md-12">
              <input onClick={this.handleAddGame} id="addGameButton"  type="button" value="Add Game" className="btn"/>
            </div>
          </div>
        </div>
      );
    }

    handleBookSelected(title) {
      let isCorrect = this.state.checkAnswer(title);
      this.setState({
        bgClass: isCorrect ? 'pass' : 'fail',
        showContinue: isCorrect
      });
    }

    handleContinue() {
      this.setState(this.getInitialState());
    }

    handleAddGame() {
      routie('add');
    }
  }

  class Book extends React.Component {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);
    }

    render() {
      return (
        <div onClick={this.handleClick} className="answer">
          <h4>{this.props.title}</h4>
        </div>
      );
    }

    handleClick() {
      this.props.onBookSelected(this.props.title);
    }
  }

  class AddGameForm extends React.Component {
    constructor() {
      super();

      this.handleSubmit = this.handleSubmit.bind(this);
    }

    render() {
      return (
        <div className="row">
          <div className="col-md-12">
            <h4>Add Game</h4>
            <form role="form" onSubmit={this.handleSubmit}>
              <div className="form-group">
                <input ref={(imageUrl) => { this.imageUrl = imageUrl; }} type="text" className="form-control" placeholder="Image Url" />
              </div>
              <div className="form-group">
                <input ref={(answer1) => {this.answer1 = answer1; }} type="text" className="form-control" placeholder="Answer 1" />
              </div>
              <div className="form-group">
                <input ref={(answer2) => {this.answer2 = answer2; }} type="text" className="form-control" placeholder="Answer 2" />
              </div>
              <div className="form-group">
                <input ref={(answer3) => {this.answer3 = answer3; }} type="text" className="form-control" placeholder="Answer 3" />
              </div>
              <div className="form-group">
                <input ref={(answer4) => {this.answer4 = answer4; }} type="text" className="form-control" placeholder="Answer 4" />
              </div>
              <button type="submit" className="btn btn-default">Submit</button>
            </form>
          </div>
        </div>
      );
    }

    handleSubmit() {
      this.props.onGameFormSubmitted(getRefs(this));
      return false;
    }
  }

  //<editor-fold desc="data properties">
  let data = [
    {
      name: 'Mark Twain',
      imageUrl: 'images/authors/marktwain.jpg',
      books: ['The Adventures of Huckleberry Finn', 'The Guilded Age']
    },
    {
      name: 'Joseph Conrad',
      imageUrl: 'images/authors/josephconrad.PNG',
      books: ['Heart of Darkness']
    },
    {
      name: 'Stephen King',
      imageUrl: 'images/authors/stephenking.jpg',
      books: ['The Shining', 'IT', 'Cujo']
    },
    {
      name: 'Charles Dickens',
      imageUrl: 'images/authors/charlesdickens.jpg',
      books: ['Great Expectations', 'A Tale of Two Cities']
    },
    {
      name: 'William Shakespeare',
      imageUrl: 'images/authors/williamshakespeare.jpg',
      imageSource: 'Wikimedia Commons',
      books: ['Hamlet', 'Macbeth', 'Romeo and Juliet']
    },
    {
      name: 'J.K. Rowling',
      imageUrl: 'images/authors/jkrowling.jpg',
      imageSource: 'Wikimedia Commons',
      imageAttribution: 'Daniel Ogren',
      books: ['Harry Potter and the Sorcerers Stone']
    }
  ];

  var selectGame = function() {
    let books = _.shuffle(this.reduce((p, c, i) => {
      return p.concat(c.books);
    }, [])).slice(0, 4);
    let answer = books[_.random(books.length - 1)];
    return {
      books: books,
      author: _.find(this, function(author) {
        return author.books.some((title) => {
          return title === answer;
        });
      }),
      checkAnswer: function(title) {
        return this.author.books.some((t) => {
          return t == title;
        });
      }
    };
  };

  data.selectGame = selectGame;
  //</editor-fold>

  //<editor-fold desc="routing">
  routie({
    '': () => {
      ReactDOM.render(<Quiz data={data}/>, document.getElementById('app'));
    },
    'add': () => {
      ReactDOM.render(<AddGameForm onGameFormSubmitted={handleAddGameFormSubmitted}/>, document.getElementById('app'));
    }
  });
  //</editor-fold>

  //<editor-fold desc="top-level scoped functions">
  function handleAddGameFormSubmitted(data) {
    let quizData = [{
      imageUrl: data.imageUrl,
      books: [data.answer1, data.answer2, data.answer3, data.answer4]
    }];
    quizData.selectGame = selectGame;
    ReactDOM.render(<Quiz data={quizData} />, document.getElementById('app'));
  };

  var getRefs = (component) => {
    let result = {
      imageUrl: component.imageUrl.value,
      answer1: component.answer1.value,
      answer2: component.answer2.value,
      answer3: component.answer3.value,
      answer4: component.answer4.value
    };
    return result;
  };
  //</editor-fold>

  //<editor-fold desc="prop-types validation">
  Quiz.propTypes = {
    data: PropTypes.array.isRequired
  };

  Book.propTypes = {
    title: PropTypes.string.isRequired
  };

  AddGameForm.propTypes = {
    onGameFormSubmitted: PropTypes.func.isRequired
  };
  //</editor-fold>

})();
