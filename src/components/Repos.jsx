import React, { Component } from 'react'

const tabs = {
  repo: 'Repositories',
  project: 'Projects',
}

export default class Repos extends Component {
  constructor() {
    super();
    this.state = {
      repos: [],
      activeTab: '',
      filteredRepos: [],
      publicRepos: [],
      privateRepos: [],
      searchText: '',
      selectedVisibility: '',
      selectedLanguage: 'HTML',
    };

    this.tabArray = [
      {
        name: tabs.repo,
        onClick: this.handleRepoClick
      },
      {
        name: tabs.project,
        onClick: this.handleProjectClick
      },
    ]
  }

  componentDidMount() {
    this.fetchRepo();
  }

  fetchRepo = async () => {
    const response = await fetch(' https://api.github.com/users/jabuna07/repos')
    const data = await response.json()
    this.setState({
      repos: data,
    });
  };

  getRepoView = () => {
    let result;
    const { searchText, repos, filteredRepos, publicRepos, privateRepos, selectedVisibility, selectedLanguage } = this.state
    if (searchText === '') {
      if (selectedVisibility === 'Public') {
        result = publicRepos.filter((repo) => {
          return repo.language == selectedLanguage;
        });
      } else if (selectedVisibility === 'Private') {
        result = privateRepos.filter((repo) => {
          return repo.language == selectedLanguage;
        });
      } else {
        result = repos.filter((repo) => {
          return repo.language == selectedLanguage;
        });
      }
    } else {
      result = filteredRepos.filter((repo) => {
        return repo.language == selectedLanguage;
      })
    }

    return (
      result.map((repo) => (
        <div className="repository__repo">{repo.name}
          <li>{repo.language}</li></div>
      )
      )
    )
  }

  search(key) {
    const { repos } = this.state
    const filteredResult = repos.filter((repo) => {
      return (repo.name.includes(key));
    });
    this.setState({ filteredRepos: filteredResult, searchText: key })
  }


  handleVisibilitySelect = (key) => {

    const { repos, selectedVisibility } = this.state;
    const privateRepo = repos.filter((repo) => repo.private != false);
    const publicRepo = repos.filter((repo) => repo.private == false);

    this.setState({ selectedVisibility: key, publicRepos: publicRepo, privateRepos: privateRepo });
  }

  handleLanguageSelect = (key) => {
    const { repos } = this.state
    console.log(key);
    this.setState({ selectedLanguage: key })
    const language = repos.filter((repo) => {

      return repo.language == key
    })
    this.setState({ selectedLanguages: language });

  }

  render() {
    return (
      <>
        <div className="searchBar" >
          <input type="text" placeholder="Find a repo" onChange={(e) => this.search(e.target.value)} />
          <select className="list" onChange={(e) => this.handleVisibilitySelect(e.target.value)} >
            <option value="All">All</option>
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
          <select className="list" onChange={(e) => this.handleLanguageSelect(e.target.value)}>
            <option value="HTML">HTML</option>
            <option value="SCSS">SCSS</option>
            <option value="JavaScript">Javascript</option>
          </select>
        </div>
        <div className="repository">
          {this.getRepoView()}
        </div>
      </>
    )
  }
}
