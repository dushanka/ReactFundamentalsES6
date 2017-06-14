
(function() {

  class Quiz extends React.Component {
    constructor(props) {
      super(props);

      this.handleBookSelected = this.handleBookSelected.bind(this);
      this.handleContinue = this.handleContinue.bind(this);
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
            {console.log("rerender: " + this.state.bgClass)}
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
        </div>
      );
    }

    handleBookSelected(title) {
      let isCorrect = this.state.checkAnswer(title);
      console.log("Selected book isCorrect? " + isCorrect);
      this.setState({
        bgClass: isCorrect ? 'pass' : 'fail',
        showContinue: isCorrect
      });
    }

    handleContinue() {
      this.setState(this.getInitialState());
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
    }
  ];

  data.selectGame = function() {
    let books = _.shuffle(this.reduce(function(p, c, i) {
      return p.concat(c.books);
    }, [])).slice(0, 4);
    let answer = books[_.random(books.length - 1)];
    return {
      books: books,
      author: _.find(this, function(author) {
        return author.books.some(function(title) {
          return title === answer;
        });
      }),
      checkAnswer: function(title) {
        return this.author.books.some(function(t) {
          return t == title;
        });
      }
    };
  };

  ReactDOM.render(<Quiz data={data}/>, document.getElementById('app'));

})();
