'use strict';
var Generator = require('yeoman-generator');
var chalk = require('chalk');
var yosay = require('yosay');
var path = require('path');
var mkdirp = require('mkdirp');

module.exports = Generator.extend({
  prompting: function () {
    // Have Yeoman greet the user.
    this.log(yosay(
      'Welcome to the ' + chalk.red('generator-idyll') + ' generator!'
    ));

    var prompts = [{
      type: 'text',
      name: 'name',
      message: 'Project name (I\'ll create a new folder with this name and put the generated files inside of it): ',
      default: 'idyll-project'
    }];

    return this.prompt(prompts).then(function (props) {
      // To access props later use this.props.someAnswer;
      this.props = props;
    }.bind(this));
  },

  writing: function () {
    this.fs.copyTpl(this.templatePath('_package.json'),  this.destinationPath(this.props.name + '/' + 'package.json'), this.props);

    this.fs.copy(
      this.templatePath('index.idl'),
      this.destinationPath(this.props.name + '/' + 'index.idl')
    );
    this.fs.copy(
      this.templatePath('_index.html'),
      this.destinationPath(this.props.name + '/' + '_index.html')
    );
    this.fs.copy(
      this.templatePath('styles.css'),
      this.destinationPath(this.props.name + '/' + 'styles.css')
    );
    this.fs.copy(
      this.templatePath('components/'),
      this.destinationPath(this.props.name + '/components')
    );
    this.fs.copy(
      this.templatePath('data/'),
      this.destinationPath(this.props.name + '/data')
    );
    mkdirp.sync(this.destinationPath(this.props.name + '/build'));
    mkdirp.sync(this.destinationPath(this.props.name + '/images'));
    mkdirp.sync(this.destinationPath(this.props.name + '/fonts'));
  },

  install: function () {
    var elementDir = path.join(process.cwd(), this.props.name);
    process.chdir(elementDir);
    var self = this;
    this.npmInstall(undefined, undefined, function() {
      self.log('Your new project was created. To get started run `cd ' + self.props.name + ' && npm start`');
    });


  }
});
